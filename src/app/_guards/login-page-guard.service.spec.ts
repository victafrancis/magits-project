import { TestBed } from '@angular/core/testing';

import { LoginPageGuard } from './login-page-guard.service';

describe('LoginPageGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginPageGuard = TestBed.get(LoginPageGuard);
    expect(service).toBeTruthy();
  });
});
