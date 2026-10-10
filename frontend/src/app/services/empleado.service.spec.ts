
import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { EmpleadoService } from './empleado.service';
import { Empleado } from '../models/empleado';

describe('EmpleadoService', () => {
  let servicio: EmpleadoService;
  let httpTesting: HttpTestingController;

  const apiUrl = 'http://localhost:3000/api/empleados';

  const empleadoPrueba: Empleado = {
    _id: '123',
    name: 'Carlos Ramirez',
    position: 'Desarrollador',
    office: 'Tecnología',
    salary: 2500000
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmpleadoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    servicio = TestBed.inject(EmpleadoService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('debe consultar la lista de empleados', () => {
    servicio.obtenerEmpleados().subscribe((empleados) => {
      expect(empleados.length).toBe(1);
      expect(empleados[0].name).toBe('Carlos Ramirez');
    });

    const solicitud = httpTesting.expectOne(apiUrl);

    expect(solicitud.request.method).toBe('GET');

    solicitud.flush([empleadoPrueba]);
  });

  it('debe registrar un empleado', () => {
    servicio.registrarEmpleado(empleadoPrueba).subscribe((respuesta) => {
      expect(respuesta.name).toBe('Carlos Ramirez');
    });

    const solicitud = httpTesting.expectOne(apiUrl);

    expect(solicitud.request.method).toBe('POST');
    expect(solicitud.request.body).toEqual(empleadoPrueba);

    solicitud.flush(empleadoPrueba);
  });

  it('debe actualizar un empleado', () => {
    servicio.actualizarEmpleado('123', empleadoPrueba).subscribe((respuesta) => {
      expect(respuesta.position).toBe('Desarrollador');
    });

    const solicitud = httpTesting.expectOne(`${apiUrl}/123`);

    expect(solicitud.request.method).toBe('PUT');

    solicitud.flush(empleadoPrueba);
  });

  it('debe eliminar un empleado', () => {
    servicio.eliminarEmpleado('123').subscribe((respuesta) => {
      expect(respuesta.mensaje).toBe('Empleado eliminado');
    });

    const solicitud = httpTesting.expectOne(`${apiUrl}/123`);

    expect(solicitud.request.method).toBe('DELETE');

    solicitud.flush({ mensaje: 'Empleado eliminado' });
  });
});
