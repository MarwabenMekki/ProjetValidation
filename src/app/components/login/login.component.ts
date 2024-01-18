import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user:any={};
  loginForm!:FormGroup;
  errorMsg:string="";

  constructor(
    private router:Router,
    private userService:UserService ) { }

  ngOnInit(): void {
  }
  login(){
    console.log("here login",this.user);
    this.userService.login(this.user).subscribe(
      (data)=>{
        console.log("here data after login",data.msg,data.token );       
        if (data.token) {
          // save token into session storage
          sessionStorage.setItem("token", data.token);
          let user:any = this.decodeToken(data.token);
          console.log("here user",user);
          console.log("here token",data.token);

          if (user.role=='teacher') {

            if (user.status=='confirmed') {
              this.router.navigate(['dashboardTeacher']);
            }  
             else {
                this.errorMsg="validation error";
              }
            }
          else if (user.role=='admin') {
            this.router.navigate(['dashboardAdmin']);

          } else if (user.role=='student') {
            this.router.navigate(['dashboardStudent']);

          } else {
            this.router.navigate(['']);
          }
          }        
        
        else {
          this.errorMsg="please check email/pwd";
        
        }});
      };

decodeToken(token: string) {
  return jwt_decode(token);
}   
  
}

      
