import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { createDateValues, DateValues } from 'src/app/models/datevalues';

@Component({
  selector: 'isk-courses-by-week-form',
  templateUrl: './courses-by-week-form.component.html',
  styleUrls: ['./courses-by-week-form.component.scss']
})
export class CoursesByWeekFormComponent implements OnInit {

  @Output()
  dateEvent = new EventEmitter<DateValues>();
  
  @Input()
  chosenWeek : number = moment().week();
  
  @Input()
  chosenYear : number = moment().year();


  coursesWkYr() {
    this.dateEvent.emit(
                        createDateValues({ 
                          chosenWeek : this.getCoursesByWeekYearForm.controls.chosenWeek.getRawValue(),
                          chosenYear : this.getCoursesByWeekYearForm.controls.chosenYear.getRawValue()
                        }));
  }

  constructor() { }

  ngOnInit(): void {
  }

  getCoursesByWeekYearForm = new FormGroup({
    chosenWeek: new FormControl(this.chosenWeek, {
      validators: [Validators.required, Validators.min(1), Validators.max(53)],
      nonNullable: true
    }),
    chosenYear: new FormControl(this.chosenYear, { 
      validators: [Validators.required, Validators.min(moment().year() - 5), Validators.max(moment().year() + 1)],
      nonNullable: true 
    })
    });

}
