import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public employeeAPIUrl : string = "https://localhost:44320/api/Employee/";
  constructor(private _http : HttpClient) { }

  PostEmployee(data : any){
    return this._http.post<any>(`${this.employeeAPIUrl}add_employee`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteEmployee(id: any){
    return this._http.delete(`${this.employeeAPIUrl}delete_employee/`+id)
    //.pipe(map((res:any)=>{
      //return res;
//}))
  }
  UpdateEmployee(data : any){
    return this._http.put<any>(`${this.employeeAPIUrl}update_employee`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetEmployees(){
    return this._http.get(`${this.employeeAPIUrl}get_all_employees`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
