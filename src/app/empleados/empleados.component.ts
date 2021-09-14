import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmpleadosModel } from './empleados.model';
import { ApiService } from '../shared/api.service'
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  formValue!: FormGroup;
  empleadoModel: EmpleadosModel = new EmpleadosModel();

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nombre: [''],
      apellidos: [''],
      email: [''],
      celular: [''],
      salario: ['']
    });
  }

  agregarEmpleado() {
    this.empleadoModel.nombre = this.formValue.value.nombre;
    this.empleadoModel.apellidos = this.formValue.value.apellidos;
    this.empleadoModel.email = this.formValue.value.email;
    this.empleadoModel.celular = this.formValue.value.celular;
    this.empleadoModel.salario = this.formValue.value.salario;

    this.apiService.postEmpleado(this.empleadoModel)
    .subscribe(res => {
      console.log(res);
      alert('Empleado agregado satisfactoriamente');
    },
    err => {
      alert('Se pifeo esto!')
    });
  }
}
