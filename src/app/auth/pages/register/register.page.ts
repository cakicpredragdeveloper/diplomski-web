import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../../_shared/store';
import { register } from '../../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:       FormGroup | undefined;
  registerFormActive: boolean = false;
  submitted:          boolean = false;
  hide:               boolean = true;
  hideRepeat:         boolean = true;

  constructor(private router:      Router,
              private store:       Store<State>,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildRegisterForm();
  }

  ionViewDidLeave() {
    if (this.registerForm) {
      this.registerForm.reset();
    }
  }

  buildRegisterForm(): void {

    this.registerForm = this.formBuilder.group({
      email:             [ '', [ Validators.required, Validators.email        ] ],
      password:          [ '', [ Validators.required, Validators.minLength(6) ] ],
      confirmedPassword: [ '', [ Validators.required                          ] ]
    }, {
      validators:[
        this.strongPassword,
        this.passwordsMatch
      ]
    });

    this.registerFormActive = true;
  }

  strongPassword(registerForm: FormGroup): ValidationErrors | null {

    const password           = registerForm.controls.password.value;
    const hasNonAlphanumeric = /\W/;
    const hasNumber          = /\d/;
    const hasUppercase       = /[A-Z]/;

    return (hasNonAlphanumeric.test(password) && hasNumber.test(password) && hasUppercase.test(password) ? null :
      {passwordNotStrong: true});
  }

  passwordsMatch(registerForm: FormGroup): ValidationErrors | null {

    const password     = registerForm.controls.password.value;
    const confirmation = registerForm.controls.confirmedPassword.value;

    return (password === confirmation ? null : { passwordsNotMatched: true });
  }

  register(): void {

    this.submitted = true;


    this.store.dispatch(register({
      user: {
        email:             this.registerForm!.controls.email.value,
        password:          this.registerForm!.controls.password.value,
        confirmedPassword: this.registerForm!.controls.confirmedPassword.value
      }
    }));
  }

  showPassword(password): void {
    password.type = password.type === 'password' ? 'text' : 'password';
  }

  moveToLoginPage(): void {
    this.router.navigate(['/login']);
  }

}
