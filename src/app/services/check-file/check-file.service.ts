import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/courseoverview';
import { ErrorResult } from 'src/app/models/errorresult';

@Injectable({
  providedIn: 'root'
})
export class CheckFileService {
  checkForErrors(text: string): ErrorResult {
    let lines = text.split('\n');
    let course : Course = new Course();
    let errorResult : ErrorResult = new ErrorResult();
    let counter : number = 0;
    
    for(var i = 0; i < lines.length - 1; i++) {
      let index : number = lines[i].indexOf(":") + 2
      switch(counter) {
        case 0: {
          if(!lines[i].startsWith('Titel:')) {
            errorResult.errorMessage = `Regel ${i + 1} start niet met 'Titel:'!`
            break;
          }
          course.title = lines[i].substring(index)
          break;
        }
        case 1: {
          if(!lines[i].startsWith('Cursuscode:')) {
            errorResult.errorMessage = `Regel ${i + 1} start niet met 'Cursuscode:'!`
            break;
          }
          course.courseCode = lines[i].substring(index)
          break;
        }
        case 2: {
          if(!lines[i].startsWith('Duur:') || !lines[i].endsWith('dagen')) {
            errorResult.errorMessage = `Regel ${i + 1} start niet met 'Duur:' of eindigt niet met dagen!`
            break;
          }
          course.duration = parseInt(lines[i].substring(index, index + 1));
          break;
        }
        case 3: {
          if(!lines[i].startsWith('Startdatum:') || !/[0-9]{1,2}\/[0-9]{2}\/[0-9]{4}$/.test(lines[i])) {
            errorResult.errorMessage = `Regel ${i + 1} start niet met 'Startdatum:' of heeft een incorrect format!`
          }
          course.startDate = lines[i].substring(index);
          break;
        }
        case 4: {
          if(lines[i].length != 0) {
            errorResult.errorMessage = `Regel ${i + 1} zou leeg moeten zijn!`
          }
          errorResult.courseArray.push(course as Course);
          break;
        }
      }
      if(errorResult.errorMessage != "") {
          break;
      }
      else if (counter === 4) {
        counter = 0;
      }
      else {
        counter++;
      }
    }    
    return errorResult;
  }

  constructor() { }
}