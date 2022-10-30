import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario-model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {


    public usuario:Usuario|undefined;

  constructor(private usuarioService:UsuarioService) {
    

    this.usuario = usuarioService.usuario;

   }



  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }


}
