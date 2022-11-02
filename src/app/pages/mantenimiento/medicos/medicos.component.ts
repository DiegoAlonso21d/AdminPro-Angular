import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico-model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];

  private imgSubs: Subscription | undefined;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,

  ) {}
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
      console.log(medicos);
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarMedicos();
    }

    this.busquedaService
      .buscar('medicos', termino)
      .subscribe((resp: Medico[] | any[]) => {
        this.medicos = resp;
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  borrarMedico(medico:Medico){

     return Swal.fire({
       title: 'Borrar Medico?',
       text: `Esta apunto de borrar a ${medico.nombre}`,
       icon: 'question',
       showCancelButton: true,
       confirmButtonColor: '#00FF1A',
       cancelButtonColor: '#DC0000',
       confirmButtonText: 'Si,Borrarlo',
     }).then((result) => {
       if (result.isConfirmed) {
         this.medicoService.borrarMedico(medico._id).subscribe((resp) => {
           Swal.fire(
             'Medico borrado',
             `El medico ${medico.nombre} fue eliminado `,
             'success'
           );

           this.cargarMedicos();
         });
       }
     });
  }
}
