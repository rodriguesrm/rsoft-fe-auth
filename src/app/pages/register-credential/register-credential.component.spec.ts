import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCredentialComponent } from './register-credential.component';

describe('RegisterCredentialComponent', () => {
  let component: RegisterCredentialComponent;
  let fixture: ComponentFixture<RegisterCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
