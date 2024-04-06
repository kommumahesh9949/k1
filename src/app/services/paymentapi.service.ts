import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentapiService {

  public paymentAPIUrl : string = "https://localhost:44320/api/Payment/";
  constructor(private _http : HttpClient) { }

  Postpayment(data : any){
    return this._http.post<any>(`${this.paymentAPIUrl}add_Payment`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Deletepayment(id: any){
    return this._http.delete(`${this.paymentAPIUrl}delete/`+id)
    //.pipe(map((res:any)=>{
      //return res;
//}))
  }
  Updatepayment(data : any){
    return this._http.put<any>(`${this.paymentAPIUrl}update`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Getpayment(){
    return this._http.get(`${this.paymentAPIUrl}get_all_Details`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

