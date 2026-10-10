
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  it('debe crear el componente de gestión de empleados', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('debe mostrar el título de la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    const titulo = elemento.querySelector('h1');

    expect(titulo?.textContent).toContain('GESTIÓN DE EMPLEADOS');
  });
});
