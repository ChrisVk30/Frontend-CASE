import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UploadFileService } from './uploadfile.service';

describe('Service: UploadServiceService', () => {
  let service: UploadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UploadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
