import { Injectable, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  public _ocultarModal: boolean = true;
  public tipo: string | undefined;
  public id: string | undefined;
  public img: string | undefined;

  public nuevaImagen: EventEmitter<string> =new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: string = 'usuarios'  ||'medicos' || 'hospitales'  ,
    id: string = "",
    img: string = 'no-image'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;


    /*  this.img = img; */

    //http://localhost:3000/api/upload/usuarios/no-img

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${id}`;
    }


  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() {}
}
