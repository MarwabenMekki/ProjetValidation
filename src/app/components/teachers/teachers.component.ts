import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers:any=[];
  user:any={}
  constructor(private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(
      (data) => {
        // Check if the role is "teacher"
        if (data.users && data.users.length > 0) {
          this.teachers = data.users.filter((user: { role: string, otherProperty: any }) => user.role === "teacher");
          console.log("Teachers data from BE", this.teachers);
          
        }
      },
      (error) => {
        console.error("Error fetching teachers:", error);
      }
    );
  }
  }


