import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-fse-prospect-details',
  templateUrl: './fse-prospect-details.component.html',
  styleUrls: ['./fse-prospect-details.component.css']
})
export class FseProspectDetailsComponent implements OnInit {
  errorMessage = '';
  prospectControl = new FormControl('', [Validators.required]);
  rows = [
    {
      fse_angaza_id: '',
      prospect_id: '',
      status: '',
      status_updated_at: '',
      ticket_id: '',
      approved: '',
      message: '',
      attempt: '',
      country: '',
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
      status: '',
      status_updated_at: '',
      ticket_id: '',
      approved: '',
      message: '',
      attempt: '',
      country: '',
    });
  }

getData(index: number) {
  if (!this.rows[index].prospect_id && !this.prospectControl.valid) {
    alert('Valid Prospect Id is required.');
    return;
  }
  this.spinner.show();
  this.rows.forEach((currentRow, currentIndex) => {
    const prospect_id = currentRow.prospect_id;
    this.dataService.getData(prospect_id)
      .subscribe((data) => {
        this.rows[currentIndex] = data[0];
        if (data.length > 1) {
          for (let i = 1; i < data.length; i++) {
            this.rows.push(data[i]);
          }
        }
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
        this.spinner.hide();
        });
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

  // updateData(row : any) {
  //     this.http
  //       .put(
  //         `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details/?prospect_id=${row.prospect_id}`,
  //         row
  //       )
  //       .subscribe();
  // }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}
