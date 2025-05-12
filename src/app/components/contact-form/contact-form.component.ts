import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactMessage, ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})

export class ContactFormComponent {
  contactForm!: FormGroup;

  @Input() nombre: string = '';
  @Input() correo: string = '';
  @Input() mensaje: string = '';

  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  mostrarToast(mensaje: string, tipo: 'success' | 'error' = 'success') {
    this.toastMessage = mensaje;
    this.toastType = tipo;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000);
  }
  

  enviarFormulario() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Marca todo como tocado para mostrar errores
      return;
    }

    const datos: ContactMessage = this.contactForm.value;

    // Enviar si todo está correcto

    this.contactService.enviarMensaje(datos).subscribe({
      next: () => {
        this.mostrarToast('Mensaje enviado correctamente', 'success');
        this.contactForm.reset();
      },
      error: (err) => {
        console.log(err);
        this.mostrarToast(err?.error?.message || 'Hubo un error al enviar el mensaje', 'error');
        }
    })
  }
}
