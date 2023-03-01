import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTablesComponent } from './login-tables.component';

describe('LoginTablesComponent', () => {
  let component: LoginTablesComponent;
  let fixture: ComponentFixture<LoginTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
