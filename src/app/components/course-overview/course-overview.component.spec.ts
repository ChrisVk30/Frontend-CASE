
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { Course } from 'src/app/models/courseoverview';
import { createDateValues } from 'src/app/models/datevalues';
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
    mockCourseOverviewService.getCoursesByWeekYear.and.returnValue(coursesSubject);
    fixture = TestBed.createComponent(CourseOverviewComponent);
    sut = fixture.componentInstance;
    sut.bookmarks = [];
    fixture.detectChanges();
  });

  it('should call the getAllCourses method when ngOnInit is called', () => {
    var getAllCoursesSpy = spyOn(sut, "getAllCourses");
    sut.ngOnInit();
    expect(getAllCoursesSpy).toHaveBeenCalled();
  }),

  it('should make button active based on number of button given when toggle is called', () => {
    sut.toggle(1);
    expect(sut.activeBtn).toEqual(1);
  }),

  it('should add bookmark to bookmarks array when it doesnt exist yet and array not longer than 12 items when addBookmark is called', () => {
    var getAllCoursesSpy = spyOn(localStorage, "setItem");
    sut.week = moment().week() - 1;
    sut.year = moment().year();
    sut.bookmarks = [];
    for(let i = 0; i < 10; i++) {
      let week = moment().week() + i;
      let year = moment().year();
      sut.bookmarks.push(createDateValues({ chosenWeek: week, chosenYear: year }))
    }
    let lenght = sut.bookmarks.length;
    sut.addBookmark();
    expect(sut.bookmarks.length).toEqual(lenght + 1);
    expect(sut.bookmarks).toContain(createDateValues({ chosenWeek : sut.week, chosenYear: sut.year}));
    expect(getAllCoursesSpy).toHaveBeenCalled();
  }),

  it('should not add bookmark to bookmarks array when it already exist when addBookmark is called', () => {
    sut.week = moment().week();
    sut.year = moment().year();
    sut.bookmarks = [];
    for(let i = 0; i < 10; i++) {
      let week = moment().week() + i;
      let year = moment().year();
      sut.bookmarks.push(createDateValues({ chosenWeek: week, chosenYear: year }))
    }
    let lenght = sut.bookmarks.length;
    sut.addBookmark();
    expect(sut.bookmarks.length).toEqual(lenght);
    expect(sut.bookmarks).toContain(createDateValues({ chosenWeek : sut.week, chosenYear: sut.year}));
  }),

  it('should not add bookmark to bookmarks array when array has a length of 12 when addBookmark is called', () => {
    sut.week = moment().week() - 1;
    sut.year = moment().year();
    sut.bookmarks = [];
    for(let i = 0; i < 12; i++) {
      let week = moment().week() + i;
      let year = moment().year();
      sut.bookmarks.push(createDateValues({ chosenWeek: week, chosenYear: year }))
    }
    let lenght = sut.bookmarks.length;
    sut.addBookmark();
    expect(sut.bookmarks.length).toEqual(lenght);
    expect(sut.bookmarks).not.toContain(createDateValues({ chosenWeek : sut.week, chosenYear: sut.year}));
  }),

  it('should call the getAllCourses method on the CourseOverviewService whenever the getAllCourses is called', () => {
    sut.getAllCourses();
    expect(mockCourseOverviewService.getAllCourses).toHaveBeenCalled();
  }),

  it('should call the setDateValues method when getCoursesWkYr is called', () => {
    var setDateValuesSpy = spyOn(sut, "setDateValues");
    var dateValues = createDateValues({chosenWeek: 10, chosenYear: 2022});
    sut.getCoursesWkYr(dateValues);
    expect(setDateValuesSpy).toHaveBeenCalled();
  }),

  it('should call the getCoursesByWeekYear method when getCoursesWkYr is called', () => {
    var dateValues = createDateValues({chosenWeek: 10, chosenYear: 2022});
    sut.getCoursesWkYr(dateValues);
    expect(mockCourseOverviewService.getCoursesByWeekYear).toHaveBeenCalled();
  }),

  it('should call setDateValues with provided addition when getCoursesWk is called', () => {
    sut.date;
    var setDateValuesSpy = spyOn(sut, "setDateValues");
    sut.getCoursesWk(1);
    console.log(sut.date);
    expect(setDateValuesSpy).toHaveBeenCalledOnceWith(sut.date.add(1, "week"));
    expect(mockCourseOverviewService.getCoursesByWeekYear).toHaveBeenCalled();
  }),

  it('should call setDateValues with current datetime when no addition has been provided when getCoursesWk is called', () => {
    sut.date;
    var setDateValuesSpy = spyOn(sut, "setDateValues");
    sut.getCoursesWk();
    expect(setDateValuesSpy).toHaveBeenCalledOnceWith(moment());
    expect(mockCourseOverviewService.getCoursesByWeekYear).toHaveBeenCalled();
  }),

  it('should update the dates in component which will be used to update form data when the method setDateValues is called',() => {
    sut.setDateValues(moment().add(2, "week"));
    expect(sut.week).toBe(sut.date.week());
    expect(sut.year).toBe(sut.date.year());
  })
});
