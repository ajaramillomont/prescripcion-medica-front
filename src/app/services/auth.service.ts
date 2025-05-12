import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendRecovery(correo: string): Observable<any> {
    //correo es el cuerpo (body) de la petición
    return this.http.post(`${this.apiUrl}/auth/send-recovery`, { correo });
  }

  login(correo: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { correo, password });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    //(!!)) convierte el valor a boolean
    return !!this.getToken();
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string) {
    return this.http.patch(`${this.apiUrl}/auth/reset-password`, {
      token,
      newPassword,
      confirmPassword
    });
  }




}
