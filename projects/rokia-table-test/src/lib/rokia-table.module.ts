import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CDKComponentsModule } from './modules/cdk.module';
import { MaterialComponentsModule } from './modules/material.module';
import { SharedModule } from './shared/shared.module';

// Components
import { TableGridComponent } from './components/table-grid/table-grid.component';
import { ComponentsModule } from './components/table-grid/components/components.module';

const COMPONENTS = [
  TableGridComponent
];


@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    SharedModule,
    CDKComponentsModule,
    MaterialComponentsModule,
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class RokiaTableModule { }
