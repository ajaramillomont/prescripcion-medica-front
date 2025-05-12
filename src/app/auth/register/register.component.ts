import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage = '';
  successMessage = '';


   constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){
      this.registerForm = this.fb.group({
        nombre: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        rol: ['medico', Validators.required],
      }, { validators: this.passwordsMatchValidator } );
    }

  passwordsMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { nombre, correo, password, rol } = this.registerForm.value;

    this.http.post('http://localhost:3000/users', { nombre, correo, password, rol}).subscribe({
      next: () => {
        this.successMessage = 'Usuario registrado con éxito.';
          // Esperar 2 segundos y luego redirigir
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      
      error: (err) => {
        this.errorMessage = err.error.message || 'Error al registrar usuario.';
      }
    });
  }
}
