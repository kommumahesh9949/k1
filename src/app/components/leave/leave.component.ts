import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveApiService } from 'src/app/services/leaveapi.service';
import { EmployeeModel } from '../dashboard/dashboard';
import { LeaveModel } from './leavemodel';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  formValue !: FormGroup;
  employeeData !: any;
  employeeObj : LeaveModel = new LeaveModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  
  constructor(private leaveapi: LeaveApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      //SerialNo:['',{disabled:true}],
      leaveType: [''],
      reason: [''],
      when: ['']
     
    })
    this.getleaveDetails();
   // this.role = localStorage.getItem('userType')!
  }
  clickleave(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postleaveDetails() {
    
    this.leaveapi.Postleave(this.formValue.value)
      .subscribe(res => {
        this.employeeObj  =res;
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getleaveDetails();
      })
  }
  getleaveDetails() {
    this.leaveapi.Getleave()
    .subscribe(res=>{
      this.employeeData = res.employeeDetails;
      console.log(res);
      
    })
  }
  editleaveDetail(){
     
    /* this.employeeObj.EmployeeID = this.formValue.value.EmployeeID;
     this.employeeObj.EmployeeName = this.formValue.value.EmployeeName;
     this.employeeObj.PhoneNumber = this.formValue.value.PhoneNumber;
     this.employeeObj.MailId = this.formValue.value.MailId;
     this.employeeObj.Address = this.formValue.value.Address;*/
    this.leaveapi.Updateleave(this.formValue.value)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getleaveDetails();
    })
  }
  onEdit(row : any){
    //this.employeeObj.SerialNo = row.SerialNo;
    this.formValue.controls['leaveType'].setValue(row. leaveType);
    this.formValue.controls['reason'].setValue(row.reason);
    this.formValue.controls['when'].setValue(row.when);
   
    this.showUpdate = true;
    this.showAdd = false;
  }

  deleteleaveDetail(row : any){
   let clickedYes = confirm("Are you sure want to delete");
   if(clickedYes){
    this.leaveapi.Deleteleave(row)
    .subscribe(res=>{
      this.getleaveDetails();
      alert("Deleted Successfully");
      this.getleaveDetails();
    })
   }
    
  }
}
