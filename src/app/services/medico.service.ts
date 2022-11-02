import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico-model';

const base_url=environment.base_url

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http:HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarMedicos() {
    //  http://localhost:3000/api/usuarios?desde=3

    const url = `${base_url}/medicos`;

    return this.http
      .get(url, this.headers)
      .pipe(map((resp: any) => resp.medicos));
  }

  crearMedico(medico: {nombre:string,hospital:string}) {
    //  http://localhost:3000/api/usuarios?desde=3

    const url = `${base_url}/medicos`;

    return this.http.post(url, medico, this.headers);
  }

  obtenerMedicoPorId(id:string){
    //  http://localhost:3000/api/usuarios?desde=3

    const url = `${base_url}/medicos/${id}`;

    return this.http.get(url,  this.headers)
    .pipe(
      map((resp:Medico[]|any)=>resp.medico)
    )
  }

  actualizarMedico(medico:Medico) {
    const url = `${base_url}/medicos/${medico._id}`;

    return this.http.put(url,medico, this.headers);
  }

  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;

    return this.http.delete(url, this.headers);
  }
}
