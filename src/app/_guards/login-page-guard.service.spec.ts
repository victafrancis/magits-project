import { TestBed } from '@angular/core/testing';

import { LoginPageGuardService } from './login-page-guard.service';

describe('LoginPageGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginPageGuardService = TestBed.get(LoginPageGuardService);
    expect(service).toBeTruthy();
  });
});
