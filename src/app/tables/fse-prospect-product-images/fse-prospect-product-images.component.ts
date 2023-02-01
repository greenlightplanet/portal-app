import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-fse-prospect-product-images',
  templateUrl: './fse-prospect-product-images.component.html',
  styleUrls: ['./fse-prospect-product-images.component.css']
})
export class FseProspectProductImagesComponent implements OnInit{
  errorMessage = '';
  productNameControl = new FormControl('', [Validators.required, Validators.email]);
  rows = [
    {
      id: '',
      product_name: '',
      country: '',
      image_names: '',
      image_urls: '',
      category: '',
    },
  ];

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {}

  addRow() {
    this.rows.push({
      id: '',
      product_name: '',
      country: '',
      image_names: '',
      image_urls: '',
      category: '',
    });
  }

  getData(index: number) {
    this.spinner.show();
    this.rows.forEach((currentRow, currentIndex) => {
    const product_name = this.rows[index].product_name;
    this.dataService.getData(product_name)
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
      alert(this.errorMessage);
      this.spinner.hide();
      });
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

