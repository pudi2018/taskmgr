import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { DirectiveModule } from '../directive/directive.module';
import {
  ConfirmDialogComponent,
} from './confirm-dialog/confirm-dialog.component';
import {
  ImageListSelectComponent,
} from './image-list-select/image-list-select.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
  ],
  exports: [
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    DirectiveModule,
    ImageListSelectComponent,
  ],
  declarations: [ConfirmDialogComponent, ImageListSelectComponent],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
