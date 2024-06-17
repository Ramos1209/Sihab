import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private jwtHelper:JwtHelperService, private router:Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('PegarToken');

    if(token){
      return true;
    }
    this.router.navigate(['login'])
  }

  VerificaAdmin():boolean{
    const token = localStorage.getItem('PegarToken');
    const usuarioToken = decode(token);

    if(usuarioToken.role === 'Adm'){
      return true;
    }else{
      return false;
    }
  }
}


