import { TestBed } from '@angular/core/testing';

import { CuentasService } from './servicio.service';

describe('CuentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentasService = TestBed.get(CuentasService);
    expect(service).toBeTruthy();
  });
});
