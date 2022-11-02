import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario-model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit,OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs :Subscription | undefined;

  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService:ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
   this.imgSubs=this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img=>this.cargarUsuarios())
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
        }
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino).subscribe((resp:Usuario[]|any[]) => {
      this.usuarios = resp;
    });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puedes borrarte a ti mismo', 'error');
    }

    return Swal.fire({
      title: 'Borrar usuario?',
      text: `Esta apunto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00FF1A',
      cancelButtonColor: '#DC0000',
      confirmButtonText: 'Si,Borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          Swal.fire(
            'Usuario borrado',
            `El usuario ${usuario.nombre} fue eliminado `,
            'success'
          );

          this.cargarUsuarios();
        });
      }
    });
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.GuardarUsuario(usuario)
    .subscribe(resp=>{
      console.log(resp);

    })
  }

  abrirModal(usuario:Usuario){
    console.log(usuario)
      this.modalImagenService.abrirModal("usuarios",usuario.uid,usuario.img);
  }

}
