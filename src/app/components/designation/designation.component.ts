import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DesignationApiService } from 'src/app/services/designation-api.service';
import { DesignationModel } from './designation-model';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  formValue !: FormGroup;
  designationData !: any;
  employeeObj : DesignationModel = new DesignationModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
  
  constructor(private designationapi: DesignationApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
     
      designationName: [''],
      roleName: [''],
      departmentName:[''],
    })
    this.getdesignationDetails();
   // this.role = localStorage.getItem('userType')!
  }
  clickAddesignation(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postdesignationDetails() {
    
    this.designationapi.Postdesignation(this.formValue.value)
      .subscribe(res => {
        this.employeeObj  =res;
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getdesignationDetails();
      })
  }
  getdesignationDetails() {
    this.designationapi.Getdesignation()
    .subscribe(res=>{
      this.designationData = res.employeeDetails;
      console.log(res);
      
    })
  }
  editDesignationDetail(){
     
    /* this.employeeObj.EmployeeID = this.formValue.value.EmployeeID;
     this.employeeObj.EmployeeName = this.formValue.value.EmployeeName;
     this.employeeObj.PhoneNumber = this.formValue.value.PhoneNumber;
     this.employeeObj.MailId = this.formValue.value.MailId;
     this.employeeObj.Address = this.formValue.value.Address;*/
    this.designationapi.Updatedesignation(this.formValue.value)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getdesignationDetails();
    })
  }
  onEdit(row :any){
    //this.employeeObj.SerialNo = row.SerialNo;
    this.formValue.controls['designationName'].setValue(row.designationName);
    this.formValue.controls['roleName'].setValue(row.roleName);
    this.formValue.controls['departmentName'].setValue(row.departmentName);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deletedesignationDetail(row : any){
   let clickedYes = confirm("Are you sure want to delete");
   if(clickedYes){
    this.designationapi.Deletedesignation(row)
    .subscribe(res=>{
      this.getdesignationDetails();
      alert("Deleted Successfully");
      this.getdesignationDetails();
    })
   }
    
  }
}
