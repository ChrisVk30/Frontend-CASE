import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { Course } from 'src/app/models/courseoverview';
import { CourseOverviewService } from 'src/app/services/course-overview/courseoverview.service';

import { CourseOverviewComponent } from './course-overview.component';

describe('Component: CourseOverviewComponent', () => {
  let sut: CourseOverviewComponent;
  let mockCourseOverviewService: jasmine.SpyObj<CourseOverviewService> = jasmine.createSpyObj<CourseOverviewService>('mockCourseOverviewService',['getAllCourses','getCoursesByWeekYear']);
  let fixture: ComponentFixture<CourseOverviewComponent>;
  let coursesSubject: Subject<Course[]>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOverviewComponent ],
      providers : [ { provide: CourseOverviewService, useValue: mockCourseOverviewService } ]
    })
    .compileComponents();
    coursesSubject = new Subject();
    mockCourseOverviewService.getAllCourses.and.returnValue(coursesSubject);
    fixture = TestBed.createComponent(CourseOverviewComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should return true', () => {
    // coursesSubject.next()
    expect(42).toBe(42);
  })
});
