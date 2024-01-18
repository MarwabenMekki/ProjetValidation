import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.css']
})
export class NotesTableComponent implements OnInit {
  notes:any=[];
  note:any={};
  course:any={};
  constructor(
    private router:Router,
    private noteService:NoteService,
    private courseService:CourseService,
    private userService:UserService) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if(token){
      let user: any = this.decodeToken(token);
      

        this.getAll();

      // } else if(user.role == 'student') {
       
        // this.note.teacher= user.id;
        // this.courseService.getCourseById(this.course.id).subscribe((response)=>{
        //  console.log("here response from BE",response.course);
        //  this.course= response.course;
       
        // })
      
  }
}
  goToEdit(id:number){
    this.router.navigate([`editNote/${id}`]);
  }

  delete(id:any){
    this.noteService.deleteNote(id).subscribe(
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
    this.noteService.getAllNotes().subscribe(
      (response)=>{
        console.log("here response from BE",response);
        this.notes= response.notes;
      }
    );
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }   
}
