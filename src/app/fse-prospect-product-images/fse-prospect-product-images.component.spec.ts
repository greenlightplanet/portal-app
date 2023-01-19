import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FseProspectProductImagesComponent } from './fse-prospect-product-images.component';

describe('FseProspectProductImagesComponent', () => {
  let component: FseProspectProductImagesComponent;
  let fixture: ComponentFixture<FseProspectProductImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FseProspectProductImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FseProspectProductImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
