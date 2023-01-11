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
      prenom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
      nom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
      email:['',[Validators.required,Validators.email]],

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
