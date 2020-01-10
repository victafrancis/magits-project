import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncementComponent } from './create-announcement.component';

describe('CreateAnnouncementComponent', () => {
  let component: CreateAnnouncementComponent;
  let fixture: ComponentFixture<CreateAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
