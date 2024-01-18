import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  searchForm!:FormGroup;
  response:any;
  result:any;
  constructor(
    private formBuilder:FormBuilder,
    private universityService: UniversityService) { }

  ngOnInit(): void {
    this.searchForm= this.formBuilder.group({
      country:["",Validators.required],
    })
  }

  search(){
    const searchInput = {
      country: this.searchForm.get('country')?.value
    };

    this.universityService.searchUniversity(searchInput).subscribe(
      (response)=>{
    
          console.log("here university data",response.result);
          this.result = response.result;
      });
    }
}
