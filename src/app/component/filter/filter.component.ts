import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'Filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<string>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterChanged.emit(filterValue);
  }
}
