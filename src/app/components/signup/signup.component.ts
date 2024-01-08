import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup;
  test = true;
  path: string = "";
  imagePreview: any;
  filePreview: any;
  errorMsg:string="";
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private userService: UserService) { }

  ngOnInit(): void {

    this.path = this.router.url;
    console.log("here path", this.path);

    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(5)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      telephone:["",[Validators.required,Validators.minLength(8), Validators.maxLength(8)]],
      speciality:["",[Validators.required]],
      childPhone:["",[Validators.required,Validators.minLength(8), Validators.maxLength(8)]],
      adress:["",[Validators.required]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      confirmPassword: ["", [Validators.required]],
      file:[""],
      img: [""],
    });
    this.addControlsBasedOnPath();
  }

  private addControlsBasedOnPath(): void {

    if (this.path === "/student") {
      this.signupForm.addControl('img', new FormControl(""));
    } else if (this.path === "/parent") {
      this.signupForm.addControl('childPhone', new FormControl("", [Validators.required, Validators.minLength(8),Validators.maxLength(8)]));
 
    } else if (this.path === "/teacher") {
      this.signupForm.addControl('speciality', new FormControl("", [Validators.required]));
      this.signupForm.addControl('file', new FormControl(""));
   }  
  }

  matchPwd() {
    let pwd = this.signupForm.value.password;
    let confirmPwd = this.signupForm.value.confirmPassword;

    if (confirmPwd != "") {
      this.test = false;
    }

    if (pwd == confirmPwd) {
      this.test = true;
    } else {
      this.test = false;
    }
  }

  onImageSelected(event: Event) {

    const fileInput = (event.target as HTMLInputElement);

    const file = (fileInput.files as FileList)[0];

    this.signupForm.patchValue({ img: file });

    this.signupForm.updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result as string

    };

    reader.readAsDataURL(file);

  }

signup() {

    console.log("here signup", this.signupForm.value);
    if (this.path == "/subscription") {
      this.signupForm.value.role = "student";

    } else if(this.path == "/signupAdmin") {
      this.signupForm.value.role = "admin";

    }else if (this.path == "/signupTeacher") {
      this.signupForm.value.role = "teacher";
      this.signupForm.value.status= "en attente";

    }else{
      this.signupForm.value.role = "parent";

    }

    this.userService.signup(this.signupForm.value, this.signupForm.value.img, this.signupForm.value.file).subscribe(
      (response) => {
        console.log("here response after signup", response.msg);
        this.errorMsg=response.msg;
      }
    );
  }

  onFileSelected(event: Event) {

    const fileInput = (event.target as HTMLInputElement);

    const file = (fileInput.files as FileList)[0];

    this.signupForm.patchValue({ file: file });

    this.signupForm.updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = () => {

      this.filePreview = reader.result as string

    };

    reader.readAsDataURL(file);

  }
}
