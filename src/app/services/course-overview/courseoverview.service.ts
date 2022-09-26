import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from 'src/app/models/courseoverview';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CourseOverviewService {
  constructor( private httpClient : HttpClient ) { }

  subject = new BehaviorSubject<Course[]>([]);
  urlAllCourses : string = "https://localhost:7125/api/courses/all"
  urlWkYrCourses: string = "https://localhost:7125/api/courses/weekyear"
  allcourses: Course[] = [];

  getAllCourses() : Observable<Course[]> {
    this.httpClient
      .get<Course[]>(this.urlAllCourses)
      .subscribe((courses: Course[]) => {
        this.allcourses = courses;
        this.subject.next(courses);
      });

    return this.subject.asObservable();
  };

  getCoursesByWeekYear(week: number, year : number) : Observable<Course[]> {
    if (week === 0) {
      week = moment().week();
      year = moment().year();
    }
    let params = new HttpParams().set("week", week).set("year", year);
    this.httpClient
      .get<Course[]>(this.urlWkYrCourses, { params: params })
      .subscribe((courses: Course[]) => {
        this.allcourses = courses;
        this.subject.next(courses);
      });
    return this.subject.asObservable();
  };

}
