import { Component } from '@angular/core';

@Component({
  selector: 'app-fse-installation-details',
  templateUrl: './fse-installation-details.component.html',
  styleUrls: ['./fse-installation-details.component.css']
})
export class FseInstallationDetailsComponent {
  row = [
    {
      id : '',
      name: '',
      email: ''
    }
  ];
  
  addTable() {
    const obj = {
      id: '',
      name: '',
      email: ''
    }
    this.row.push(obj)
  }

  saveTable() {
    
  }
  
  deleteRow(x: number){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1 );
    }
  }
}
