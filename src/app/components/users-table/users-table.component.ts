import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  user:any={};
  users:any=[];
  constructor(
    private router:Router,
    private userService:UserService) { }

  ngOnInit(): void {
    this.getAll();
  }
  
  goToEdit(id:number){

    this.router.navigate([`editUser/${id}`]);

  }
  delete(id:any){
    // send request to delete user by id
    this.userService.deleteUser(id).subscribe(
      (data)=>{
        console.log("here data after delete",data.isDeleted);
      // if deleted is OK, send request to get all users
      if(data.isDeleted){
        this.getAll();
      }
      }
      
    );
  }

  getAll(){
    this.userService.getAllUsers().subscribe(
      (response)=>{
        console.log("here response from BE",response);
        this.users= response.users;
      }
    );
  }

  validate(id:any){
    this.userService.validate(id).subscribe((response)=>{
      console.log("here response from BE",response);
      this.user.status=response.isUpdated;
      this.router.navigate(["dasboardAdmin"]);
    })
  }
}

