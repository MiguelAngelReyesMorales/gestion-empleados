
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


import { Empleado } from './models/empleado';
import { EmpleadoService } from './services/empleado.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private empleadoService = inject(EmpleadoService);
  private changeDetector = inject(ChangeDetectorRef);

  empleados: Empleado[] = [];
  empleadoSeleccionado: string | null = null;
  mensaje = '';
  error = '';

  empleado: Empleado = this.empleadoVacio();

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  empleadoVacio(): Empleado {
    return {
      name: '',
      position: '',
      office: '',
      salary: 0
    };
  }

  obtenerEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (datos) => {
        this.empleados = datos;
        this.error = '';
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener empleados:', error);
        this.error = 'No se pudieron cargar los empleados.';
        this.changeDetector.detectChanges();
      }
    });
  }

  guardarEmpleado(form: NgForm): void {
    if (form.invalid) {
      this.error = 'Completa todos los campos correctamente.';
      this.mensaje = '';
      return;
    }

    const editando = this.empleadoSeleccionado !== null;

    const operacion = editando
      ? this.empleadoService.actualizarEmpleado(
          this.empleadoSeleccionado!,
          this.empleado
        )
      : this.empleadoService.registrarEmpleado(this.empleado);

    operacion.subscribe({
      next: () => {
        this.limpiarFormulario(form);
        this.mensaje = editando
          ? 'Empleado actualizado correctamente.'
          : 'Empleado registrado correctamente.';
        this.obtenerEmpleados();
      },
      error: (error) => {
        console.error('Error al guardar empleado:', error);
        this.error = 'No se pudo guardar el empleado.';
        this.mensaje = '';
      }
    });
  }

  editarEmpleado(empleado: Empleado): void {
    if (!empleado._id) {
      return;
    }

    this.empleadoSeleccionado = empleado._id;
    this.empleado = { ...empleado };
    this.mensaje = '';
    this.error = '';
  }

  eliminarEmpleado(id?: string): void {
    if (!id || !confirm('¿Deseas eliminar este empleado?')) {
      return;
    }

    this.empleadoService.eliminarEmpleado(id).subscribe({
      next: () => {
        if (this.empleadoSeleccionado === id) {
          this.empleado = this.empleadoVacio();
          this.empleadoSeleccionado = null;
        }

        this.mensaje = 'Empleado eliminado correctamente.';
        this.error = '';
        this.obtenerEmpleados();
      },
      error: (error) => {
        console.error('Error al eliminar empleado:', error);
        this.error = 'No se pudo eliminar el empleado.';
        this.mensaje = '';
      }
    });
  }

  limpiarFormulario(form?: NgForm): void {
    form?.resetForm();
    this.empleado = this.empleadoVacio();
    this.empleadoSeleccionado = null;
    this.error = '';
  }
}
