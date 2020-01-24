import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrInfoDialogComponent } from './qr-info-dialog.component';

describe('QrInfoDialogComponent', () => {
  let component: QrInfoDialogComponent;
  let fixture: ComponentFixture<QrInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
