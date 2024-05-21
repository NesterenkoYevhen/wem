import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string;
  @Input() controlType = 'input';
  @Input() placeholder = 'placeholder';
  @Input() passwordNotMatching = false;
  constructor() {}

  ngOnInit(): void {}

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  showSuccess() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && !errors;
  }

  showPasswordNotMatching() {
    const { dirty, touched } = this.control;
    return dirty && touched && this.passwordNotMatching;
  }
}
