import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FseProspectDetailsComponent } from './fse-prospect-details.component';

describe('FseProspectDetailsComponent', () => {
  let component: FseProspectDetailsComponent;
  let fixture: ComponentFixture<FseProspectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FseProspectDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FseProspectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
