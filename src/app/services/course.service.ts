import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl:string ="http://localhost:3000/courses";

  constructor(private httpClient: HttpClient) { }

  getAllCourses(){
        return this.httpClient.get<{courses:any}>(this.courseUrl);
      }
    
  getCourseById(id:any){
      return this.httpClient.get<{course:any}>(`${this.courseUrl}/${id}`);
      }
    
  // addCourse(obj:any){
  //       return this.httpClient.post<{msg:string}>(this.courseUrl,obj);
  //     }
  addCourse(obj: any, img: File) {
    let formData = new FormData();
    formData.append("name", obj.name);
    formData.append("description", obj.description);
    formData.append("duration", obj.duration);
    formData.append("teacher", obj.teacher);
    formData.append("img", img);
    
    return this.httpClient.post<{ msg: string }>(this.courseUrl, formData);
  }
    
  editCourse(obj:any){
      return this.httpClient.put<{isupdated:boolean}>(this.courseUrl,obj);
      }
    
  deleteCourse(id:any){
    return this.httpClient.delete<{isDeleted:boolean }>(`${this.courseUrl}/ ${id}`);
      }

 getTeacherCourses(teacher:any){
    return this.httpClient.get<{courses:any}>(`${this.courseUrl+"/teacherscourse"}/${teacher}`);
     }
     
 getStudentCourses(IdStudent:any){
   return this.httpClient.get<{courses:any}>(`${this.courseUrl+"/studentCourse"}/${IdStudent}`);
       }
}
