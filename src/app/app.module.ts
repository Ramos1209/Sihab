import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';

import { NgxSoapModule } from 'ngx-soap';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginService } from './auth/login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { JwtModule } from '@auth0/angular-jwt';


export function PegarTokem(){
  return localStorage.getItem("chave aqui")
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    NgxSoapModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:PegarTokem,
        allowedDomains:['localhost ou a url que esta a aplicacao'],
        disallowedRoutes:[]
      }
    })


  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
