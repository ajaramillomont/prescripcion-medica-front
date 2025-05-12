import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./recover-password.component.html"
})
export class RecoverPasswordComponent {
  recoverForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.recoverForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  get correo() {
    return this.recoverForm.get('correo')!;
  }

  onSubmit() {
    if(this.recoverForm.valid) {
      const correo = this.recoverForm.value.correo;

      //en esta parte nos suscribimos al observable
      this.authService.sendRecovery(correo).subscribe({
        next: (response) => {
          this.successMessage = 'Correo enviado exitosamente'
          this.errorMessage = '';
          this.recoverForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Ocurrió un error al enviar el correo';
          this.successMessage = '';
        }
      });
    }
  }
}
