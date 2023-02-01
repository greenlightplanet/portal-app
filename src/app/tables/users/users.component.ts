import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from './data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  errorMessage = '';
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  rows = [
    {
      email: '',
      login_type: '',
      password: '',
      name: '',
      phone: '',
      role: '',
      country: '',
      zone: '',
      region: '',
      area: '',
      territory: '',
      super_user: '',
      latitude: '',
      longitude: '',
    },
  ];

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {}
  addRow() {
    this.rows.push({
      email: '',
      login_type: '',
      password: '',
      name: '',
      phone: '',
      role: '',
      country: '',
      zone: '',
      region: '',
      area: '',
      territory: '',
      super_user: '',
      latitude: '',
      longitude: '',
    });
  }
  getData(index: number) {
    this.spinner.show();
    this.dataService.getData(this.rows[index].email).subscribe(
      (data) => {
        this.rows[index] = data;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      (error) => {
      this.errorMessage = error.error.error;
      alert(this.errorMessage);
      this.spinner.hide();
      }
    );
  }

  saveData(row: any) {
    this.spinner.show();
    this.dataService.saveData(row).subscribe(
      (data) => {
        console.log(data);
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage = error.error.error;
        alert(this.errorMessage);
        this.spinner.hide();
      }
    );
  }

  updateData(row: any) {
    this.spinner.show();
    this.dataService.updateData(row).subscribe(
      (data) => {
        console.log(data);
        this.spinner.hide();
      },
      (error) => {
        this.errorMessage = error.error.error;
        alert(this.errorMessage);
        this.spinner.hide();
      }
    );
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}