import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fse-installation-details',
  templateUrl: './fse-installation-details.component.html',
  styleUrls: ['./fse-installation-details.component.css']
})
export class FseInstallationDetailsComponent implements OnInit{
  rows = [
    {
      fse_angaza_id: '',
      prospect_id: '',
      installation_picture: '',
      latitude: '',
      longitude: '',
      distance: '',
      accuracy: '',
      attempt: '',
      country: '',
      image_name: '',
      is_rejected: '',
      rejection_attempt: '',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  addRow() {
    this.rows.push({
      fse_angaza_id: '',
      prospect_id: '',
      installation_picture: '',
      latitude: '',
      longitude: '',
      distance: '',
      accuracy: '',
      attempt: '',
      country: '',
      image_name: '',
      is_rejected: '',
      rejection_attempt: '',
    });
  }

  getData(index: number) {
    const prospect_id = this.rows[index].prospect_id;
    this.http
      .get<{
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
      }>(
        `http://localhost:8000/amigo/v1.0/workbench-tables/fse-installation-details?prospect_id=${prospect_id}`
      )
      .subscribe((data) => {
        this.rows[index] = data;
      });
  }

  saveData(row : any) {
      this.http
        .post(`http://localhost:8000/amigo/v1.0/workbench-tables/fse-installation-details/`, row)
        .subscribe();
    }

  updateData(row : any) {
      this.http
        .put(
          `http://localhost:8000/amigo/v1.0/workbench-tables/fse-installation-details/?prospect_id=${row.prospect_id}`,
          row
        )
        .subscribe();
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}
