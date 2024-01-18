import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
noteUrl: string="http://localhost:3000/notes";

  constructor(private httpClient:HttpClient) { }

getAllNotes(){
  return this.httpClient.get<{notes:any}>(this.noteUrl);
    }
    
getNoteById(id:any){
  return this.httpClient.get<{note:any}>(`${this.noteUrl}/${id}`);
    }
    
deleteNote(id:any){
  return this.httpClient.delete<{isDeleted:boolean}>(`${this.noteUrl}/${id}`);
    }
    
editNote(note:any){
      return this.httpClient.put<{isupdated:boolean}>(this.noteUrl,note);
    }    

addNote(obj:any){
   return this.httpClient.post<{msg:string}>(this.noteUrl,obj);
}
 
getNoteDetails(user:any){
  return this.httpClient.get<{note:any, msg:string }>(`${this.noteUrl}/noteDetails/${user}`);
}
getNote(obj:any){
  return this.httpClient.post<{note:any}>(this.noteUrl+ "/noteForParent",obj);
 }
}
