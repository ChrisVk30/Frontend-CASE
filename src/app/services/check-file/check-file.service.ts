import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFileService {
  async checkForErrors(text: string): Promise<string> {
    let lines = text.split('\n');
    let counter : number = 0;
    let message : string = "";

    for(var i = 0; i < lines.length - 1; i++) {
      switch(counter) {
        case 0: {
          if(!lines[i].startsWith('Titel:')) {
            message = `Regel ${i + 1} start niet met 'Titel:'!`
          }
          break;
        }
        case 1: {
          if(!lines[i].startsWith('Cursuscode:')) {
            message = `Regel ${i + 1} start niet met 'Cursuscode:'!`
          }
          break;
        }
        case 2: {
          if(!lines[i].startsWith('Duur:') || !lines[i].endsWith('dagen')) {
            message = `Regel ${i + 1} start niet met 'Duur:' of eindigt niet met dagen!`
          }
          break;
        }
        case 3: {
          if(!lines[i].startsWith('Startdatum:') || !/[0-9]{1,2}\/[0-9]{2}\/[0-9]{4}$/.test(lines[i])) {
            message = `Regel ${i + 1} start niet met 'Startdatum:' of heeft een incorrect format!`
          }
          break;
        }
        case 4: {
          if(lines[i].length != 0) {
            message = `Regel ${i + 1} zou leeg moeten zijn!`
          }
          break;
        }
      }
      if(message != "") {
          break;
      }
      else if (counter === 4) {
        counter = 0;
      }
      else {
        counter++;
      }
    }
    return await message;
  }

  constructor() { }
}
