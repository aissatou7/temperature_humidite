import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

profileForm!:FormGroup
submitted=false;
invalid = false;
prenom = localStorage.getItem('prenom')
nom = localStorage.getItem('nom')
email = localStorage.getItem('email')

  constructor(  public formBuilder: FormBuilder ) {

    this.profileForm = this.formBuilder.group({
      prenom:[this.prenom,[Validators.required , UsernameValidator.cannotContainSpace]],
      nom:[this.nom,[Validators.required , UsernameValidator.cannotContainSpace]],
      email:[this.email,[Validators.required,Validators.email]],

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
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Modification réussi !',
    });window.setTimeout(function(){location.reload()},1000)

  }

}
