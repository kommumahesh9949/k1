import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkingApiService {

  public workingAPIUrl : string = "https://localhost:44320/api/WorkingHour/";
  constructor(private _http : HttpClient) { }

  Postworking(data : any){
    return this._http.post<any>(`${this.workingAPIUrl}add_workingHour`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Deleteworking(id: any){
    return this._http.delete(`${this.workingAPIUrl}delete/`+id)
    //.pipe(map((res:any)=>{
      //return res;
//}))
  }
  Updateworking(data : any){
    return this._http.put<any>(`${this.workingAPIUrl}update`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Getworking(){
    return this._http.get(`${this.workingAPIUrl}get_all_workinghours`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

