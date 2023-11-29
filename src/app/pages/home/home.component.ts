import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModelComponent } from 'src/app/component/models/model/model.component';
import { CoreService } from 'src/app/core/core.service';
import { TestService } from 'src/app/services/test-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterValue = '';
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  onFilterChanged(value: string) {
    this.filterValue = value;
  }
  ngAfterViewInit() {
    // Set the paginator after the view has been initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  constructor(private _dialog: MatDialog,
    private _empService: TestService,
    private _coreService: CoreService){}
  ngOnInit() {
    // Replace this with your actual data
    const sampleData = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000,action:``},
      { id: 2, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000},
      { id: 3, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000},
      { id: 4, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000 },
      // Add more sample rows as needed{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000,action:``},
      { id: 5, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000},
      { id: 6, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000},
      { id: 7, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000 },
      // Add more sample rows as needed{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000,action:``},
      { id: 8, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000},
      { id: 9, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000},
      { id: 10, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000 },
      // Add more sample rows as needed{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000,action:``},
      { id: 20, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000},
      { id: 30, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000},
      { id: 40, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', dob: '1990-01-01', gender: 'Male', education: 'Bachelor', company: 'ABC Inc.', experience: 5, package: 100000 },
      // Add more sample rows as needed
    ];
    // Create MatTableDataSource with the sample data
    this.dataSource = new MatTableDataSource(sampleData);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(ModelComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ModelComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
}
