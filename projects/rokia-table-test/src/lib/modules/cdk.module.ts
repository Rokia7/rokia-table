import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// CDKS
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

const CDKS = [
  ScrollingModule,
  DragDropModule
];

@NgModule({
  imports: [
    CommonModule,
    ...CDKS,
  ],
  exports: [
    ...CDKS,
  ]
})
export class CDKComponentsModule { }
