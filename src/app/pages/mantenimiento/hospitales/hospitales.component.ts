import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital-model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
 
  public hospitalesTemp: Hospital[] = [];
  private imgSubs: Subscription | undefined;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarHospitales()
    }

    this.busquedaService.buscar('hospitales', termino).subscribe((resp:Hospital[]|any[]) => {
      this.hospitales = resp;
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });
  }

  async abrirSweetAlert() {
    const { value } = await Swal.fire<string | any>({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Ingrese el Nombre de nuevo Hospital',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });

    if (value?.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    console.log(hospital);
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }
}
