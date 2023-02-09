import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-fse-prospect',
  templateUrl: './fse-prospect.component.html',
  styleUrls: ['./fse-prospect.component.css']
})

export class FseProspectComponent implements OnInit{
  errorMessage = '';
  prospectControl = new FormControl('', [Validators.required]);
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

  ngOnInit() {
    this.prospectControl.setValidators([this.prospectIdValidator(/^PP[0-9]+$/)]);
  }

  prospectIdValidator = (pattern: RegExp): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = pattern.test(control.value);
      return valid ? null : { prospectId: { value: control.value } };
    };
  }
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
    if (!this.rows[index].prospect_id && !this.prospectControl.valid) {
      alert('Valid Prospect Id is required.');
      return;
    }
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
    if (!row.prospect_id) {
      alert('Valid Prospect Id is required.');
      return;
    }
    this.spinner.show();
    this.dataService.saveData(row).subscribe(
      (data) => {
        console.log(data);
        this.spinner.hide();
      },
      // (error) => {
      //   this.errorMessage = error.error.error;
      //   alert('Please provide valid Inputs.');
      //   // alert(this.errorMessage);
      //   this.spinner.hide();
      // }
      // (error) => {
      //   this.errorMessage = JSON.stringify(error);
      //   alert(this.errorMessage);
      //   this.spinner.hide();
      // }
      (error) => {
        this.errorMessage = error.error.error;
        if (!this.errorMessage) {
        alert('Please provide valid Inputs.');
        }
        else {
          alert(this.errorMessage);
        }
        this.spinner.hide();
        }
    );
  }

  updateData(row : any) {
    if (!row.prospect_id) {
      alert('Valid Prospect Id is required.');
      return;
    }
    this.spinner.show();
    this.dataService.updateData(row).subscribe(
      (data) => {
        console.log(data);
        this.spinner.hide();
      },
      // (error) => {
      //   this.errorMessage = error.error.error;
      //   alert('Please provide valid Inputs.');
      //   this.spinner.hide();
      // }
      (error) => {
        this.errorMessage = error.error.error;
        if (!this.errorMessage) {
        alert('Please provide valid Inputs.');
        }
        else {
          alert(this.errorMessage);
        }
        this.spinner.hide();
        }
    );
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}