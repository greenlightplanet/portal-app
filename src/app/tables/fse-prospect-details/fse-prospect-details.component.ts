import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Prospect } from 'src/app/models/fse-prospect-details.model';

@Component({
  selector: 'app-fse-prospect-details',
  templateUrl: './fse-prospect-details.component.html',
  styleUrls: ['./fse-prospect-details.component.css']
})
export class FseProspectDetailsComponent implements OnInit {
  errorMessage = '';
  addRowFlag: boolean = false;
  saveAllFlag: boolean = false;

  prospects: Array<Prospect> = [{saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false,fse_angaza_id : "", prospect_id : "", status : "", status_updated_at : "", ticket_id : "", approved : "", message : "", attempt : "", country : ""}];



  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.saveAllFlag = this.prospects.length > 1 && this.prospects.every(prospect => prospect.saveFlag);
  }

  checkFields(index: number): boolean {
    const prospect = this.prospects[index];
  
    prospect.saveFlag =   !!prospect.fse_angaza_id &&
    !!prospect.prospect_id &&
    !!prospect.status &&
    !!prospect.status_updated_at &&
    !!prospect.ticket_id &&
    !!prospect.approved &&
    !!prospect.message &&
    !!prospect.attempt &&
    !!prospect.country ;
  
    return prospect.saveFlag;
  }

  checkProspectOnly(index: number): boolean {
    const prospect = this.prospects[index];
    prospect.getFlag = !(
      !!prospect.fse_angaza_id ||
      !!prospect.status ||
      !!prospect.status_updated_at ||
      !!prospect.ticket_id ||
      !!prospect.approved ||
      !!prospect.message ||
      !!prospect.attempt ||
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
    let newRow: Prospect = {saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false,fse_angaza_id : "", prospect_id : "", status : "", status_updated_at : "", ticket_id : "", approved : "", message : "", attempt : "", country : ""}
    this.prospects.push(newRow);
  }

  reset(){
    this.addRowFlag=false;
    this.prospects = [{saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false,fse_angaza_id : "", prospect_id : "", status : "", status_updated_at : "", ticket_id : "", approved : "", message : "", attempt : "", country : ""}];
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
    this.prospects.forEach((currentRow, currentIndex) => {
      const prospect_id = currentRow.prospect_id;
      this.dataService.getData(prospect_id)
        .subscribe((data) => {
          if (data.length === 0) {
            alert("No Data Found for the Prospect Id: " + prospect_id);
          } else {
            this.prospects[currentIndex] = data[0];
            this.prospects[index].updateFlag = true;
            if (data.length > 1) {
              for (let i = 1; i < data.length; i++) {
                this.prospects.push(data[i]);
              }
            }
          }
          this.addRowFlag = true;
          console.log(this.prospects);
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        },
        (error) => {
          this.errorMessage = error.error.error;
          if (!this.errorMessage) {
            alert('Please provide valid Inputs.');
          } else {
            alert(this.errorMessage);
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        });
    });
  }
  validateAllProspects() {
    let isValid = true;
    this.prospects.forEach((prospect, index) => {
      if (!this.validateProspect(index)) {
        isValid = false;
      }
    });
    return isValid;
  }
  

  saveAll() {
    if (!this.validateAllProspects()) {
      alert("Please enter valid data for all prospects");
      return;
    }
    this.spinner.show();
    this.dataService.saveData(this.prospects)
      .subscribe((data) => {
        alert("All prospects saved successfully");
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      },
      (error) => {
        this.errorMessage = error.error.error;
        if (!this.errorMessage) {
          alert('Please provide valid inputs.');
        }
        else {
          alert(this.errorMessage);
        }
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
        alert('A new row has been added to the Fse-Prospect-Details table.');
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

  // updateData(row : any) {
  //     this.http
  //       .put(
  //         `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details/?prospect_id=${row.prospect_id}`,
  //         row
  //       )
  //       .subscribe();
  // }

  deleteRow(index: number) {
    this.prospects.splice(index, 1);
  }
}
