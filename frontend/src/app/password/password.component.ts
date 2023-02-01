import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../username.validator';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

profileForm!:FormGroup

submitted=false;
invalid = false;
monidentity = localStorage.getItem('prenom') + ''+ localStorage.getItem('nom')
 monmail =   localStorage.getItem('email')
 password = localStorage.getItem('password')
id = localStorage.getItem('id')
  pass: string = '';
  constructor(
    private userService: UserService,
     public formBuilder: FormBuilder ) {

    this.profileForm = this.formBuilder.group({

      actuelPass:['',[Validators.required ]],
      newPass:['',[Validators.required]],
     newPasswordconfirm:['', [Validators.required]],
  }
  )
  }

  ngOnInit(): void {
  }

  passeIdentique(){
    if ( (this.profileForm.value.newPass != this.profileForm.value.newPasswordconfirm ) || (this.profileForm.value.newPasswordconfirm == '')) {
      this.invalid = true;
    }
    else{
      this.invalid = false;
    }

  }

  onSubmite(){

    this.submitted = true;
    this.passeIdentique();
    if(this.profileForm.invalid){
      return;
    }

    this.userService.updatePassword(localStorage.getItem('id'), this.profileForm.value).subscribe((data)=>{
      // console.log(data);

     /*  alert("mot_de_passe modifier avec succes"),
         window.location.reload(); */
         Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Modification réussi !',
        });window.setTimeout(function(){location.reload()},1000)




        //  this.router.navigateByUrl('/pageAdmin');

      // this.ngZone.run(() => this.router.navigateByUrl('/pageAdmin'));
     }
     ,(err)=>{
      this.pass= " mot_de_passe incorrect"
      setTimeout(() => {
        this.pass = ""
      }, 2000);
     })


    /* this.submitted=false;
    const donnees= {
      email: this.monmail,
     password: this.password
    } */
   /*  console.log(bcrypt.compareSync(this.profileForm.value.currentPassword, this.password)) */
/* console.log(this.profileForm.value.currentPassword);

    const auth =  bcrypt.compare(this.password , this.profileForm.value.currentPassword)
    if(auth ){
       console.log("valid");
    }
    else{
       console.log("invalid")
    }
     */
 /*    this.userService.login(donnees).subscribe(
      (data:any) => {
        console.log(data);

  }) */
  }
}
