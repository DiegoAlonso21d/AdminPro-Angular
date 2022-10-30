import { Component,OnInit,NgZone,AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn?:ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      remember: [false],
    },
    {
      Validators: [],
    }
  );

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone:NgZone
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.googleInit();
  }
  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '4458131058-l9j11iii5otls8kc01n4tdeh41u67r62.apps.googleusercontent.com',
      callback:(response:any)=> this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
/*       document.getElementById('buttonDiv') */
       this.googleBtn?.nativeElement ,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response:any){
    /*  console.log("Encoded JWT ID token: " + response.credential);  */
     this.usuarioService.loginGoogle(response.credential).subscribe(resp=>{

      this.ngZone.run(()=>{
            this.router.navigateByUrl("/")
      })

  
     })
  }

  login() {
    this.usuarioService.logearse(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

            this.router.navigateByUrl('/');

      },
      (err) => {
        //Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
