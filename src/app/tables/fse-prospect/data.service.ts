import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'https://dev.glpapps.com/amigo/v1.0/workbench-tables/fse-prospect/';

  constructor(private http: HttpClient) { }

  getData(prospect_id: string): Observable<any> {
    return this.http.get<{
      prospect_id : any;
      fse_angaza_id : any;
      agent_user_name : any;
      customer_name : any;
      status : any;
      customer_phone_number : any;
      customer_secondary_phone_number : any;
      customer_address : any;
      account_number : any;
      product_name : any;
      ticket_type : any;
      otp : any;
      unsuccessful_otp_attempts : any;
      installation_attempted : any;
      body : any;
      body_registration : any;
      latitude : any;
      longitude : any;
      checkin_accuracy : any;
      distance : any;
      area : any;
      is_otp_call_approved : any;
      country : any;
      reassignment_attempt : any;
    }>(`${this.baseUrl}?prospect_id=${prospect_id}`);
  }

  saveData(row: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, row);
  }

  updateData(row: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}?prospect_id=${row.prospect_id}`, row);
  }

}
