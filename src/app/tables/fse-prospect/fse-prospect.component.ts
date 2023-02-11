import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Prospect } from 'src/app/models/fse-prospect.model';

@Component({
  selector: 'app-fse-prospect',
  templateUrl: './fse-prospect.component.html',
  styleUrls: ['./fse-prospect.component.css']
})

export class FseProspectComponent implements OnInit{
  errorMessage = '';

  prospects: Array<Prospect> = [{saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false,prospect_id : "",fse_angaza_id : "",agent_user_name : "",customer_name : "",status : "",customer_phone_number : "",customer_secondary_phone_number : "",customer_address : "",account_number : "",product_name : "",ticket_type : "",otp : "",unsuccessful_otp_attempts : "",installation_attempted : "",body : "",body_registration : "",latitude : "",longitude : "",checkin_accuracy : "",distance : "",area : "",is_otp_call_approved : "",country : "",reassignment_attempt : ""}];

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {}

  checkFields(index: number): boolean {
    const prospect = this.prospects[index];
  
    prospect.saveFlag = !!prospect.prospect_id &&
    !!prospect.fse_angaza_id &&
    !!prospect.agent_user_name &&
    !!prospect.customer_name &&
    !!prospect.status &&
    !!prospect.customer_phone_number &&
    !!prospect.customer_secondary_phone_number &&
    !!prospect.customer_address &&
    !!prospect.account_number &&
    !!prospect.product_name &&
    !!prospect.ticket_type &&
    !!prospect.otp &&
    !!prospect.unsuccessful_otp_attempts &&
    !!prospect.installation_attempted &&
    !!prospect.body &&
    !!prospect.body_registration &&
    !!prospect.latitude &&
    !!prospect.longitude &&
    !!prospect.checkin_accuracy &&
    !!prospect.distance &&
    !!prospect.area &&
    !!prospect.is_otp_call_approved &&
    !!prospect.country &&
    !!prospect.reassignment_attempt ;
  
    return prospect.saveFlag;
  }

  checkProspectOnly(index: number): boolean {
    const prospect = this.prospects[index];
    prospect.getFlag = !(
      !!prospect.fse_angaza_id ||
      !!prospect.agent_user_name ||
      !!prospect.customer_name ||
      !!prospect.status ||
      !!prospect.customer_phone_number ||
      !!prospect.customer_secondary_phone_number ||
      !!prospect.customer_address ||
      !!prospect.account_number ||
      !!prospect.product_name ||
      !!prospect.ticket_type ||
      !!prospect.otp ||
      !!prospect.unsuccessful_otp_attempts ||
      !!prospect.installation_attempted ||
      !!prospect.body ||
      !!prospect.body_registration ||
      !!prospect.latitude ||
      !!prospect.longitude ||
      !!prospect.checkin_accuracy ||
      !!prospect.distance ||
      !!prospect.area ||
      !!prospect.is_otp_call_approved ||
      !!prospect.country
    ) && !!prospect.prospect_id;
  
    return prospect.getFlag;
  }

  deleteUser(): void {
    if (this.prospects.length > 1) {
      this.prospects.pop();
    }
  }

  addUser() {
    let newRow: Prospect = {saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false,prospect_id : "",fse_angaza_id : "",agent_user_name : "",customer_name : "",status : "",customer_phone_number : "",customer_secondary_phone_number : "",customer_address : "",account_number : "",product_name : "",ticket_type : "",otp : "",unsuccessful_otp_attempts : "",installation_attempted : "",body : "",body_registration : "",latitude : "",longitude : "",checkin_accuracy : "",distance : "",area : "",is_otp_call_approved : "",country : "",reassignment_attempt : ""}
    this.prospects.push(newRow);
  }

  reset(){
    this.prospects = [{saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false,prospect_id : "",fse_angaza_id : "",agent_user_name : "",customer_name : "",status : "",customer_phone_number : "",customer_secondary_phone_number : "",customer_address : "",account_number : "",product_name : "",ticket_type : "",otp : "",unsuccessful_otp_attempts : "",installation_attempted : "",body : "",body_registration : "",latitude : "",longitude : "",checkin_accuracy : "",distance : "",area : "",is_otp_call_approved : "",country : "",reassignment_attempt : ""}];
  }


  validateProspect(index: number) {
    const prospect_id = this.prospects[index].prospect_id;
    const prospectRegex = /^PP[0-9]+$/;
    return prospectRegex.test(prospect_id);
  }

  getData(prospect: Prospect, index: number) {
    if (!this.prospects[index].prospect_id || !this.validateProspect(index)) {
      alert("Please enter a valid Prospect Id");
      return;
    }
    this.spinner.show();
    this.dataService.getData(this.prospects[index].prospect_id)
      .subscribe((data) => {
        this.prospects[index] = data;
        this.prospects[index].updateFlag = true;
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
      });
  }

  saveData(prospect: Prospect, index: number) {
    if (!this.prospects[index].prospect_id || !this.validateProspect(index)) {
      alert("Please enter a valid Prospect Id");
      return;
    }
    this.spinner.show();
    this.dataService.saveData(prospect).subscribe(
      (data) => {
        console.log(data);
        alert('A new row has been added to the Fse-Prospect table.');
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      (error) => {
        this.errorMessage = error.error.error;
        if (!this.errorMessage) {
        alert('Please provide valid Inputs.');
        }
        else {
          alert(this.errorMessage);
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
        }
    );
  }

  updateData(prospect: Prospect, index: number) {
    if (!this.prospects[index].prospect_id || !this.validateProspect(index)) {
      alert("Please enter a valid Prospect Id");
      return;
    }
    this.spinner.show();
    this.dataService.updateData(prospect).subscribe(
      (data) => {
        console.log(data);
        alert('The row has been updated successfully.');
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      (error) => {
        this.errorMessage = error.error.error;
        if (!this.errorMessage) {
        alert('Please provide valid Inputs.');
        }
        else {
          alert(this.errorMessage);
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
        }
    );
  }

  deleteRow(index: number) {
    this.prospects.splice(index, 1);
  }
}