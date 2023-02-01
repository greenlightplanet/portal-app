import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})

export class TablesComponent {
  options = [
    { value: '', name: 'Please select a Table' },
    { value: 'fse-prospect', name: 'fse-prospect' },
    { value: 'fse-prospect-details', name: 'fse-prospect-details' },
    { value: 'fse-installation-details', name: 'fse-installation-details' },
    { value: 'fse-prospect-product-images', name: 'fse-prospect-product-images' },
    { value: 'staff-users', name: 'staff-users' }
  ];
  selectedOption = this.options[0].value;
}
