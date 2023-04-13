import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationDetailsDialogComponent } from './destination-details-dialog.component';

describe('DestinationDetailsDialogComponent', () => {
  let component: DestinationDetailsDialogComponent;
  let fixture: ComponentFixture<DestinationDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
