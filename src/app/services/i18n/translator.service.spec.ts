import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TranslatorService } from './translator.service';

describe('TranslatorService', () => {
  let service: TranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
    });
    service = TestBed.inject(TranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
