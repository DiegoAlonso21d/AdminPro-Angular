import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from '../../models/usuario-model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File | any;
  public imgTemp: string | any;

  constructor(public modalImagenService: ModalImagenService,
    private fileUploadService:FileUploadService) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: any) {
    let file = event.target.files[0];

    this.imagenSubir = file;

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {

    const id=this.modalImagenService.id;
    const tipo=this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, "usuarios" ,  id)
      .then((img) => {
      
        Swal.fire('Guardado', 'Imagen de usuario actualizado', 'success');
        this.modalImagenService.nuevaImagen.emit(img)
        this.cerrarModal();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
