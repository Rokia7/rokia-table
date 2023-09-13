import { Component, Input, OnInit, ChangeDetectionStrategy, HostBinding, Output, EventEmitter } from '@angular/core';

import * as lodash from 'lodash';
import { title } from '../..//utils/utils';
import { BehaviorSubject, debounceTime, of } from 'rxjs';
import { Mapping } from './interfaces/data_mapping';



@Component({
  selector: 'rokia-table',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableGridComponent implements OnInit {
    /**
   * Data object items.
   */
  @Input('lists') items$ = new BehaviorSubject<any[]>([]);
    /**
   * Status Group by property.
   */
  @Input('isGroup') isGroup = false;
      /**
   * Property group data.
   */
  @Input('propertyGroup') propertyGroup = '';
    /**
   * Mapping data type.
   */
  @Input('dataMapping') dataMapping: Mapping[] = [];
    /**
   * Output selected data.
   */
  @Output('selected') selected: EventEmitter<any> = new EventEmitter();

  lengthcol = '';
  listHeader = [];
  objSubCheckStatus: any = {};

  groupsKey$ = new BehaviorSubject<any[]>([]);
  groupsData$ = new BehaviorSubject<any[]>([]);
  groupsKeyIndeterminate$ = new BehaviorSubject<any>({});
  selected$ = new BehaviorSubject<any[]>([]);

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.items$.next(lodash.cloneDeep(this.items$.value.map((item: any) => {
      item.isCheck = false;
      return item;
    })));

    if (!this.dataMapping || this.dataMapping.length === 0) this.dataMapping = this.generateProperty();
    if (!this.propertyGroup || this.propertyGroup === '') this.isGroup = false;

    this.length(this.dataMapping.length);
    this.items$.subscribe(async (res) => {
      if (this.isGroup) {
        const newGroupData = await this.dataByGroupProperty(this.propertyGroup);
        this.groupsData$.next(newGroupData);
      }
    });

    this.selected$.pipe(debounceTime(300)).subscribe(res => {
      this.selected.emit(res);
    });

    this.createSubMaps();
  }

  length(number: number) {
    this.lengthcol = '';
    for (let i = 0; i < number; i++) {
      this.lengthcol += '1fr ';
    }
  }

  dataByGroupProperty(property: string) {
    return new Promise<any[]>((resolve) => {
      const newData: any[] = lodash.cloneDeep(this.items$.value);
      let tempList: any = {};
      const obsNewData = of(...newData);
      obsNewData.subscribe({
        next: (item: any) => {
          if (Object.keys(tempList).includes(item[property])) {
            if (tempList[item[property]].findIndex((d: any) => d.id === item.id) === -1) {
              tempList[item[property]].push(item);
            }
          } else {
            const temp: string[] = this.groupsKey$.value;
            temp.push(item[property]);
            this.groupsKey$.next(temp);
            tempList[item[property]] = []
            tempList[item[property]].push(item);
          }
        },
        error: (err) => {
          console.error(err);
          resolve(tempList);
        },
        complete: () => {
          resolve(tempList);
        }
      });
    });
  }

  getListByObjKey(obj: any, key: string) {
    return obj[key];
  }

  generateProperty(): Mapping[] {
    const obj = this.items$.value[0];
    const propertys: Mapping[] = Object.keys(obj).map((key: string) => {
      return {
        id: key,
        name: title(key),
        typeProperty: this.getTypeProperty(obj[key])
      } as Mapping
    });

    propertys.sort((a: any, b: any) => {
      if (a.key === 'isCheck' || b.key === 'isCheck') {
        return 1;
      } else {
        return -1
      }
    });

    return propertys;
  }

  getTypeProperty(value: any) {
    const type = typeof value;
    switch (type) {
      case 'boolean':
        return 'checkBox'
      case 'string':
        return 'text'
      case 'number':
        if (value > 0 && value <= 100) {
          return 'number';
        }
        return 'text'
      case 'object':
        if (!(Object.keys(value).find(d => d === 'src' || d === 'blurHash'))) {
          return 'none';
        }
        return 'image';
      default:
        return 'none';
    }
  }

  selectItem(check: boolean, data: any, key: any = 'All') {
    if (this.isGroup && key !== 'All') {
      const temp = this.groupsData$.value;
      const index = temp[key].findIndex((d: any) => d.id === data.id);
      if (index !== -1) {
        temp[key][index].isCheck = check;
        const select = this.selected$.value;
        if (check) {
          select.push({
            idItem: temp[key][index].id,
            name: temp[key][index].name,
            prices: temp[key][index].prices,
            quantity: temp[key][index].quantity,
            type: temp[key][index].productType
          });
        } else {
          const indexSelect = select.findIndex((d: any) => d.idItem === temp[key][index].id);
          select.splice(indexSelect,1);
        }

        this.selected$.next(select);
      }

      this.groupsData$.next(temp);

      const datas: any[] = this.groupsData$.value[key];
      const count = datas.filter((d: any) => d.isCheck === true).length;
      if (count === 0) {
        this.objSubCheckStatus[key].isCheck.next(false);
        this.objSubCheckStatus[key].isIndeterminate.next(false);
        return;
      }

      if (count === datas.length) {
        this.objSubCheckStatus[key].isIndeterminate.next(false);
        this.objSubCheckStatus[key].isCheck.next(true);
        return
      }

      this.objSubCheckStatus[key].isIndeterminate.next(true);
      this.objSubCheckStatus[key].isCheck.next(false);
      return;
    }

    const temp = this.items$.value;
    const index = temp.findIndex((d: any) => d.id === data.id);
    if (index !== -1) {
      temp[index].isCheck = check;
      const select: any[] = this.selected$.value;
      if (check) {
        select.push({
          idItem: temp[index].id,
          name: temp[index].name,
          prices: temp[index].prices,
          quantity: temp[index].quantity,
          type: temp[index].productType
        });
      } else {
        const indexSelect = select.findIndex((d: any) => d.idItem ===  temp[index].id);
        select.splice(indexSelect , 1);
      }

      this.selected$.next(select);
    }

    this.items$.next(temp);

    const datas: any[] = this.items$.value;
    const count = datas.filter((d: any) => d.isCheck === true).length;
    if (count === 0) {
      this.objSubCheckStatus['All'].isCheck.next(false);
      this.objSubCheckStatus['All'].isIndeterminate.next(false);
      return;
    }

    if (count === datas.length) {
      this.objSubCheckStatus['All'].isIndeterminate.next(false);
      this.objSubCheckStatus['All'].isCheck.next(true);
      return
    }

    this.objSubCheckStatus['All'].isIndeterminate.next(true);
    this.objSubCheckStatus['All'].isCheck.next(false);
  }

  selectAllItem(check: any, key: any) {
    if (this.isGroup) {
      const groupData = this.groupsData$.value;
      groupData[key].map((item: any) => {
        item.isCheck = check;
        const select: any[] = this.selected$.value;
        if (check) {
          select.push({
            idItem:item.id,
            name:item.name,
            prices:item.prices,
            quantity:item.quantity,
            type:item.productType
          });
        } else {
          const indexSelect = select.findIndex((d: any) => d.idItem === item.id);
          select.splice(indexSelect , 1);
        }

        this.selected$.next(select);
      });

      this.groupsData$.next(groupData);
      return;
    }

    const datas = this.items$.value;
    datas.map((item: any) => {
      item.isCheck = check;
      const select: any[] = this.selected$.value;
      if (check) {
        select.push({
          idItem:item.id,
          name:item.name,
          prices:item.prices,
          quantity:item.quantity,
          type:item.productType
        });
      } else {
        const indexSelect = select.findIndex((d: any) => d.idItem === item.id);
        select.splice(indexSelect , 1);
      }
      this.selected$.next(select);
    });
    this.items$.next(datas);
  }

  changeIndeterminate(key: any) {
    const datas: any[] = this.groupsData$.value[key];
    const count = datas.filter((d: any) => d.isCheck === true).length;
    return count !== datas.length;
  }

  createSubMaps() {
    if (this.isGroup) {
      this.groupsKey$.value.forEach((key: any) => {
        this.objSubCheckStatus[key] = {};
        this.objSubCheckStatus[key]['isCheck'] = new BehaviorSubject<boolean>(false);
        this.objSubCheckStatus[key]['isIndeterminate'] = new BehaviorSubject<boolean>(false);
        const temp = this.groupsKeyIndeterminate$.value;
        temp[key] = true;
        this.groupsKeyIndeterminate$.next(temp);
      });
      return;
    }

    this.objSubCheckStatus['All'] = {};
    this.objSubCheckStatus['All']['isCheck'] = new BehaviorSubject<boolean>(false);
    this.objSubCheckStatus['All']['isIndeterminate'] = new BehaviorSubject<boolean>(false);
  }
}
