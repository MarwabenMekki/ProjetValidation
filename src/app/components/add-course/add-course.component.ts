import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!:FormGroup;
  course:any={};
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
  }
  addCourse(){
  console.log("here course object",this.course);
  let token= sessionStorage.getItem("token");
  let user: any = this.decodeToken(token);
  this.course.teacher=user.id;
    this.courseService.addCourse(this.course).subscribe(
      (response)=>{
        console.log("here response from BE",response.msg);
        
      });
  }

  decodeToken(token:any) {
    return jwt_decode(token);
  }   
}
