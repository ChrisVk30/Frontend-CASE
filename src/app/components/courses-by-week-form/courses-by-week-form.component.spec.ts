import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesByWeekFormComponent } from './courses-by-week-form.component';

describe('CoursesByWeekFormComponent', () => {
  let component: CoursesByWeekFormComponent;
  let fixture: ComponentFixture<CoursesByWeekFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesByWeekFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesByWeekFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
