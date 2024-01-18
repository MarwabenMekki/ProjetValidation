import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  noteForm!:FormGroup;
  note:any={};
  course:any={};
  courses:any=[];
  students:any=[];
  idStudent:any;
  idCourse: any;

  constructor(
    private noteService:NoteService,
    private courseService:CourseService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if(token){
      let user: any = this.decodeToken(token);
        this.course.teacher = user.id;
        this.courseService.getTeacherCourses(user.id).subscribe((response)=>{
         console.log("here response from BE",response.courses);
         this.courses= response.courses; 
           
        })
      }
      
    this.userService.getAllUsers().subscribe((response) => {
      this.students = response.users.filter((user: any) => user.role == 'student');
    })
  }

  addNote(){
    
      this.note.idCourse = this.idCourse;
      this.note.idStudent = this.idStudent;
  
      this.noteService.addNote(this.note).subscribe((response) => {
        console.log("here response from BE", response.msg);
  
  })
    }
    // console.log("here note object",this.note);
    // let token= sessionStorage.getItem("token");
    // let user: any = this.decodeToken(token);
    // this.note.teacher=user.id;
    //   this.noteService.addNote(this.note).subscribe(
    //     (response)=>{
    //       console.log("here response from BE",response.msg);
    //       this.router.navigate(["dashboardTeacher"]);    
    //     });
    
  
decodeToken(token:any) {
  return jwt_decode(token);
    }   

selectStudent(evt:any){
  console.log("here event",evt.target.value);
      this.idStudent= evt.target.value;
}

selectCourse(evt:any){
  console.log("here event",evt.target.value);
  this.idCourse= evt.target.value;
}
}
