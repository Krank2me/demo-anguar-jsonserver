import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmpleadosModel } from './empleados.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  formValue!: FormGroup;
  empleadoModel: EmpleadosModel = new EmpleadosModel();
  empleadoData!: any;
  showAgregar!: boolean;
  showEditar!: boolean;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nombre: [''],
      apellidos: [''],
      email: [''],
      celular: [''],
      salario: ['']
    });
    this.getEmpleados();
  }

  clickAgregarEmpleado() {
    this.formValue.reset()
    this.showAgregar = true;
    this.showEditar = false;
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
      this.formValue.reset();
      this.getEmpleados();
    },
    err => {
      alert('Se pifeo esto!')
    });
  }

  getEmpleados() {
    this.apiService.getEmpleados()
    .subscribe(res => {
      this.empleadoData = res;
    })
  }

  deleteEmpleado(empleado: any) {
    this.apiService.borrarEmpleado(empleado.id)
    .subscribe(res => {
      if (res) {
        this.getEmpleados();
        alert('Empleado eliminado satsifactoriamente')
      }
    })
  }

  onEmpleado(empleado: EmpleadosModel) {
    this.showAgregar = false;
    this.showEditar = true ;
    this.empleadoModel.id = empleado.id;
    this.formValue.controls['nombre'].setValue(empleado.nombre);
    this.formValue.controls['apellidos'].setValue(empleado.apellidos);
    this.formValue.controls['email'].setValue(empleado.email);
    this.formValue.controls['celular'].setValue(empleado.celular);
    this.formValue.controls['salario'].setValue(empleado.salario);
  }

  editarEmpleado() {
    this.empleadoModel.nombre = this.formValue.value.nombre;
    this.empleadoModel.apellidos = this.formValue.value.apellidos;
    this.empleadoModel.email = this.formValue.value.email;
    this.empleadoModel.celular = this.formValue.value.celular;
    this.empleadoModel.salario = this.formValue.value.salario;
    this.apiService.editarEmpleado(this.empleadoModel)
    .subscribe(res => {
      if (res) {
        this.getEmpleados();
        alert('Empleado editado satisfactoriamente');
        let refCancelar = document.getElementById('cancelar');
        refCancelar?.click();
      }
    })

  }
}
