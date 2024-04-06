import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveApiService {

  public leaveAPIUrl : string = "https://localhost:44320/api/Leave/";
  constructor(private _http : HttpClient) { }

  Postleave(data : any){
    return this._http.post<any>(`${this.leaveAPIUrl}add_leave`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Deleteleave(id: any){
    return this._http.delete(`${this.leaveAPIUrl}delete_Leave/`+id)
    //.pipe(map((res:any)=>{
      //return res;
//}))
  }
  Updateleave(data : any){
    return this._http.put<any>(`${this.leaveAPIUrl}update_Leave`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Getleave(){
    return this._http.get(`${this.leaveAPIUrl}get_all_leaves`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

