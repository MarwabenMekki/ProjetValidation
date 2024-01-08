import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

userUrl:string ="http://localhost:3000/users";

  constructor(private httpClient: HttpClient) { }

  signup(user:any, photo: File, file: File){

    let formData= new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("telephone", user.telephone);
    formData.append("adress", user.adress);
    formData.append("speciality", user.speciality);
    formData.append("childPhone", user.childPhone);
    formData.append("password", user.password);
    formData.append("role", user.role);
    formData.append("file", file);
    formData.append("img", photo);
    formData.append("status",user.status);  

    return this.httpClient.post<{msg:string}>(this.userUrl +"/signup", formData);
  }

login(user:any){
    return this.httpClient.post<{msg:string, token:string}>(this.userUrl +"/login",user);
  }

getAllUsers(){
return this.httpClient.get<{users:any}>(this.userUrl)
}

getUserById(id:any){
  return this.httpClient.get<{user:any}>(`${this.userUrl}/${id}`);
}

deleteUser(id:any){
return this.httpClient.delete<{isDeleted:boolean}>(`${this.userUrl}/${id}`)
}

editUser(user:any){
  return this.httpClient.put<{isupdated:boolean}>(this.userUrl,user);
}

affect(obj:any){
  return this.httpClient.post<{msg:string}>(this.userUrl +"/affectation",obj);
}

}
