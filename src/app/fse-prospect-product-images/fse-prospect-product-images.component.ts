import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fse-prospect-product-images',
  templateUrl: './fse-prospect-product-images.component.html',
  styleUrls: ['./fse-prospect-product-images.component.css']
})
export class FseProspectProductImagesComponent implements OnInit{
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

  constructor(private http: HttpClient) {}

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
    const id = this.rows[index].id;
    this.http
      .get<{
        id: any;
        product_name: any;
        country: any;
        image_names: any;
        image_urls: any;
        category: any;
      }>(
        `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-product-images?id=${id}`
      )
      .subscribe((data) => {
        this.rows[index] = data;
      });
  }

  saveData(row : any) {
      this.http
        .post(`http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-product-images/`, row)
        .subscribe();
    }

  updateData(row : any) {
      this.http
        .put(
          `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-product-images/?id=${row.id}`,
          row
        )
        .subscribe();
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}

