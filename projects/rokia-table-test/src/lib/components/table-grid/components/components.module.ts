import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CDKComponentsModule } from '../../../modules/cdk.module';
import { MaterialComponentsModule } from '../../../modules/material.module';
import { SharedModule } from '../../../shared/shared.module';

// Child components
import { TextComponent } from './text/text.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { ImageComponent } from './image/image.component';
import { ReactiveFormsModule } from '@angular/forms';

// Services

const CHILD_COMPONENTS = [
  TextComponent,
  CheckBoxComponent,
  ImageComponent
];

@NgModule({
  declarations: [
    ...CHILD_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CDKComponentsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
  ],
  exports: [
    ...CHILD_COMPONENTS,
  ]
})
export class ComponentsModule { }
