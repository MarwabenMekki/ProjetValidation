import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!:FormGroup;
  course:any={};
  imagePreview: any;
  img:any;
  constructor(private courseService:CourseService,
    private router:Router) { }

  ngOnInit(): void {
  }
  addCourse(){
  console.log("here course object",this.course);
  let token= sessionStorage.getItem("token");
  let user: any = this.decodeToken(token);
  this.course.teacher=user.id;
    this.courseService.addCourse(this.course, this.img).subscribe(
      (response)=>{
        console.log("here response from BE",response.msg);
        this.router.navigate(["dashboardTeacher"]);
      });
  }

  decodeToken(token:any) {
    return jwt_decode(token);
  }   

  onImageSelected(event: Event) {
    const fileInput = (event.target as HTMLInputElement);
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.img = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(file);
    }
  }
}
