import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './modules/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColumnComponent } from './modules/column/column.component';
import { TreeComponent } from './modules/tree/tree.component';

const COMPONENTS = [
  AppComponent,
  TableComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ColumnComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
