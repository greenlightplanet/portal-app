import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Data {
  fse_angaza_id: string;
  prospect_id: string;
  status: string;
  status_updated_at: string;
  ticket_id: string;
  approved: any;
  message: any;
  attempt: any;
  country: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details/';

  constructor(private http: HttpClient) { }

  getData(prospect_id: string): Observable<any> {
    return this.http.get<Data[]>(`${this.baseUrl}?prospect_id=${prospect_id}`);
  }

  saveData(row: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, row);
  }

  updateData(row: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?email_id=${row.email}`, row);
  }

}
