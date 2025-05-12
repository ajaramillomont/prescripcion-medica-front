import { Injectable } from '@angular/core';
import {environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ContactMessage {
  nombre: string;
  correo: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})

export class ContactService {
    private apiUrl = environment.apiUrl + "/"+"contact";

  constructor(private http: HttpClient) { }

  enviarMensaje(data: ContactMessage): Observable<any> {

    return this.http.post(this.apiUrl, data);

  }
}
