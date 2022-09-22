import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { CoursesAddedStats } from 'src/app/models/courseaddedstats';
import { CourseOverview } from 'src/app/models/courseoverview';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor (private http: HttpClient) {}

  stats : CoursesAddedStats = {} as CoursesAddedStats;

  objArray : CourseOverview[] = [];

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  upload(text: string): CourseOverview[] {
    console.log('Upload');
    var obj : CourseOverview = {} as CourseOverview;
    var lines = text.split('\n');
    let counter = 0;

    for(var i = 0; i < lines.length; i++) {
      if(lines[i] !== "")
      {
        let index = lines[i].indexOf(":") + 2
        counter ++;
        if(lines[i].startsWith('Titel:')) {
          obj.title = lines[i].substring(index)
        }
        else if (lines[i].startsWith('Cursuscode:')) {
          obj.courseCode = lines[i].substring(index)
        }
        else if (lines[i].startsWith('Duur:')) {
          obj.duration = parseInt(lines[i].substring(index, index + 1));
        }
        else if (lines[i].startsWith('Startdatum:')) {
          obj.startDate = lines[i].substring(index)
        }
      }
      else {
        if (Object.keys(obj).length) {
          this.objArray.push(obj as CourseOverview);
          counter = 0;
          obj = {} as CourseOverview;
        }
      }
    }
    return this.objArray;
 }

  async PostCourses(objArray : object[]) : Promise<CoursesAddedStats> {
    console.log('Post');
    this.stats = await firstValueFrom(this.http.post<CoursesAddedStats>('https://localhost:7125/api/courses', objArray, this.httpOptions))
    console.log('Post complete')
    this.objArray = [];
    return this.stats;
  }

  
}
