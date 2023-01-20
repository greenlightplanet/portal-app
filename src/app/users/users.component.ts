import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User{
  email: any;
  login_type: any;
  password: any;
  name: any;
  phone: any;
  role: any;
  country: any;
  zone: any;
  region: any;
  area: any;
  territory: any;
  super_user: any;
  latitude : any;
  longitude : any;
  area_id: any;
  module: any;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
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
      area_id: '',
      latitude: '',
      longitude: '',
      module: '',
    },
  ];

  constructor(private http: HttpClient) {}

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
      area_id: '',
      latitude: '',
      longitude: '',
      module: '',
    });
  }

  getData(index: number) {
    const email = this.rows[index].email;
    this.http
      .get<{
        email: any;
        login_type: any;
        password: any;
        name: any;
        phone: any;
        role: any;
        country: any;
        zone: any;
        region: any;
        area: any;
        territory: any;
        super_user: any;
        latitude: any;
        longitude: any;
        area_id: any;
        module: any;
      }>(
        `http://localhost:8000/amigo/v1.0/workbench-tables/staff-users?email_id=${email}`
      )
      .subscribe((data) => {
        this.rows[index] = data;
      });
  }

  saveData(row : any) {
      this.http
        .post(`http://localhost:8000/amigo/v1.0/workbench-tables/staff-users/`, row)
        .subscribe();
    }

  updateData(row : any) {
      this.http
        .put(
          `http://localhost:8000/amigo/v1.0/workbench-tables/staff-users/?email_id=${row.email}`,
          row
        )
        .subscribe();
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}
