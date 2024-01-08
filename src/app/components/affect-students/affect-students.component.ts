import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affect-students',
  templateUrl: './affect-students.component.html',
  styleUrls: ['./affect-students.component.css']
})
export class AffectStudentsComponent implements OnInit {

courses:any={};
students:any=[];
idStudent:any;
idCourse:any;
obj:any={};
  constructor(
    private userServices:UserService,
    private courseService:CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data)=>{
      console.log("here data from BE",data.courses);
      this.courses = data.courses;
      
     })

    this.userServices.getAllUsers().subscribe((response)=>{
      console.log("here data from BE",response.users);
   
     this.students = response.users.filter((user:any)=> user.role =='student');
     
     })
  }

  selectStudent(evt:any){
    console.log("here event",evt.target.value);
    this.idStudent= evt.target.value;
  }

  selectCourse(evt:any){
    console.log("here event",evt.target.value);
    this.idCourse= evt.target.value;
  }

  affectStudent(){
    this.obj={
      idStudent: this.idStudent,
      idCourse: this.idCourse,
    }
    this.userServices.affect(this.obj).subscribe((response)=>{
    console.log("here response from BE", response.msg);
    
   })
  }
}
