import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-fse-installation-details',
  templateUrl: './fse-installation-details.component.html',
  styleUrls: ['./fse-installation-details.component.css']
})
export class FseInstallationDetailsComponent implements OnInit{
  errorMessage = '';
  prospectControl = new FormControl('', [Validators.required]);
  rows = [
    {
      fse_angaza_id: '',
      prospect_id: '',
      installation_picture: '',
      latitude: '',
      longitude: '',
      distance: '',
      accuracy: '',
      attempt: '',
      country: '',
      image_name: '',
      is_rejected: '',
      rejection_attempt: '',
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
      fse_angaza_id: '',
      prospect_id: '',
      installation_picture: '',
      latitude: '',
      longitude: '',
      distance: '',
      accuracy: '',
      attempt: '',
      country: '',
      image_name: '',
      is_rejected: '',
      rejection_attempt: '',
    });
  }

  getData(index: number) {
    if (!this.rows[index].prospect_id || !this.prospectControl.valid) {
      alert('Valid Prospect Id is required.');
      return;
    }
    this.spinner.show();
    const prospect_id = this.rows[index].prospect_id;
    this.dataService.getData(prospect_id)
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
    if (!row.prospect_id && !this.prospectControl.valid) {
      alert('Valid Prospect Id is required.');
      return;
    }
    this.spinner.show();
    this.dataService.saveData(row).subscribe(
      (data) => {
        console.log(data);
        this.spinner.hide();
      },
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
