import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CourseOverview } from 'src/app/models/courseoverview';
import { CourseOverviewService } from 'src/app/services/course-overview/courseoverview.service';

@Component({
  selector: 'isk-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {

  subscription!: Subscription;
  allcourses: CourseOverview[] = [];
  isLoading: boolean = true;
  currentWeek : number = moment().week();
  currentYear : number = moment().year();
  
  constructor ( private courseOverviewService : CourseOverviewService ) { }
  
  getCoursesByWeekYearForm = new FormGroup({
    chosenWeek: new FormControl(moment().week(), {
      validators: [Validators.required, Validators.min(1), Validators.max(53)],
      nonNullable: true
    }),
    chosenYear: new FormControl(moment().year(), { 
      validators: [Validators.required, Validators.min(moment().year() - 5), Validators.max(moment().year() + 1)],
      nonNullable: true 
    })
    });

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() : void {
    this.subscription = this.courseOverviewService
      .getAllCourses()
      .subscribe((courses: CourseOverview[]) => {
        this.allcourses = courses;
        this.isLoading = false;
      })
  }

  getCoursesWkYr() : void {
    let week = this.getCoursesByWeekYearForm.controls.chosenWeek.getRawValue();
    let year = this.getCoursesByWeekYearForm.controls.chosenYear.getRawValue();
    this.subscription = this.courseOverviewService
      .getCoursesByWeekYear(week, year)
      .subscribe((courses: CourseOverview[]) => {
        this.allcourses = courses;
        this.isLoading = false;
      })
  }

  getCoursesCurrWk(week : number, year : number) : void {
    this.subscription = this.courseOverviewService
      .getCoursesByWeekYear(week, year)
      .subscribe((courses: CourseOverview[]) => {
        this.allcourses = courses;
        this.isLoading = false;
      })
    this.getCoursesByWeekYearForm.controls.chosenYear.setValue(year);
    this.getCoursesByWeekYearForm.controls.chosenWeek.setValue(week);
  }

  getCoursesNextWk() {
    let week = this.getCoursesByWeekYearForm.controls.chosenWeek.getRawValue() + 1;
    let year = this.getCoursesByWeekYearForm.controls.chosenYear.getRawValue();
    this.subscription = this.courseOverviewService
      .getCoursesByWeekYear(week, year)
      .subscribe((courses: CourseOverview[]) => {
        this.allcourses = courses;
        this.isLoading = false;
      })
    this.getCoursesByWeekYearForm.controls.chosenYear.setValue(year);
    this.getCoursesByWeekYearForm.controls.chosenWeek.setValue(week);
  }

  getCoursesPrevWk() {
    let week = this.getCoursesByWeekYearForm.controls.chosenWeek.getRawValue() - 1;
    let year = this.getCoursesByWeekYearForm.controls.chosenYear.getRawValue();
    this.subscription = this.courseOverviewService
      .getCoursesByWeekYear(week, year)
      .subscribe((courses: CourseOverview[]) => {
        this.allcourses = courses;
        this.isLoading = false;
      })
    this.getCoursesByWeekYearForm.controls.chosenYear.setValue(year);
    this.getCoursesByWeekYearForm.controls.chosenWeek.setValue(week);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
