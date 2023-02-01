import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FseProspectComponent } from './fse-prospect.component';

describe('FseProspectComponent', () => {
  let component: FseProspectComponent;
  let fixture: ComponentFixture<FseProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FseProspectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FseProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
