import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
