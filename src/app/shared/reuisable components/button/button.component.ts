// primary-button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'Button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() buttonText: string = 'Click me';
  @Input() color: string = '';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
