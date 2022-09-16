import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { switchMap } from 'rxjs';

export function passwordsMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password != confirmPassword){
      return{
        passwordsDontMatch: true
      }
    }

    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {validators: passwordsMatchValidator() });

  constructor(private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder,
    ) { }

  ngOnInit(): void {
  }

  get name(){
    return this.signupForm.get('name');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }

  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }


  submit() {
    const { name, email, password} = this.signupForm.value;
    if (!this.signupForm.valid || !name || !password || !email){
    return;
    }

    this.authService.signUp( name, email, password).pipe(
      this.toast.observe({
        success: 'Whoo! Youre all set!',
        loading: 'Creating Profile...',
        error: ({ message })=> `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }
}
