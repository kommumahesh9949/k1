import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from './loginmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type:string="password";
  istext:boolean=false;
  eyeIcon:string="fa-eye-slash";
  public loginForm!:FormGroup;
  public loginObj = new UserModel();
  

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group(
      {
        Email:['',Validators.required],
        Password:['',Validators.required]
      }
    );
  }
  hideShowPass(){
    this.istext=!this.istext;
    this.istext ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.istext?this.type="text":this.type="password";

  }
  onlogin() {
    this.auth.login(this.loginForm.value)
    .subscribe(res=>{
      if(res!=null)
      {
    alert(res.message);
    this.loginForm.reset();
    this.router.navigate(['dashboard']);
  console.log(this.loginForm.value);
      }
    }
    ,err=>{
      alert("soomething went wrong")
})
  
  
    this.validateAllFormFileds(this.loginForm.value)
  
  //throw the error using toaster and w
  
}

    
  
  
    
   /* this.auth.s.Email = this.loginForm.value.Email;
    this.auth.loginObj.Password = this.loginForm.value.Password;
    this.auth.login(this.loginObj)
    .subscribe(res=>{
      alert(res.message);
      this.router.navigate(['dashboard']);
      
    },err=>{
      alert("soomething went wrong")
    })
     }*/
  
    
    
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



