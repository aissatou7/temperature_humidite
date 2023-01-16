import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

profileForm!:FormGroup

submitted=false;
invalid = false;
 

  constructor(  public formBuilder: FormBuilder ) {

    this.profileForm = this.formBuilder.group({
     
      password1:['',[Validators.required ]],
      password:['12345678',[Validators.required]],

  }
  )
  }

  ngOnInit(): void {
  }

  profileUser(){
    this.submitted = true;
    if(this.profileForm.invalid){
      return;
    }
    this.submitted=false;
    

  }

}
