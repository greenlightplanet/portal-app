import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // baseUrl = 'https://dev.glpapps.com/amigo/v1.0/workbench-tables/fse-installation-details/';
  // baseUrl = 'http://localhost:8000/amigo/v1.0/workbench-tables/fse-installation-details/';
  baseUrl = 'https://staff.glpapps.com/amigo/v1.0/workbench-tables/fse-installation-details/';

  constructor(private http: HttpClient) { }

  getData(prospect_id: string): Observable<any> {
    return this.http.get<{
      fse_angaza_id: any;
      prospect_id: any;
      installation_picture: any;
      latitude: any;
      longitude: any;
      distance: any;
      accuracy: any;
      attempt: any;
      country: any;
      image_name: any;
      is_rejected: any;
      rejection_attempt: any;
    }>(`${this.baseUrl}?prospect_id=${prospect_id}`);
  }

  saveData(row: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, row);
  }

  updateData(row: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?prospect_id=${row.prospect_id}`, row);
  }

}
