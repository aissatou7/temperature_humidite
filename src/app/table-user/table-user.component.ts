import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
// nécessaire au controle de saisie du formulare de modification
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss'],
})
export class TableUserComponent implements OnInit {
  public users:any = [];
// nécessaire au controle de saisie du formulare de modification
  signupForm: FormGroup;
submitted=false;
invalid = false;
vide = false;
  id: any;




  constructor(
    private userService: UserService,
    public formBuilder: FormBuilder,
    private url:ActivatedRoute
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

    //for update
    this.id = this.url.snapshot.params['id'];
    console.log(this.id);
    // this.userService.singleUser()
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
     
     
  });
}

upDateUser(){
  this.userService.updateUser(this.data.value).subscribe(data =>{
  });
}

deleteUser(data: any){
  this.userService.deleteUser(data._id).subscribe(data => {
    
  });
  this.users = this.users.filter((u:any) => u!==data)
  }
}
