import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelComponent } from '../models/model/model.component';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  buttonText: string = 'ADD EMPLOYEE';
  color: string = '';
  constructor(private _dialog:MatDialog){}
  openAddEditEmpForm(){
    this._dialog.open(ModelComponent)
  }
}
