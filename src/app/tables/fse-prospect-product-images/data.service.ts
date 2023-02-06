import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Data {
  id: any;
  product_name: any;
  country: any;
  image_names: any;
  image_urls: any;
  category: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'https://staff.glpapps.com/amigo/v1.0/workbench-tables/fse-prospect-product-images/';

  constructor(private http: HttpClient) { }

  getData(product_name: string): Observable<any> {
    return this.http.get<Data[]>(`${this.baseUrl}?product_name=${product_name}`);
  }

  saveData(row: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, row);
  }

  updateData(row: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?id=${row.id}`, row);
  }

}
