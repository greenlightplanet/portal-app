import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  errorMessage = '';
  users: Array<User> = [{saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false,email: "",login_type: "",password: "",name: "",phone: "",role: "",country: "",zone: "",region: "",area: "",territory: "",super_user: "",latitude: "",longitude: ""}];
  

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {}

  checkFields(index: number): boolean {
    const user = this.users[index];
  
    user.saveFlag = !!user.email &&
    !!user.login_type &&
    !!user.password &&
    !!user.name &&
    !!user.phone &&
    !!user.role &&
    !!user.country &&
    !!user.zone &&
    !!user.region &&
    !!user.area &&
    !!user.territory &&
    !!user.super_user &&
    !!user.latitude &&
    !!user.longitude;
  
    return user.saveFlag;
  }

  checkEmailOnly(index: number): boolean {
    const user = this.users[index];
    user.getFlag = !(
      !!user.login_type ||
      !!user.password ||
      !!user.name ||
      !!user.phone ||
      !!user.role ||
      !!user.country ||
      !!user.zone ||
      !!user.region ||
      !!user.area ||
      !!user.territory ||
      !!user.super_user ||
      !!user.latitude ||
      !!user.longitude
    ) && !!user.email;
  
    return user.getFlag;
  }

  deleteUser(): void {
    if (this.users.length > 1) {
      this.users.pop();
    }
  }

  addUser() {
    let newRow: User = {saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false,email: "",login_type: "",password: "",name: "",phone: "",role: "",country: "",zone: "",region: "",area: "",territory: "",super_user: "",latitude: "",longitude: ""}
    this.users.push(newRow);
  }

  reset(){
    this.spinner.show();
    this.users = [{
      saveFlag: false,
      updateFlag: false,
      deleteFlag: false,
      getFlag: false,
      email: "",
      login_type: "",
      password: "",
      name: "",
      phone: "",
      role: "",
      country: "",
      zone: "",
      region: "",
      area: "",
      territory: "",
      super_user: "",
      latitude: "",
      longitude: ""
    }];
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  validateEmail(index: number) {
    const email = this.users[index].email;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }
  
  getData(user: User, index: number) {
      if (!this.users[index].email || !this.validateEmail(index)) {
        alert("Please enter a valid email");
        return;
      }
    
    this.spinner.show();
    this.dataService.getData(this.users[index].email).subscribe(
      (data) => {
        this.users[index] = data;
        this.users[index].updateFlag = true;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      (error) => {
      this.errorMessage = error.error.error;
      alert(this.errorMessage);
      setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    );
  }

  saveData(user: User, index: number) {
    
    if (!user.email || !this.validateEmail(index)) {
      alert("Please enter a valid email");
      return;
    }

    this.spinner.show();
    this.dataService.saveData(user).subscribe(
      data => {
        console.log(data);
        alert('A new row has been added to the Users table.');
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      error => {
        this.errorMessage = error.error.error;
        console.log(this.errorMessage);
        alert(this.errorMessage);
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    );
  }

  updateData(user: User, index: number) {
    
    if (!user.email || !this.validateEmail(index)) {
      alert("Please enter a valid email");
      return;
    }

    this.spinner.show();
    this.dataService.updateData(user).subscribe(
      data => {
        console.log(data);
        alert('The row has been updated successfully.');
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      error => {
        this.errorMessage = error.error.error;
        alert(this.errorMessage);
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    );
  }

  deleteRow(index: number) {
    this.users.splice(index, 1);
  }
}
