import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementInfoComponent } from './announcement-info.component';

describe('AnnouncementInfoComponent', () => {
  let component: AnnouncementInfoComponent;
  let fixture: ComponentFixture<AnnouncementInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
