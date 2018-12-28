import { NgModule } from '@angular/core';

import { DragDropService } from './drag-drop.service';
import { DragDirective } from './drag-drop/drag.directive';
import { DropDirective } from './drag-drop/drop.directive';
import { IsnumberDirective } from './drag-drop/isnumber.directive';

@NgModule({
  imports: [],
  declarations: [
    DragDirective,
    DropDirective,
    IsnumberDirective
  ],
  exports: [
    DragDirective,
    DropDirective,
    IsnumberDirective
  ],
  providers: [DragDropService]
})
export class DirectiveModule { }
