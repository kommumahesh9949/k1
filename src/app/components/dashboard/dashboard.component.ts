import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmployeeModel } from './dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeData !: any;
  employeeObj : EmployeeModel = new EmployeeModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      //SerialNo:['',{disabled:true}],
      employeeID: [''],
      employeeName: [''],
      phoneNumber: [''],
      mailId: [''],
      address: ['']
    })
    this.getEmployeeDetails();
   // this.role = localStorage.getItem('userType')!
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    
    this.api.PostEmployee(this.formValue.value)
      .subscribe(res => {
        this.employeeObj  =res;
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
      })
  }
  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res.employeeDetails;
      console.log(res);
      ()=>alert('emlpoyee Added');
      
    })
  }
  editEmployeeDetail(){
     
    /* this.employeeObj.EmployeeID = this.formValue.value.EmployeeID;
     this.employeeObj.EmployeeName = this.formValue.value.EmployeeName;
     this.employeeObj.PhoneNumber = this.formValue.value.PhoneNumber;
     this.employeeObj.MailId = this.formValue.value.MailId;
     this.employeeObj.Address = this.formValue.value.Address;*/
    this.api.UpdateEmployee(this.formValue.value)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
    })
  }
  onEdit(row : any){
    //this.employeeObj.SerialNo = row.SerialNo;
    this.formValue.controls['employeeID'].setValue(row.employeeID);
    this.formValue.controls['employeeName'].setValue(row.employeeName);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['mailId'].setValue(row.mailId);
    this.formValue.controls['address'].setValue(row.address);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deleteEmployeeDetail(row : any){
   let clickedYes = confirm("Are you sure want to delete");
   if(clickedYes){
    this.api.DeleteEmployee(row)
    .subscribe(res=>{
      this.getEmployeeDetails();
      alert("Deleted Successfully");
      this.getEmployeeDetails();
    })
   }
    
  }
}