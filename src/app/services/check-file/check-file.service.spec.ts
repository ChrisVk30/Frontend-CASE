import { TestBed } from '@angular/core/testing';
import { ErrorResult } from 'src/app/models/errorresult';

import { CheckFileService } from './check-file.service';

describe('Service: CheckFileService', () => {
  let service: CheckFileService;
  let errorResult : ErrorResult;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckFileService);
    errorResult = {} as ErrorResult
  });

  it('should give back an empty array when the first line is not starting with "Title" and the errorMessage should contain "Titel:" when checkForErrors is called', () => {
    errorResult = service.checkForErrors("\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n");
    expect(errorResult.courseArray).toEqual([ ]);
    expect(errorResult.errorMessage).not.toBeNull();
    expect(errorResult.errorMessage.includes("Titel:")).toBe(true)
  });

  it('should not give back an empty array when the file is correct and the errorMessage should be empty when checkForErrors is called', () => {
    errorResult = service.checkForErrors("Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n");
    expect(errorResult.courseArray).not.toEqual([ ]);
    expect(errorResult.errorMessage).toBe('');
  });

  it('should give back an empty array when the second line is not starting with "Cursuscode" and the errorMessage should contain "Cursuscode:" when checkForErrors is called', () => {
    errorResult = service.checkForErrors("Titel: C# Programmeren\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n");
    expect(errorResult.courseArray).toEqual([ ]);
    expect(errorResult.errorMessage).not.toBe('');
    expect(errorResult.errorMessage.includes("Cursuscode:")).toBe(true)
  });

  it('should give back an empty array when the second line is not starting with "Duur:" and the errorMessage should contain "dagen" when checkForErrors is called', () => {
    errorResult = service.checkForErrors("Titel: C# Programmeren\nCursuscode: CNETIN\nLengte: 5 dagen\nStartdatum: 8/10/2018\n\n");
    expect(errorResult.courseArray).toEqual([ ]);
    expect(errorResult.errorMessage).not.toBe('');
    expect(errorResult.errorMessage.includes("Duur:")).toBe(true);
  });

  it('should give back an empty array when the second line is not ending with "dagen" and the errorMessage should contain "dagen" when checkForErrors is called', () => {
    errorResult = service.checkForErrors("Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 uur\nStartdatum: 8/10/2018\n\n");
    expect(errorResult.courseArray).toEqual([ ]);
    expect(errorResult.errorMessage).not.toBe('');
    expect(errorResult.errorMessage.includes("dagen")).toBe(true);
  });
  it('should give back an empty array when the third line is not starting with "Startdatum: " and the errorMessage should contain "Startdatum:" when checkForErrors is called', () => {
    errorResult = service.checkForErrors("Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\n\n\n");
    expect(errorResult.courseArray).toEqual([ ]);
    expect(errorResult.errorMessage).not.toBe('');
    expect(errorResult.errorMessage.includes("Startdatum:")).toBe(true);
  });

  it('should give back an errorMessage which should contain "leeg" when the fourth line is not an empty line when checkForErrors is called', () => {
    errorResult = service.checkForErrors("Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\nTitel: C# Programmeren\n");
    expect(errorResult.errorMessage).not.toBe('');
    expect(errorResult.errorMessage.includes("leeg")).toBe(true);
  });

//   it('should give back an empty array when the first line is incorrect and the errorMessage should be filled when checkForErrors is called', () => {
//     var errorResult : ErrorResult = service.checkForErrors("Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n");
//     expect(errorResult.courseArray).not.toEqual([ ]);
//     expect(errorResult.errorMessage).toBe('');
//   });

//   it('should give back an empty array when the first line is incorrect and the errorMessage should be filled when checkForErrors is called', () => {
//     var errorResult : ErrorResult = service.checkForErrors("Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n");
//     expect(errorResult.courseArray).not.toEqual([ ]);
//     expect(errorResult.errorMessage).toBe('');
//   });
});
