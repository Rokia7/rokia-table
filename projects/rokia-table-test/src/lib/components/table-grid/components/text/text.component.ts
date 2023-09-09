import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements OnInit, OnDestroy {
  @Input('textValue') textValue: string = '';
  @Input('isEdit') isEdit: boolean = false;
  @Input('type') type: 'text' | 'number' = 'text';
  @Output('textValueChange') textValueChange = new EventEmitter<string>();


  form =  new FormGroup({
    text: new FormControl(this.textValue)
  });
  
  get text() { return this.form.get('text')?.value };

  valueChangeSub$: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.form.get('text')?.setValue(this.textValue);
    this.valueChangeSub$ = this.form.valueChanges.subscribe(res => {
      if (res && res.text) {
        if (this.type === 'number') {
          if (+res.text < 1) this.form.get('text')?.setValue('1');
          if (+res.text > 100) this.form.get('text')?.setValue('100');
        }
        this.textValueChange.emit(res.text);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.valueChangeSub$) {
      this.valueChangeSub$.unsubscribe();
    }
  }
}
