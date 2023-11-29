import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'Table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns: string[]=[];

  @Input() filterValue = '';
  @Output() editEmployee = new EventEmitter<any>();
  @Output() deleteEmployee = new EventEmitter<number>();

  // Function to emit the edit event
  openEditForm(row: any) {
    this.editEmployee.emit(row);
  }

  // Function to emit the delete event
  onDeleteEmployee(id: number) {
    this.deleteEmployee.emit(id);
  }
}
