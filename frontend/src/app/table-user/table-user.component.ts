import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
// nécessaire au controle de saisie du formulare de modification
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

//pagination

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss'],
})
export class TableUserComponent implements OnInit {
  public users:any = [];
// nécessaire au controle de saisie du formulare de modification
  
submitted=false;
invalid = false;
vide = false;
  id: any;
// pagination
  p: number = 1;
term: any;
updateForm: FormGroup;




  constructor(
    private userService: UserService,
    public formBuilder: FormBuilder,
    private url:ActivatedRoute
  ) {
      //Crontôle de saisie du formulaire
      this.updateForm = this.formBuilder.group({
        prenom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
        nom:['',[Validators.required , UsernameValidator.cannotContainSpace]],
        email:['',[Validators.required,Validators.email]],
       
    }
  )
   }

  ngOnInit(): void {
    //calling function which list users
    this.loadUser();

    //for update
    this.id = this.url.snapshot.params['id'];
    console.log(this.id);
    // this.userService.singleUser()
  }
  passeIdentique(){

    if ( (this.updateForm.value.password != this.updateForm.value.passwordConfirm ) || (this.updateForm.value.passwordConfirm == '')) {
      this.invalid = true;
    }
    else{
      this.invalid = false;
    }

  }
  registerUser(){
    this.submitted = true;
    this.passeIdentique();
    if(this.updateForm.invalid){
      return;
    }
    this.submitted=false;

  }


// function which list users
loadUser(){
  this.userService.listUser().subscribe((data:any) =>{
     this.users = data;
     
     
  });
}
//switch

changeRole=(id:any,role:any)=> {
  role == "Admin" ? role ="user": role = "Admin"
  const user ={
   role : role
  }
  this.userService.updateUser(id,user).subscribe(
    data=>{
      this.ngOnInit();
    });
 }

 getUserData(id:any,prenom:any,nom:any,email:any){

  this.updateForm = this.formBuilder.group({
      id:[id],
      prenom: [prenom, [Validators.required,UsernameValidator.cannotContainSpace]],
      nom: [nom, [Validators.required, UsernameValidator.cannotContainSpace]],
      email: [email, [Validators.required, Validators.email]],
    });
  console.log(id)
}

 onUpdate(){
  if (this.updateForm.value.prenom.lenght) {
    
  } else {
    const id =  this.updateForm.value.id;
    const data ={
     prenom: this.updateForm.value.prenom,
     nom : this.updateForm.value.nom,
     email: this.updateForm.value.email
    }
    this.submitted = true;
    if(this.updateForm.invalid){
      return;
    }
   
      this.userService.updateUser(id, data).subscribe(
        data=>{
          this.ngOnInit();
          Swal.fire('Modification',
                    'Réussie !',
                    'success');
          //window.location.reload();
          window.setTimeout(function(){location.reload()},1500)
        });
  }

}
 



deleteUser(data: any){
  this.userService.deleteUser(data._id).subscribe(data => {
    
  });
  this.users = this.users.filter((u:any) => u!==data)
  }
}
