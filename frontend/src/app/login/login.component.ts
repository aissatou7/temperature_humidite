import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
registerForm: FormGroup;
errMsg: any;
submitted=false;
constructor(
public formBuilder: FormBuilder,
) {
this.registerForm = this.formBuilder.group({
email:['',[Validators.required,Validators.email]],
password:['',[Validators.required,Validators.minLength(5)]]
});
}

ngOnInit() {

}

ngOnDestroy() {
}
loginUser(){
this.submitted = true;

if(this.registerForm.invalid){
return;
}
}
}
=======
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  errMsg: any;
  submitted = false;
 
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {}
  ngOnDestroy() {}

  loginUser(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
// appellle service login
      this.userService.login(this.registerForm.value).subscribe(
        (data:any) => {
          let tmp = data;
            localStorage.setItem('token', tmp.data.token);
            localStorage.setItem('id', tmp.data.userId);
            localStorage.setItem('prenom', tmp.data.prenom);
            localStorage.setItem('nom', tmp.data.nom);
            localStorage.setItem('role', tmp.data.role);
            localStorage.setItem('matricule', tmp.data.matricule);
            console.log(localStorage.getItem('prenom'))
            if (tmp.data.role.includes( 'Admin')) {
              this.router.navigate(['/systeme'])
            }
            else{
              this.router.navigate(['/tableArchive'])
            }
        });
  }
}
>>>>>>> 3ca8740a (ok)
