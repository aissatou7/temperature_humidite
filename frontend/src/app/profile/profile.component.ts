import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
import Swal from 'sweetalert2';
import { UserService } from "../user.service";
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
role = localStorage.getItem('rolee')
id = localStorage.getItem('id')
users:any
mailExiste:any = ''

  constructor(  public formBuilder: FormBuilder,
    private userService: UserService, ) {

    this.profileForm = this.formBuilder.group({
      prenom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
      nom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
      email:['',[Validators.required,Validators.email]],

  }
  )
  }

  ngOnInit(): void {
   console.log( this.role);

  }

  profileUser(){
    this.submitted = true;

    if(this.profileForm.invalid){
      return;
    }
    this.submitted=false;
    //d'abord on vérifie si le mail à changer
   if (this.email != this.profileForm.value.email) {
      this.userService.listUser().subscribe((data:any) =>{
      this.users = data;
      //filtrer les données
      this.users = this.users.filter((e:any)=> e.email == this.profileForm.value.email)

          if (this.users.length >= 1) {
            this.mailExiste = 'le mail existe déja'
          }
          else{
            const data = {
              nom:this.profileForm.value.nom,
              prenom:this.profileForm.value.prenom,
              email:this.profileForm.value.email,
            }
            this.userService.updateUser(this.id, data).subscribe(
              data=>{
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Modification réussi !',
                });window.setTimeout(function(){location.reload()},1000)
              })


          }

    })


   }


  }

}
