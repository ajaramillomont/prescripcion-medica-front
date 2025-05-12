import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCardsComponent } from './service-cards.component';

describe('ServiceCardsComponent', () => {
  let component: ServiceCardsComponent;
  let fixture: ComponentFixture<ServiceCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
