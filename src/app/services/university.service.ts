import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  universityUrl: string ="http://localhost:3000/university";

  constructor(private httpClient:HttpClient) { }

  searchUniversity(country:any){

    return this.httpClient.post<{result:any}>(this.universityUrl,country);

  }
}
