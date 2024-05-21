import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AccordionComponent } from './accordion/accordion.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AccordionComponent,
    InputComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AccordionComponent, InputComponent],
})
export class SharedModule {}
