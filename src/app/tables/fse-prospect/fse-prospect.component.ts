import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fse-prospect',
  templateUrl: './fse-prospect.component.html',
  styleUrls: ['./fse-prospect.component.css']
})
export class FseProspectComponent implements OnInit{
  errorMessage = '';
  prospectControl = new FormControl('', [Validators.required, Validators.email]);
  rows = [
    {
      prospect_id : '',
      fse_angaza_id : '',
      agent_user_name : '',
      customer_name : '',
      status : '',
      customer_phone_number : '',
      customer_secondary_phone_number : '',
      customer_address : '',
      account_number : '',
      product_name : '',
      ticket_type : '',
      otp : '',
      unsuccessful_otp_attempts : '',
      installation_attempted : '',
      body : '',
      body_registration : '',
      latitude : '',
      longitude : '',
      checkin_accuracy : '',
      distance : '',
      area : '',
      is_otp_call_approved : '',
      country : '',
      reassignment_attempt : '',
    },
  ];

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {}
  addRow() {
    this.rows.push({
      prospect_id : '',
      fse_angaza_id : '',
      agent_user_name : '',
      customer_name : '',
      status : '',
      customer_phone_number : '',
      customer_secondary_phone_number : '',
      customer_address : '',
      account_number : '',
      product_name : '',
      ticket_type : '',
      otp : '',
      unsuccessful_otp_attempts : '',
      installation_attempted : '',
      body : '',
      body_registration : '',
      latitude : '',
      longitude : '',
      checkin_accuracy : '',
      distance : '',
      area : '',
      is_otp_call_approved : '',
      country : '',
      reassignment_attempt : '',
    });
  }

  getData(index: number) {
    this.spinner.show();
    this.dataService.getData(this.rows[index].prospect_id)
      .subscribe((data) => {
        this.rows[index] = data;
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      (error) => {
      this.errorMessage = error.error.error;
      alert(this.errorMessage);
      this.spinner.hide();
      });
  }

  saveData(row : any) {
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

  updateData(row : any) {
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