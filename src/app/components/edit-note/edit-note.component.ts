import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  editNoteForm!: FormGroup;
  note: any={};
  id: any;
  errorMsg:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private noteService:NoteService,
    private router:Router) { }

  ngOnInit(): void {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.noteService.getNoteById(this.id).subscribe(
      (data)=>{
        console.log("here data from BE",data);
        this.note=data.note;
      });
  }

  editNote(){
    console.log("here new note", this.note);
    this.noteService.editNote(this.note).subscribe(
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
