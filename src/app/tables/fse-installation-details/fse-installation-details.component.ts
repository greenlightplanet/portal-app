import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Prospect } from 'src/app/models/fse-installation-details';

@Component({
  selector: 'app-fse-installation-details',
  templateUrl: './fse-installation-details.component.html',
  styleUrls: ['./fse-installation-details.component.css']
})
export class FseInstallationDetailsComponent implements OnInit{
  errorMessage = '';

prospects : Array<Prospect> = [{saveFlag: false,updateFlag: false,deleteFlag: false,getFlag: false,fse_angaza_id: "",prospect_id: "",installation_picture: "",latitude: "",longitude: "",distance: "",accuracy: "",attempt: "",country: "",image_name: "",is_rejected: "",rejection_attempt: ""}];

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {}

  checkFields(index: number): boolean {
    const prospect = this.prospects[index];
  
    prospect.saveFlag = !!prospect.fse_angaza_id &&
    !!prospect.prospect_id &&
    !!prospect.installation_picture &&
    !!prospect.latitude &&
    !!prospect.longitude &&
    !!prospect.distance &&
    !!prospect.accuracy &&
    !!prospect.attempt &&
    !!prospect.country &&
    !!prospect.image_name &&
    !!prospect.is_rejected &&
    !!prospect.rejection_attempt;
  
    return prospect.saveFlag;
  }

  checkProspectOnly(index: number): boolean {
    const prospect = this.prospects[index];
    prospect.getFlag = !(
      !!prospect.fse_angaza_id ||
      !!prospect.installation_picture ||
      !!prospect.latitude ||
      !!prospect.longitude ||
      !!prospect.distance ||
      !!prospect.accuracy ||
      !!prospect.attempt ||
      !!prospect.country ||
      !!prospect.image_name ||
      !!prospect.is_rejected ||
      !!prospect.rejection_attempt
    ) && !!prospect.prospect_id;
  
    return prospect.getFlag;
  }

  deleteUser(): void {
    if (this.prospects.length > 1) {
      this.prospects.pop();
    }
  }

  addUser() {
    let newRow: Prospect = {saveFlag: false,updateFlag: false,deleteFlag: false,getFlag: false,fse_angaza_id: "",prospect_id: "",installation_picture: "",latitude: "",longitude: "",distance: "",accuracy: "",attempt: "",country: "",image_name: "",is_rejected: "",rejection_attempt: ""}
    this.prospects.push(newRow);
  }

  reset(){
    this.prospects = [{saveFlag: false,updateFlag: false,deleteFlag: false,getFlag: false,fse_angaza_id: "",prospect_id: "",installation_picture: "",latitude: "",longitude: "",distance: "",accuracy: "",attempt: "",country: "",image_name: "",is_rejected: "",rejection_attempt: ""}];
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
    const prospect_id = this.prospects[index].prospect_id;
    this.dataService.getData(prospect_id)
    .subscribe((data) => {
      if (!data || Object.keys(data).length === 0) {
        alert("No Data found for Prospect Id: " + prospect_id);
        return;
      }
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
        alert('A new row has been added to the Fse-Installation-Details table.');
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
