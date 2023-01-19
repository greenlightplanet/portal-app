import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FseInstallationDetailsComponent } from './fse-installation-details.component';

describe('FseInstallationDetailsComponent', () => {
  let component: FseInstallationDetailsComponent;
  let fixture: ComponentFixture<FseInstallationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FseInstallationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FseInstallationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
