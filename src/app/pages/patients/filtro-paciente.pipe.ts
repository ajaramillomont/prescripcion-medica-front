import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPaciente',
  standalone: true
})
export class FiltroPacientePipe implements PipeTransform {
  transform(pacientes: any[], texto: string): any[] {
    if (!texto) return pacientes;

    const t = texto.toLowerCase();

    return pacientes.filter(p =>
      p.nombre.toLowerCase().includes(t) ||
      p.cedula.toLowerCase().includes(t)
    );
  }
}
