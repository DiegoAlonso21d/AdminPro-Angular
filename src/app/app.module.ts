import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthModuleModule } from './auth/auth.module.module';







@NgModule({
  declarations: [
    AppComponent,
   
    NopagefoundComponent,
      
     
       
      

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
