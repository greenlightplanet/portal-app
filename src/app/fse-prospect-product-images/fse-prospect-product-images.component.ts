import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fse-prospect-product-images',
  templateUrl: './fse-prospect-product-images.component.html',
  styleUrls: ['./fse-prospect-product-images.component.css']
})
export class FseProspectProductImagesComponent {
  isLoading = false;
  product_name: any;
  country: any;
  image_names: any;
  image_urls: any;
  category: any;

  constructor(private http: HttpClient) {}

  row = [
    {
      product_name: '',
      country: '',
      image_names: '',
      image_urls: '',
      category: ''
    }
  ];

  addTable() {
    const obj = {
      product_name: '',
      country: '',
      image_names: '',
      image_urls: '',
      category: ''
    }
    this.row.push(obj)
  }
  
  saveTable() {
    this.isLoading = false;
    const data = {product_name: this.product_name,country: this.country,image_names: this.image_names,image_urls: this.image_urls,category: this.category};

    this.http.post('http://localhost:8000/amigo/v1.0/user-angular/', data).subscribe(
      (response) => {
        this.row = [];
        this.isLoading = false;
        this.showSuccessDialog();
      },
      (error) => {
        this.isLoading = false;
        this.showErrorDialog(error);
      }
    );
    this.addTable();

  }

  showSuccessDialog() {
    // Use Angular Material or any other library to display a success dialog
    console.log('Successfully saved!');
  }
  
  showErrorDialog(error: any) {
    // Use Angular Material or any other library to display a error dialog
    console.log('Error:', error);
  }
  
  deleteRow(x: number){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1 );
    }
  }
}

