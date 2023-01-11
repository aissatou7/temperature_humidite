import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
// nécessaire au controle de saisie du formulare de modification
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-table-archive',
  templateUrl: './table-archive.component.html',
  styleUrls: ['./table-archive.component.scss']
})
export class TableArchiveComponent implements OnInit {
  public users:any = [];
  // nécessaire au controle de saisie du formulare de modification
    signupForm: FormGroup;
  submitted=false;
  invalid = false;
  vide = false;
    id: any;
  // pagination
    p: number = 1;
  term: any;



  constructor(
    private userService: UserService,
    public formBuilder: FormBuilder
  ) {
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

  ngOnInit(): void {
        //calling function which list users
        this.loadUser();


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


// function which list users
loadUser(){
  this.userService.listUser().subscribe((data:any) =>{
     this.users = data;
    //filtrer les données
    this.users = this.users.filter((e:any)=> e.etat == false)
  });
}
// function de déarchivage
DeArchiver(id:any, etat:any){

  etat == false ? etat = true: etat = false
  const user = {
   etat : etat
  }
  this.userService.updateUser(id,user).subscribe(data =>{

    this.ngOnInit();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Déarchivage réussi !',
    });window.setTimeout(function(){location.reload()},1000)
  });
}

}
