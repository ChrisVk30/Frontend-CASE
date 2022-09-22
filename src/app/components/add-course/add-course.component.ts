import { Component, OnInit } from '@angular/core';
import { CoursesAddedStats } from 'src/app/models/courseaddedstats';
import { CourseOverview } from 'src/app/models/courseoverview';
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

  input : string = "";
  message: string = "";
  duplicateMessage : string = "";
  errorMessage : string = "";
  duplicateCourseInstances: number = 0;
  newCourseInstances : number = 0;
  newCourses : number = 0;
  values: CourseOverview[] = [];
  stats: CoursesAddedStats = {} as CoursesAddedStats;

  getFile(event: any) : void {
    console.log('GetFile');
    this.duplicateCourseInstances = 0;
    this.readFile(event.target.files[0]);
  };

  readFile = (file: any) => {
    console.log('Read');
    const fileReader : FileReader = new FileReader();
    fileReader.onloadend = (ev) => {
      const data = fileReader.result;
      var txtData = data!.toString();
      this.checkFileService.checkForErrors(txtData)
        .then(x => this.errorMessage = x)
        .then(() => {if(this.errorMessage === "") {
          console.log('errorHandling');
          this.values = this.uploadFileService.upload(txtData);
          this.uploadFileService.PostCourses(this.values)
          .then(x => (this.stats = x, console.log('stats update')))
          .then(() => (
            console.log('instance update'),
            this.duplicateCourseInstances = (this.stats.courseInstancesAdded.match(/d/g) || []).length, 
            this.newCourseInstances = (this.stats.courseInstancesAdded.match(/n/g) || []).length,
            this.newCourses = (this.stats.coursesAdded.match(/n/g) || []).length))
          .then(() => this.message = `Er zijn ${ this.newCourses } nieuwe cursussen en ${ this.newCourseInstances } nieuwe cursus instanties toegevoegd!`)
          .then(() => { 
            if (this.duplicateCourseInstances > 0) 
            {
              this.duplicateMessage = `Er zijn ${this.duplicateCourseInstances} duplicaten tegengekomen`
            }
        })
        }} 
      ) 
    }
    fileReader.readAsText(file);
  }
  
  ngOnInit(): void {
  }

}
