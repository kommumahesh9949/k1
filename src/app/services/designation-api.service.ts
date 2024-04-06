import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignationApiService {

  public designationAPIUrl : string = "https://localhost:44320/api/Designation/";
  constructor(private _http : HttpClient) { }

  Postdesignation(data : any){
    return this._http.post<any>(`${this.designationAPIUrl}add_designation`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Deletedesignation(id: any){
    return this._http.delete(`${this.designationAPIUrl}delete_designation/`+id)
    //.pipe(map((res:any)=>{
      //return res;
//}))
  }
  Updatedesignation(data : any){
    return this._http.put<any>(`${this.designationAPIUrl}update_Designation`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Getdesignation(){
    return this._http.get(`${this.designationAPIUrl}get_all_Designations`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

