import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
  teacher:any={};
  speciality: string ="";
  searchError: any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  searchTeachers(){
    const speciality = this.teacher.speciality;
      this.userService.searchTeachersBySpecialty(speciality).subscribe(
        (data) => {
          console.log("here data from BE",data.teachers);
          
          if (data.teachers && data.teachers.length > 0) {
            const teacher = data.teachers[0]; 
            this.teacher = { firstName: teacher.firstName , 
                              lastName: teacher.lastName,
                              telephone:teacher.telephone};
           
        } else {
           
            this.searchError = 'search data unavailable'; 
        }
        });
    }
  }
