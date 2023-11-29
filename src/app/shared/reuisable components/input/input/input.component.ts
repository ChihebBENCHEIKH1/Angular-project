import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'Generic-Input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() label: string = '';
  @Input() formControlName: string = '';
  @Input() placeholder: string = '';
  @Input() inputType: string = 'text';
}
