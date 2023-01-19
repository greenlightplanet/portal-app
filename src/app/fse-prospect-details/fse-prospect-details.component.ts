import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fse-prospect-details',
  templateUrl: './fse-prospect-details.component.html',
  styleUrls: ['./fse-prospect-details.component.css']
})
export class FseProspectDetailsComponent {
  isLoading = false;
  fse_angaza_id: any;
  prospect_id: any;
  status: any;
  status_updated_at: any;
  ticket_id: any;
  approved: any;
  message: any;
  attempt: any;
  country: any;

  constructor(private http: HttpClient) {}

  row = [
    {
      fse_angaza_id: '',
      prospect_id: '',
      status: '',
      status_updated_at: '',
      ticket_id: '',
      approved: '',
      message: '',
      attempt: '',
      country: ''
    }
  ];
  
  addTable() {
    const obj = {
      fse_angaza_id: '',
      prospect_id: '',
      status: '',
      status_updated_at: '',
      ticket_id: '',
      approved: '',
      message: '',
      attempt: '',
      country: ''
    }
    this.row.push(obj)
  }
  saveTable() {
    this.isLoading = false;
    const data = {fse_angaza_id: this.fse_angaza_id, prospect_id: this.prospect_id, status: this.status, status_updated_at: this.status_updated_at, ticket_id: this.ticket_id, approved: this.approved, message: this.message, attempt: this.attempt, country: this.country};

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
