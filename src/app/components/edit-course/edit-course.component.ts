import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  editCourseForm!: FormGroup;
  course: any={};
  id: any;
  errorMsg:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService:CourseService,
    private router:Router) { }

  ngOnInit(): void {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.courseService.getCourseById(this.id).subscribe(
      (data)=>{
        console.log("here data from BE",data);
        this.course=data.course;
      });
  }

  editCourse(){
    console.log("here new course", this.course);
    this.courseService.editCourse(this.course).subscribe(
      (response)=>{
        console.log(response.isupdated);
        if (!(response.isupdated)) {
          this.router.navigate(['dashboardTeacher']);
        }else{
          this.errorMsg = "Error in editing";
        }
  
      }
    );
  }
}
