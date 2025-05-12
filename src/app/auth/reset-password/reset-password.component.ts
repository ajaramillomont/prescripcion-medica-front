import { Component } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {CommonModule} from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;
  token!: string;

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.resetForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get newPassword(): AbstractControl {
    return this.resetForm.get('newPassword')!;
  }

  get confirmPassword(): AbstractControl {
    return this.resetForm.get('confirmPassword')!;
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  onSubmit(): void {
    if (this.resetForm.valid) {
      const { newPassword, confirmPassword } = this.resetForm.value;
      this.authService.resetPassword(this.token, newPassword, confirmPassword).subscribe({
        next: () => {
          alert('Contraseña actualizada correctamente.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar la contraseña.');
        }
      });
    }
  }
}
