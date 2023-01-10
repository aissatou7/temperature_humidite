import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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