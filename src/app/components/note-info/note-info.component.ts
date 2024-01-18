import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-info',
  templateUrl: './note-info.component.html',
  styleUrls: ['./note-info.component.css']
})
export class NoteInfoComponent implements OnInit {
  note:any={};
  notes:any=[];
  constructor(private noteService:NoteService) { }

  ngOnInit(): void {

    let token = sessionStorage.getItem("token");
    let user: any = this.decodeToken(token);
    user = user.id;
    this.noteService.getNoteDetails(user).subscribe((data) => {
      
      if ( data.note) {
        this.note = data.note;
      } else {
        console.log("data.msg",data.msg);
        
      }
    })
  }
decodeToken(token:any) {
  return jwt_decode(token);
}  
}
