import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type:string="password";
  istext:boolean=false;
  eyeIcon:string="fa-eye-slash";
  SignupForm!:FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.SignupForm=this.fb.group(
      {
        Email:['',Validators.required],
       ConfirmPassword:['',Validators.required],
        Password:['',Validators.required]
      });
  }
  hideShowPass(){
    this.istext=!this.istext;
    this.istext ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.istext?this.type="text":this.type="password";

  }
  onSignup(){

    if(this.SignupForm.valid){
      this.auth.signUp(this.SignupForm.value)
      .subscribe(res=>{
        if(res!=null)
        {
      alert("Sign in Succsfully");
      this.SignupForm.reset();
      this.router.navigate(['login'])
    
    console.log(this.SignupForm.value)
        }
      
       }) // Send the obj to database
    
    }else{
      alert("Error");
    
    
      this.validateAllFormFileds(this.SignupForm.value)
    
    //throw the error using toaster and w
    }
  }
    
    private validateAllFormFileds (formGroup: FormGroup)
    {
       Object.keys(formGroup.controls).forEach(field=>{

       const control = formGroup.get(field);
       if(control instanceof FormControl)
       { 
        control.markAsDirty ({onlySelf:true});
       }
       else if(control instanceof FormGroup)
       {
        this.validateAllFormFileds(control)
       }
      })
    }

}