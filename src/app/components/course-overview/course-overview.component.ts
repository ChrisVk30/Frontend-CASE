import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/courseoverview';
import { DateValues } from 'src/app/models/datevalues';
import { CourseOverviewService } from 'src/app/services/course-overview/courseoverview.service';

@Component({
  selector: 'isk-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent implements OnInit {

  subscription!: Subscription;
  isLoading: boolean = true;
  allCourses : Course[] = [];
  date: moment.Moment = moment().startOf('week');
  week: number = this.date.week();
  year: number = this.date.year();
  bookmarks: DateValues[] = []
  
  constructor ( 
    private courseOverviewService : CourseOverviewService,
    ) { }
  
  ngOnInit(): void {
    this.getAllCourses();
    if (localStorage.getItem("favorites")) {
      this.bookmarks = JSON.parse(localStorage.getItem("favorites")!);
  } else {
      this.bookmarks = [];
  }
  }

  addBookmark() {
    if(!this.bookmarks.some(x => (x.chosenWeek == this.week && x.chosenYear === this.year)) && this.bookmarks.length < 12) {
        this.bookmarks.push({ chosenWeek: this.week, chosenYear: this.year })    
        localStorage.setItem("favorites", JSON.stringify(this.bookmarks));
    }
  }

  getAllCourses() : void {
    this.subscription = this.courseOverviewService
      .getAllCourses()
      .subscribe((courses: Course[]) => {
        this.allCourses = courses;
        this.isLoading = false;
      })
  }

  getCoursesWkYr(dateValues : DateValues) : void {
    this.setDateValues(this.date.year(dateValues.chosenYear).week(dateValues.chosenWeek));
    this.subscription = this.courseOverviewService
      .getCoursesByWeekYear(dateValues.chosenWeek, dateValues.chosenYear)
      .subscribe((courses: Course[]) => {
        this.allCourses = courses;
        this.isLoading = false;
      })
  }

  getCoursesWk(addition?: number) : void {
    if (addition) {
      this.setDateValues(this.date.add(addition, "week"));
    }
    else {
      this.setDateValues(moment());
    }
    this.subscription = this.courseOverviewService
      .getCoursesByWeekYear(this.date.week(), this.date.year())
      .subscribe((courses: Course[]) => {
        this.allCourses = courses;
        this.isLoading = false;
      })
  }

  setDateValues(date : moment.Moment) {
    this.date = date;
    this.week = date.week();
    this.year = date.year();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
