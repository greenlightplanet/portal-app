import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost:8000/amigo/v1.0/workbench-tables/staff-users/';

  constructor(private http: HttpClient) { }

  getData(email: string): Observable<any> {
    return this.http.get<{
      email: any;
      login_type: any;
      password: any;
      name: any;
      phone: any;
      role: any;
      country: any;
      zone: any;
      region: any;
      area: any;
      territory: any;
      super_user: any;
      latitude: any;
      longitude: any;
      area_id: any;
      module: any;
    }>(`${this.baseUrl}?email_id=${email}`);
  }

  saveData(row: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, row);
  }

  updateData(row: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?email_id=${row.email}`, row);
  }

}

