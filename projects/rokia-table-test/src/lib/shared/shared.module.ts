import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ImageLoaderComponent } from './components/image-loader/image-loader.component';

const COMPONENTS = [
  ImageLoaderComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
