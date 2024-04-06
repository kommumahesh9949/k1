import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkingApiService } from 'src/app/services/workingapi.service';
import { WorkingModel } from './workingmodel';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.scss']
})
export class WorkingComponent implements OnInit {

  formValue !: FormGroup;
  workingData !: any;
  employeeObj : WorkingModel = new WorkingModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  
  constructor(private workingapi: WorkingApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
     
      companyMonthlyHours: [''],
      employeeMonthlyHours: [''],
      
    })
    this.getworkingDetails();
   // this.role = localStorage.getItem('userType')!
  }
  clickAddworking(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postworkingDetails() {
    
    this.workingapi.Postworking(this.formValue.value)
      .subscribe(res => {
        this.employeeObj  =res;
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getworkingDetails();
      })
  }
  getworkingDetails() {
    this.workingapi.Getworking()
    .subscribe(res=>{
      this.workingData = res.employeeDetails;
      console.log(res);
      
    })
  }
  editworkingDetail(){
     
    /* this.employeeObj.EmployeeID = this.formValue.value.EmployeeID;
     this.employeeObj.EmployeeName = this.formValue.value.EmployeeName;
     this.employeeObj.PhoneNumber = this.formValue.value.PhoneNumber;
     this.employeeObj.MailId = this.formValue.value.MailId;
     this.employeeObj.Address = this.formValue.value.Address;*/
    this.workingapi.Updateworking(this.formValue.value)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getworkingDetails();
    })
  }
  onEdit(row : any){
    //this.employeeObj.SerialNo = row.SerialNo;
    this.formValue.controls['companyMonthlyHours'].setValue(row.companyMonthlyHours);
    this.formValue.controls['employeeMonthlyHours'].setValue(row.employeeMonthlyHours);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deleteworkingDetail(row : any){
   let clickedYes = confirm("Are you sure want to delete");
   if(clickedYes){
    this.workingapi.Deleteworking(row)
    .subscribe(res=>{
      this.getworkingDetails();
      alert("Deleted Successfully");
      this.getworkingDetails();
    })
   }
    
  }
}
