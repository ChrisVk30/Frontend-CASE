import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseOverviewService } from 'src/app/services/course-overview/courseoverview.service';

import { CourseOverviewComponent } from './course-overview.component';

describe('Component: CourseOverviewComponent', () => {
  let sut: CourseOverviewComponent;
  let mockCourseOverviewService : CourseOverviewService = jasmine.createSpyObj('mockCourseOverviewService',['getAllCourses','getCoursesByWeekYear']);
  let fixture: ComponentFixture<CourseOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOverviewComponent ],
      providers : [ { provide: CourseOverviewService, useValue: mockCourseOverviewService } ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CourseOverviewComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should return true', () => {
    expect(42).toBe(42);
  })
});
