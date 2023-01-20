import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fse-prospect',
  templateUrl: './fse-prospect.component.html',
  styleUrls: ['./fse-prospect.component.css']
})
export class FseProspectComponent implements OnInit{
  rows = [
    {
      prospect_id : '',
      fse_angaza_id : '',
      agent_user_name : '',
      customer_name : '',
      status : '',
      customer_phone_number : '',
      customer_secondary_phone_number : '',
      customer_address : '',
      account_number : '',
      product_name : '',
      ticket_type : '',
      otp : '',
      unsuccessful_otp_attempts : '',
      installation_attempted : '',
      body : '',
      body_registration : '',
      latitude : '',
      longitude : '',
      checkin_accuracy : '',
      distance : '',
      area : '',
      is_otp_call_approved : '',
      country : '',
      reassignment_attempt : '',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  addRow() {
    this.rows.push({
      prospect_id : '',
      fse_angaza_id : '',
      agent_user_name : '',
      customer_name : '',
      status : '',
      customer_phone_number : '',
      customer_secondary_phone_number : '',
      customer_address : '',
      account_number : '',
      product_name : '',
      ticket_type : '',
      otp : '',
      unsuccessful_otp_attempts : '',
      installation_attempted : '',
      body : '',
      body_registration : '',
      latitude : '',
      longitude : '',
      checkin_accuracy : '',
      distance : '',
      area : '',
      is_otp_call_approved : '',
      country : '',
      reassignment_attempt : '',
    });
  }

  getData(index: number) {
    const prospect_id = this.rows[index].prospect_id;
    this.http
      .get<{
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
      }>(
        `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect?prospect_id=${prospect_id}`
      )
      .subscribe((data) => {
        this.rows[index] = data;
      });
  }

  saveData(row : any) {
      this.http
        .post(`http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect/`, row)
        .subscribe();
    }

  updateData(row : any) {
      this.http
        .put(
          `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect/?prospect_id=${row.prospect_id}`,
          row
        )
        .subscribe();
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}