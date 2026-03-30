import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import passwordMatchValidator from '../../../validators/password-match.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true
})
export class Register {
  registerForm!: FormGroup;
  submitted = false;
  registeredUser: any = null;

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  mobilePattern = /^(?:\+20|0)?1[0125]\d{8}$/;

  constructor() {
    this.initializeForm();
  }

  get fullNameControl() {
    return this.registerForm.get('fullName');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get mobileNumbersControl() {
    return this.registerForm.get('mobileNumbers') as FormArray;
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  initializeForm(): void {
    this.registerForm = new FormGroup(
      {
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailPattern)
        ]),
        mobileNumbers: new FormArray([
          new FormControl('', [
            Validators.required,
            Validators.pattern(this.mobilePattern)
          ])
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      {
        validators: passwordMatchValidator
      }
    );
  }

  
  addMobileNumber(): void {
    this.mobileNumbersControl.push(
      new FormControl('', [
        Validators.required,
        Validators.pattern(this.mobilePattern)
      ])
    );
  }

  removeMobileNumber(index: number): void {
    if (this.mobileNumbersControl.length > 1) {
      this.mobileNumbersControl.removeAt(index);
    }
  }

  resetForm(): void {
    this.registerForm.reset();
    this.submitted = false;

    this.mobileNumbersControl.clear();
    this.mobileNumbersControl.push(
      new FormControl('', [
        Validators.required,
        Validators.pattern(this.mobilePattern)
      ])
    );
  }

  clearAll(): void {
    this.resetForm();
    this.registeredUser = null;
  }

  register(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registeredUser = {
      fullName: this.fullNameControl?.value,
      email: this.emailControl?.value,
      mobileNumbers: this.mobileNumbersControl.value
    };

    console.log('Registered User:', this.registeredUser);
    this.resetForm();
  }

  getFullNameError(): string {
    if (this.fullNameControl?.hasError('required')) {
      return 'Full Name is required';
    }
    if (this.fullNameControl?.hasError('minlength')) {
      return 'Full Name must be at least 5 characters';
    }
    return '';
  }

  getEmailError(): string {
    if (this.emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (this.emailControl?.hasError('email') || this.emailControl?.hasError('pattern')) {
      return 'Email format is invalid';
    }
    return '';
  }

  getMobileError(index: number): string {
    const control = this.mobileNumbersControl.at(index);
    if (control?.hasError('required')) {
      return 'Mobile number is required';
    }
    if (control?.hasError('pattern')) {
      return 'Mobile number format is invalid';
    }
    return '';
  }

  getPasswordError(): string {
    if (this.passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (this.passwordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  getConfirmPasswordError(): string {
    if (this.confirmPasswordControl?.hasError('required')) {
      return 'Confirm Password is required';
    }
    if (this.registerForm.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }
}