import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {
  @Input('checkValue') checkValue: any = false;
  @Input('isIndeterminate') isIndeterminate: any = false;
  @Output('checkValueChange') checkValueChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  change(value: any) {
    this.checkValueChange.emit(value);
  }
}
