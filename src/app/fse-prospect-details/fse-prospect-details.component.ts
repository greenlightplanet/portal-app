import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
@Component({
  selector: 'app-fse-prospect-details',
  templateUrl: './fse-prospect-details.component.html',
  styleUrls: ['./fse-prospect-details.component.css']
})
export class FseProspectDetailsComponent implements OnInit {
  rows = [
    {
      fse_angaza_id: '',
      prospect_id: '',
      status: '',
      status_updated_at: '',
      ticket_id: '',
      approved: '',
      message: '',
      attempt: '',
      country: '',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  addRow() {
    this.rows.push({
      fse_angaza_id: '',
      prospect_id: '',
      status: '',
      status_updated_at: '',
      ticket_id: '',
      approved: '',
      message: '',
      attempt: '',
      country: '',
    });
  }

  // getData(index: number) {
  //   this.rows.forEach((row, index) => {
  //   const prospect_id = this.rows[index].prospect_id;
  //   this.http
  //     .get<{
  //       fse_angaza_id: any;
  //       prospect_id: any;
  //       status: any;
  //       status_updated_at: any;
  //       ticket_id: any;
  //       approved: any;
  //       message: any;
  //       attempt: any;
  //       country: any;
  //     }>(
  //       `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details?prospect_id=${prospect_id}`
  //     )
  //     .subscribe((data) => {
  //       this.rows[index] = data;
  //     });
  //   });
  // }

  // getData(index: number) {
  //   this.rows.forEach((currentRow, currentIndex) => {
  //     const prospect_id = currentRow.prospect_id;
  //     this.http
  //       .get<Data[]>(
  //         `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details?prospect_id=${prospect_id}`
  //       )
  //       .subscribe((data) => {
  //         this.rows[currentIndex] = data[0];
  //       });
  //   });
  // }
//   getData(index: number) {
//     const prospect_id = this.rows[index].prospect_id;
//     this.http
//         .get<Data[]>(`http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details?prospect_id=${prospect_id}`)
//         .subscribe((data) => {
//             for (let i = 0; i < data.length; i++) {
//                 this.rows.push(data[i]);
//             }
//         });
// }

getData(index: number) {
  this.rows.forEach((currentRow, currentIndex) => {
    const prospect_id = currentRow.prospect_id;
    this.http
      .get<Data[]>(
        `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details?prospect_id=${prospect_id}`
      )
      .subscribe((data) => {
        this.rows[currentIndex] = data[0];
        if (data.length > 1) {
          for (let i = 1; i < data.length; i++) {
            this.rows.push(data[i]);
          }
        }
      });
  });
}



  saveData(row : any) {
      this.http
        .post(`http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details/`, row)
        .subscribe();
    }

  updateData(row : any) {
      this.http
        .put(
          `http://localhost:8000/amigo/v1.0/workbench-tables/fse-prospect-details/?prospect_id=${row.prospect_id}`,
          row
        )
        .subscribe();
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
}
