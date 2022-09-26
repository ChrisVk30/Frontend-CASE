import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesAddedStats } from 'src/app/models/courseaddedstats';
import { CourseMutations, CreateCourseMutation } from 'src/app/models/coursemutations';
import { ErrorResult } from 'src/app/models/errorresult';
import { CheckFileService } from 'src/app/services/check-file/check-file.service';
import { UploadFileService } from 'src/app/services/upload-file/uploadfile.service';

@Component({
  selector: 'isk-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
   
  constructor (
    private uploadFileService: UploadFileService,
    private checkFileService : CheckFileService
    ) { }

  message: string = "";
  duplicateMessage : string = "";
  errorMessage : string = "";
  showMessage = false;
  showDuplicateMessage = false;
  showErrorMessage = false;

  addByStartEndDateForm = new FormGroup({
    chosenWeek: new FormControl('', {
      validators: [],
    }),
    chosenYear: new FormControl('', { 
      validators: [],
    })
    });

  async getFile(event: any) : Promise<void> {
    this.showMessage = this.showDuplicateMessage = this.showErrorMessage = false;
    const txtData = await this.uploadFileService.readFile(event.target.files[0]);
    let errorObject : ErrorResult = this.checkFileService.checkForErrors(txtData);
    if (!errorObject.errorMessage) {
      let stats : CoursesAddedStats = await this.uploadFileService.postCourses(errorObject.courseArray);
      this.setMessages(stats);
      return;
    }
    this.errorMessage = errorObject.errorMessage;
    this.showErrorMessage = true;
  };
  
  setMessages(stats : CoursesAddedStats ) {
    let mutations : CourseMutations = CreateCourseMutation();
    mutations.setValues(stats);
    if(mutations.newCourseInstances) {
      this.message = `Er zijn ${ mutations.newCourses } nieuwe cursussen en ${ mutations.newCourseInstances } nieuwe cursus instanties toegevoegd!`
      this.showMessage = true;
    }
    if(mutations.duplicateCourseInstances) {
      this.duplicateMessage = `Er zijn ${mutations.duplicateCourseInstances} duplicaten tegengekomen`;
      this.showDuplicateMessage = true;
    } 
  }

  ngOnInit(): void {
  }

}
