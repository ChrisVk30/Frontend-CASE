import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { CoursesAddedStats } from 'src/app/models/courseaddedstats';
import { Course } from 'src/app/models/courseoverview';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor (
    private http: HttpClient
    ) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  readFile = (file: any) : Promise<string> => {
    const fileReader : FileReader = new FileReader();
    return new Promise((res, rej) => {
      fileReader.onloadend = () => {
        const data = fileReader.result;
        const txtData = data!.toString();
        res(txtData);
      }
      fileReader.readAsText(file);
    });
  }

  async PostCourses(courseArray : Course[]) : Promise<CoursesAddedStats> {
    return await firstValueFrom(this.http.post<CoursesAddedStats>('https://localhost:7125/api/courses', courseArray, this.httpOptions))
  }
}
