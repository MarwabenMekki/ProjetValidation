import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  course:any={};
  courses:any=[];
  user:any={};
  constructor(private router:Router,
    private courseService:CourseService) { }

  ngOnInit(): void {
    
    let token = sessionStorage.getItem("token");
    if(token){
      let user: any = this.decodeToken(token);
      if (user.role=='admin') {

        this.getAll();

      } else if(user.role == 'teacher') {
       
        this.course.teacher= user.id;
        this.courseService.getTeacherCourses(user.id).subscribe((response)=>{
         console.log("here response from BE",response.courses);
         this.courses= response.courses;
       
        })
      }
      else if(user.role == 'student') {
       
        this.courseService.getStudentCourses(user.id).subscribe((response)=>{
         console.log("here response from BE",response.courses);
         this.courses= response.courses;
       
        })
        }
    }
  }

  goToEdit(id:number){
    this.router.navigate([`editCourse/${id}`]);

  }

  delete(id:any){
    this.courseService.deleteCourse(id).subscribe(
      (data)=>{
        console.log("here data after delete",data.isDeleted);
      // if deleted is OK, send request to get all courses
      if(data.isDeleted){
        this.getAll();
      }
      }
    );
  }

  getAll(){
    this.courseService.getAllCourses().subscribe(
      (response)=>{
        console.log("here response from BE",response);
        this.courses= response.courses;
      }
    );
  }

decodeToken(token: string) {
  return jwt_decode(token);
}   

isLoggedIn(){
  const jwt = sessionStorage.getItem('token');
  if (jwt) {
    this.user= this.decodeToken(jwt);
  }
  return !!jwt;
  }

  goToDisplay(user:any){
this.router.navigate([`noteInfo/${user}`]);
  }
}
