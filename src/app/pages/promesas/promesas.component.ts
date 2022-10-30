import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   /*  const promesa=new Promise((resolve,reject)=>{

      if(false){
           resolve("Hola Mundo");
      }else{
        reject("Algo Salio Mal");
      }

   


    })

      promesa.then((mensaje)=>{
        console.log(mensaje)
      }).catch(error=>console.log("Error en la promesa ", error)) */



   /*    this.getUsuarios(); */


   this.getUsuarios().then(usuario=>{
    console.log(usuario)
   })

  }


  getUsuarios(){

    return new Promise(reoslve=>{
         fetch('https://reqres.in/api/users')
    .then(resp=>resp.json())
    .then(body=>console.log(body.data));
    })

 


  }

}
