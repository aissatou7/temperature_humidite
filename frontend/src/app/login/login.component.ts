import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showcode = false;
  code;
  message;
 
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
          console.log(data);
          
        
          let tmp = data;
          this.code = data.code;
          if(this.code == "noEmail"){
            this.showcode = true;
            htmlStr: this.message = "L'email saisie n'existe pas !";
          }else if (this.code == "compteNoActive"){
            this.showcode = true;
            htmlStr: this.message = "Ce compte a été déactivé !";
          }else if (this.code == "noPassword"){
            this.showcode = true;
            htmlStr: this.message = "Mots de passe incorrect !";
          }else if (this.code == "erreur"){
            this.showcode = true;
            htmlStr: this.message = "Une erreur c'est produite, !";
          } else{          
          localStorage.setItem('token', tmp.data.token);
          localStorage.setItem('id', tmp.data.userId);
          localStorage.setItem('prenom', tmp.data.prenom);
          localStorage.setItem('nom', tmp.data.nom);
          localStorage.setItem('role', tmp.data.role);
          localStorage.setItem('matricule', tmp.data.matricule);
          if (tmp.data.role == 'Administrateur') {
              this.router.navigate(['/systeme'])
            }
            else{
              this.router.navigate(['/tableArchive'])
            }
        }
      });
        }
}
