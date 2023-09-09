import { NgModule } from '@angular/core';

// Materials
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';

const MATERIALS = [
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatChipsModule,
  MatInputModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatTabsModule,
  MatBadgeModule,
  MatTooltipModule,
  MatSortModule
];

@NgModule({
  imports: [
    ...MATERIALS,
  ],
  exports: [
    ...MATERIALS,
  ]
})
export class MaterialComponentsModule { }
