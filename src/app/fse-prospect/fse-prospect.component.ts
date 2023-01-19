import { Component } from '@angular/core';

@Component({
  selector: 'app-fse-prospect',
  templateUrl: './fse-prospect.component.html',
  styleUrls: ['./fse-prospect.component.css']
})
export class FseProspectComponent {
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