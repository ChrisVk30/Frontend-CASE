import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { subscribeOn } from 'rxjs';
import { Course } from 'src/app/models/courseoverview';

import { CourseOverviewService } from './courseoverview.service';

describe('Service: CourseserviceService', () => {
  let service: CourseOverviewService;
  let courses: Course[];
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CourseOverviewService]
        });
    service = TestBed.inject(CourseOverviewService);
    courses = [
      { title: "Titel", duration: 5, courseCode: "Test", startDate: "21/10/2022" },
      { title: "Titel2", duration: 3, courseCode: "Test1", startDate: "19/10/2022" }
    ] as Course[];

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CourseOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called', () => {
    // service.getAllCourses().subscribe(
    //   output => expect(output).toEqual(courses));

      // const req = httpTestingController.expectOne(service.urlAllCourses);
      // expect(req.request.method).toEqual('GET');
  });
});
