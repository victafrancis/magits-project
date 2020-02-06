import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMembershipComponent } from './edit-membership.component';

describe('EditMembershipComponent', () => {
  let component: EditMembershipComponent;
  let fixture: ComponentFixture<EditMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
