import { Injectable } from '@angular/core';
import {HttpClient}from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseurl:string="https://localhost:44320/api/User/"

  constructor(private http:HttpClient) { }
  signUp(userObj:any)
  {
    return this.http.post(this.baseurl+'register',userObj);
  }
   login(loginObj:any)
  {
    return this.http.post<any>(this.baseurl+'login',loginObj);
  }
}
