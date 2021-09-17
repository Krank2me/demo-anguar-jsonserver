import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { EmpleadosModel } from '../empleados/empleados.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmpleado(empleado: EmpleadosModel) {
    return this.http.post<EmpleadosModel>('http://localhost:3000/posts', empleado)
    .pipe(map((res:EmpleadosModel) => {
      return res;
    }));
  }

  getEmpleados() {
    return this.http.get<EmpleadosModel>('http://localhost:3000/posts')
  }

  borrarEmpleado(id: number) {
    return this.http.delete<EmpleadosModel>('http://localhost:3000/posts/' + id)
  }

  editarEmpleado(empleado: EmpleadosModel) {
    return this.http.put<EmpleadosModel>('http://localhost:3000/posts/' + empleado.id, empleado);
  }
}
