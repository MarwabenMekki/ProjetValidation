import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  user: any={};
  users: any=[];
  id: any;
  errorMsg:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {

    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe(
      (data)=>{
        console.log("here data from BE",data);
        this.user=data.user;
      });
  }

  editUser(){
    console.log("here new user", this.user);
    this.userService.editUser(this.user).subscribe(
      (response)=>{
        console.log(response.isupdated);
        if (!(response.isupdated)) {
          this.router.navigate(['dashboardAdmin']);
        }else{
          this.errorMsg = "Error in editing";
        }
  
      }
    );
  }

}
