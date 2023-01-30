import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
import { UserService} from '../user.service';
import Swal from 'sweetalert2';
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
message:any
changeMail:any = false;


  constructor( public formBuilder: FormBuilder, public UserService: UserService ) {

    //Crontôle de saisie du formulaire
    this.signupForm = this.formBuilder.group({
      prenom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
      nom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
      email:['',[Validators.required,Validators.email]],
      role:['',Validators.required],
      password:['',[Validators.required]],
      passwordConfirm: ['', Validators.required],
      etat:[true, Validators.required],
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

  const user = {
    nom:this.signupForm.value.nom,
    prenom:this.signupForm.value.prenom,
    email:this.signupForm.value.email,
    password:this.signupForm.value.password,
    role:this.signupForm.value.role,
    etat:this.signupForm.value.etat,
    matricule : Math.random().toString(26).slice(2),

  }

    this.UserService.ajout(user).subscribe(data =>{

      this.message = data;
      if (this.message.emailExiste == true) {
        this.changeMail = true;

      } else {
          Swal.fire('inscription reussit'),
           setTimeout(()=>{ window.location.reload();}, 1000)
      }


    })

  }

  eyes (type:any) {
    if (type == "password") {
       this.inputType_pwd = 0;
       this.inputType_txt = 1;
       this.inputType = "text";
       //console.log('type password');

    } else {
      this.inputType = "password";
      this.inputType_pwd = 1;
      this.inputType_txt = 0;
      //console.log('type text');
    }
  }
  eyes_confirm (type:any) {

    if (type == "password") {
       this.inputType_pwd_c = 0;
       this.inputType_txt_c = 1;
       this.inputType_c = "text";
       //console.log('type password');

    } else {
      this.inputType_c = "password";
      this.inputType_pwd_c = 1;
      this.inputType_txt_c = 0;
      //console.log('type text');
    }
  }

}

