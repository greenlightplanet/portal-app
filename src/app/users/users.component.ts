import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
  apiData: any;
  isLoading = false;
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

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  row = [
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
      module: ''
    }
  ];
  
  addTable() {
    const obj = {
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
      module: ''
    }
    this.row.push(obj)
  }
  // saveTable() {
  //   // this.isLoading = false;
  //   const data = {email: this.email,login_type: this.login_type,password: this.password,name: this.name,phone: this.phone,role: this.role,country: this.country,zone: this.zone,region: this.region,area: this.area,territory: this.territory,super_user: this.super_user,area_id: this.area_id,module: this.module, latitude: this.latitude,longitude: this.longitude};

  //   this.http.post('http://localhost:8000/amigo/v1.0/user-angular/', data).subscribe(response => {
  //     console.log(response);
  //   });

    saveTable(row : any) {
      // this.isLoading = false;
      // const data = {email: this.email,login_type: this.login_type,password: this.password,name: this.name,phone: this.phone,role: this.role,country: this.country,zone: this.zone,region: this.region,area: this.area,territory: this.territory,super_user: this.super_user,area_id: this.area_id,module: this.module, latitude: this.latitude,longitude: this.longitude};
  
      this.http.post('http://localhost:8000/amigo/v1.0/user-angular/', row).subscribe(response => {
        console.log(response);
      });

    // this.email = '';
    // this.login_type = '';
    // this.password = '';
    // this.name = '';
    // this.phone = '';
    // this.role = '';
    // this.country = '';
    // this.zone = '';
    // this.region = '';
    // this.area = '';
    // this.territory = '';
    // this.super_user = '';
    // this.area_id = '';
    // this.latitude = '';
    // this.longitude = '';
    // this.module = '';
  }
  
  deleteRow(x: number){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1 );
    }   
  }
  getData() {
    let params = new HttpParams().set('email_id', this.email);
    this.http.get<User>('http://localhost:8000/amigo/v1.0/workbench-tables/staff-users', {params}).subscribe(data => {
      this.row[0] = data;
    });
    // this.email = this.apiData.email;
    // this.login_type = this.apiData.login_type;
    // this.password = this.apiData.password;
    // this.name = this.apiData.name;
    // this.phone = this.apiData.phone;
    // this.role = this.apiData.role;
    // this.country = this.apiData.country;
    // this.zone = this.apiData.zone;
    // this.region = this.apiData.region;
    // this.area = this.apiData.area;
    // this.territory = this.apiData.territory;
    // this.super_user = this.apiData.super_user;
    // this.area_id = this.apiData.area_id;
    // this.latitude = this.apiData.latitude;
    // this.longitude = this.apiData.longitude;
    // this.module = this.apiData.module;
  }
}
