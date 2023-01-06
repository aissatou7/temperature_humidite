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
}
