import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-for-parent',
  templateUrl: './search-for-parent.component.html',
  styleUrls: ['./search-for-parent.component.css']
})
export class SearchForParentComponent implements OnInit {
  searchResultForm!:FormGroup;
  errorMsg:any;
  childPhone:any;
  user:any={};
  courses:any=[];
  obj:any={};
  note:any;
  constructor(private userService:UserService,
    private noteService:NoteService) { }

  ngOnInit(): void {
  }

  searchResults(){
    this.childPhone = this.user.childPhone;
  
        this.userService.searchChildByTel(this.user).subscribe((response) => {
          console.log("here response from BE", response.student);
            if (response.student) {
              this.courses = response.student.course;
              if (this.courses.length== 0) {
                
              } else {
                for (let j = 0; j < this.courses.length; j++) {
                  this.obj.idCourse= this.courses[j]._id;
                    this.obj.idUser = response.student._id;
                  
                  this.noteService.getNote(this.obj).subscribe((response)=>{
                    console.log("here response from BE",response.note);
                    this.note= response.note;
                  })
                    }   
                   }              
            } else {
              this.errorMsg = 'Student not found';
            } 
           });
   
  }
}
