import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService){
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    this.http.post(`${environment.apiUrl}/auth/login`, this.loginForm.value).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.authService.setUser(res.user);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);

      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Credenciales incorrectas';
      }
    });
  }
}
