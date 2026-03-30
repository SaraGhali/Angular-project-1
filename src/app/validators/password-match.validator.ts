
import { AbstractControl, ValidationErrors } from '@angular/forms';
export default function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password !== confirmPassword ? { passwordMismatch: true } : null;
  }
