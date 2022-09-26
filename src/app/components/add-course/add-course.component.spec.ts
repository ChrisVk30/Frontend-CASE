import { TestBed } from '@angular/core/testing';
import { CheckFileService } from 'src/app/services/check-file/check-file.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UploadFileService } from 'src/app/services/upload-file/uploadfile.service';
import { AddCourseComponent } from './add-course.component';
import { CoursesAddedStats, createCoursesAddedStats } from 'src/app/models/courseaddedstats';
import { CourseMutations, CreateCourseMutation } from 'src/app/models/coursemutations';

describe('Component: AddCourseComponent', () => {
  let sut: AddCourseComponent;
  let mockUploadFileService: UploadFileService = jasmine.createSpyObj('mockUploadFileService', ['readFile'])
  let event : any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseComponent],
      imports: [HttpClientTestingModule], 
      providers: [{ provide: CheckFileService, useValue: mockUploadFileService }],
    });
    sut = TestBed.createComponent(AddCourseComponent).componentInstance;
    event = "hi";
    // mockUploadFileService.readFile.and.returnValue(coursesSubject);
    // mockCourseOverviewService.getCoursesByWeekYear.and.returnValue(coursesSubject);
    
    // spyOn(fakeProductService, 'getAll');
    // productService.getAll = jasmine.createSpy();
  });

  it('should turn showDuplicateMessage to true when there are only duplicate courseInstances', () => {
    var stats = new CoursesAddedStats;
    stats.courseInstancesAdded = 'ddddd';
    stats.coursesAdded = 'nnnnn';
    sut.setMessages(stats);
    expect(sut.showDuplicateMessage).toBe(true);
    expect(sut.showMessage).toBe(false);
    expect(sut.message).toBe("");
    expect(sut.duplicateMessage).not.toBe("");
  });
  it('should turn showDuplicateMessage & showMessage to true when there are new and duplicate courseInstances', () => {
    var stats = new CoursesAddedStats;
    stats.courseInstancesAdded = 'dnddd';
    stats.coursesAdded = 'nnnnn';
    sut.setMessages(stats);
    expect(sut.showDuplicateMessage).toBe(true);
    expect(sut.showMessage).toBe(true);
    expect(sut.message).not.toBe("");
    expect(sut.duplicateMessage).not.toBe("");
  });
  it('should turn showMessage to true when there are only new courseInstances', () => {
    var stats = new CoursesAddedStats;
    stats.courseInstancesAdded = 'nnnnn';
    stats.coursesAdded = 'nnnnn';
    sut.setMessages(stats);
    expect(sut.showDuplicateMessage).toBe(false);
    expect(sut.showMessage).toBe(true);
    expect(sut.message).not.toBe("");
    expect(sut.duplicateMessage).toBe("");
  });
});