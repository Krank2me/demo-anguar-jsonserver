import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmpleado(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data)
    .pipe(map((res:any) => {
      return res;
    }));
  }

  getEmpleados() {
    return this.http.get<any>('http://localhost:3000/posts')
  }

  borrarEmpleado(id: any) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id)
  }

  editarEmpleado(empleado: any) {
    return this.http.put<any>('http://localhost:3000/posts/' + empleado.id, empleado);
  }
}
