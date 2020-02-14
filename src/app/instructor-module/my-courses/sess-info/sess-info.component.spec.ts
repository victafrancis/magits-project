import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessInfoComponent } from './sess-info.component';

describe('SessInfoComponent', () => {
  let component: SessInfoComponent;
  let fixture: ComponentFixture<SessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
