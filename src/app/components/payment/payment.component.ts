import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentapiService } from 'src/app/services/paymentapi.service';
import { PaymentModel } from './paymentmodel';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  formValue !: FormGroup;
  paymentData !: any;
  employeeObj : PaymentModel = new PaymentModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  
  constructor(private paymentapi: PaymentapiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
     
      accountType: [''],
      accountNumber: [''],
      ifscCode:[''],
    })
    this.getpaymentDetails();
   // this.role = localStorage.getItem('userType')!
  }
  clickAddpayment(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postpaymentDetails() {
    
    this.paymentapi.Postpayment(this.formValue.value)
      .subscribe(res => {
        this.employeeObj  =res;
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getpaymentDetails();
      })
  }
  getpaymentDetails() {
    this.paymentapi.Getpayment()
    .subscribe(res=>{
      this.paymentData= res.employeeDetails;
      console.log(res);
      
    })
  }
  editpaymentDetail(){
     
    /* this.employeeObj.EmployeeID = this.formValue.value.EmployeeID;
     this.employeeObj.EmployeeName = this.formValue.value.EmployeeName;
     this.employeeObj.PhoneNumber = this.formValue.value.PhoneNumber;
     this.employeeObj.MailId = this.formValue.value.MailId;
     this.employeeObj.Address = this.formValue.value.Address;*/
    this.paymentapi.Updatepayment(this.formValue.value)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getpaymentDetails();
    })
  }
  onEdit(row :any){
    //this.employeeObj.SerialNo = row.SerialNo;
    this.formValue.controls['accountType'].setValue(row.accountType);
    this.formValue.controls['accountNumber'].setValue(row.accountNumber);
    this.formValue.controls['ifscCode'].setValue(row.ifscCode);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deletepaymentDetail(row : any){
   let clickedYes = confirm("Are you sure want to delete");
   if(clickedYes){
    this.paymentapi.Deletepayment(row)
    .subscribe(res=>{
      this.getpaymentDetails();
      alert("Deleted Successfully");
      this.getpaymentDetails();
    })
   }
    
  }
}