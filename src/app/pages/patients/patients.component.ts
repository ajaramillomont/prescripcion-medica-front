import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FiltroPacientePipe } from './filtro-paciente.pipe';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FiltroPacientePipe, FormsModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {

  @ViewChild('formularioRef') formularioRef!: ElementRef;

  pacienteForm!: FormGroup;
  pacientes: any[] = [];
  editando = false;
  pacienteEditandoId: string | null = null;
  loading = false;
  filtro: string = '';

  mensaje = '';
  tipoMensaje: 'success' | 'error' | null = null;

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private fb: FormBuilder, private pacienteService: PatientService) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: [null], // tipo DATEONLY
      genero: [''], // puede estar vacío
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.obtenerPacientes();
  }

  obtenerPacientes() {
    this.loading = true;
    this.pacienteService.getAll().subscribe({
      next: (res) => {
        this.pacientes = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('Error al obtener pacientes');
      },
    });
  }

  onSubmit() {
    if (this.pacienteForm.invalid) return;

    const formData = this.pacienteForm.value;

    if (this.editando && this.pacienteEditandoId) {
      this.pacienteService.update(this.pacienteEditandoId, formData).subscribe(() => {
        this.obtenerPacientes();
        this.cancelarEdicion();
      });
    } else {
      this.pacienteService.create(formData).subscribe({
        next: () => {
          this.obtenerPacientes();
          this.pacienteForm.reset();
          this.mostrarMensaje('Paciente creado con éxito', 'success');
        },
        error: () => {
          this.mostrarMensaje('Error al crear paciente', 'error');
        }
      });
    }
  }

  editarPaciente(paciente: any) {
    this.pacienteForm.patchValue(paciente);
    this.editando = true;
    this.pacienteEditandoId = paciente.id;

    setTimeout(() => {
      this.formularioRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  eliminarPaciente(id: string) {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.pacienteService.delete(id).subscribe(() => this.obtenerPacientes());
    }
  }

  cancelarEdicion() {
    this.editando = false;
    this.pacienteEditandoId = null;
    this.pacienteForm.reset();
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error') {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;

    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = null;
    }, 3000); // 3 segundos
  }

  get pacientesPaginados() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.pacientes.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.pacientes.length / this.itemsPerPage);
  }

  cambiarPagina(pagina: number) {
    this.currentPage = pagina;
  }
}


