import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsernameValidator } from '../username.validator';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
signupForm: FormGroup;
submitted=false;
invalid = false;
vide = false;
inputType:any = "password";
inputType_txt = 0;
inputType_pwd = 1;
inputType_c:any = "password";
inputType_txt_c = 0;
inputType_pwd_c = 1;


  constructor( public formBuilder: FormBuilder ) {

    //Crontôle de saisie du formulaire
    this.signupForm = this.formBuilder.group({
      prenom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
      nom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
      email:['',[Validators.required,Validators.email]],
      role:['',Validators.required],
      password:['',[Validators.required]],
      passwordConfirm: ['', Validators.required],
      etat:[0, Validators.required],
      matricule: ['']
  }
)
  }

  ngOnInit() {

  }
  passeIdentique(){
    if ( (this.signupForm.value.password != this.signupForm.value.passwordConfirm ) || (this.signupForm.value.passwordConfirm == '')) {
      this.invalid = true;
    }
    else{
      this.invalid = false;
    }

  }
  registerUser(){
    this.submitted = true;
    this.passeIdentique();
    if(this.signupForm.invalid){
      return;
    }
    this.submitted=false;

  }

  eyes (type:any) {
    if (type == "password") {
       this.inputType_pwd = 0;
       this.inputType_txt = 1;
       this.inputType = "text";
       console.log('type password');

    } else {
      this.inputType = "password";
      this.inputType_pwd = 1;
      this.inputType_txt = 0;
      console.log('type text');
    }
  }
  eyes_confirm (type:any) {

    if (type == "password") {
       this.inputType_pwd_c = 0;
       this.inputType_txt_c = 1;
       this.inputType_c = "text";
       console.log('type password');

    } else {
      this.inputType_c = "password";
      this.inputType_pwd_c = 1;
      this.inputType_txt_c = 0;
      console.log('type text');
    }
  }
  
}
