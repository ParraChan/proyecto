import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosFormComponent } from './creditos-form.component';

describe('CreditosFormComponent', () => {
  let component: CreditosFormComponent;
  let fixture: ComponentFixture<CreditosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditosFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
