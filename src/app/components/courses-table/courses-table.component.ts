import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  course:any={};
  courses:any=[];
  constructor(private router:Router,
    private courseService:CourseService) { }

  ngOnInit(): void {

    this.getAll();
  }

  goToEdit(id:number){
    this.router.navigate([`editCourse/${id}`]);

  }

  delete(id:number){
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

addCourse(){
  this.router.navigate([`addCourse`]);

}
}
