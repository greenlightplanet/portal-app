import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Prospect } from 'src/app/models/fse-prospect-product-images.model';
@Component({
  selector: 'app-fse-prospect-product-images',
  templateUrl: './fse-prospect-product-images.component.html',
  styleUrls: ['./fse-prospect-product-images.component.css']
})
export class FseProspectProductImagesComponent implements OnInit{
  errorMessage = '';

  prospects: Array<Prospect> = [{saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false, id : "", product_name : "", country : "", image_names : "", image_urls : "", category : ""}];

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {}

  checkFields(index: number): boolean {
    const prospect = this.prospects[index];
  
    prospect.saveFlag =
    !!prospect.product_name &&
    !!prospect.country &&
    !!prospect.image_names &&
    !!prospect.image_urls &&
    !!prospect.category ;
  
    return prospect.saveFlag;
  }

  checkProductNameOnly(index: number): boolean {
    const prospect = this.prospects[index];
    prospect.getFlag = !(
      !!prospect.country ||
      !!prospect.image_names ||
      !!prospect.image_urls ||
      !!prospect.category 
    ) && !!prospect.product_name;
  
    return prospect.getFlag;
  }

  deleteUser(): void {
    if (this.prospects.length > 1) {
      this.prospects.pop();
    }
  }

  addUser() {
    let newRow: Prospect = {saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false, id : "", product_name : "", country : "", image_names : "", image_urls : "", category : ""}
    this.prospects.push(newRow);
  }

  reset(){
    this.prospects = [{saveFlag:false, updateFlag: false, deleteFlag: false, getFlag: false, id : "", product_name : "", country : "", image_names : "", image_urls : "", category : ""}];
  }

getData(prospect: Prospect, index: number) {
  this.spinner.show();
  this.prospects.forEach((currentRow: Prospect, currentIndex: number) => {
    const product_name = this.prospects[index].product_name;
    this.dataService.getData(product_name)
      .subscribe((data: Prospect[]) => {
        this.prospects[currentIndex] = data[0];
        if (data.length > 1) {
          for (let i = 1; i < data.length; i++) {
            this.prospects.push(data[i]);
          }
        }
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
  });
}


  saveData(prospect: Prospect, index: number) {
    if (!prospect.product_name) {
      alert('Valid Product Name is required.');
      
      return;
    }
    this.spinner.show();
    this.dataService.saveData(prospect).subscribe(
      (data) => {
        console.log(data);
        alert('A new row has been added to the Fse-Prospect-Product-Image table.');
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

