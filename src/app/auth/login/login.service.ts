import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import {catchError} from "rxjs/operators";

import { environment } from "src/environments/environment";
import { Login, UsuarioRetornoViewModel } from "./login.model";
import { Observable } from "rxjs/internal/Observable";


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      // Authorization: `Bearer ${localStorage.getItem('TokenUser')}`,
    }),
  };


@Injectable({
    providedIn: 'root'
})



export class LoginService {


    constructor(private http: HttpClient) {  }

      public buscarCPF(cpf: string): Observable<Login> {
        return this.http.get<Login>(`${environment.url}pessoa/buscarCPF/${cpf}`)}


     public logar(login:Login):Observable<UsuarioRetornoViewModel>{
       console.log(`${environment.autenticacao}api/Usuario/GerarToken`,login, httpOptions)
        return this.http.post<UsuarioRetornoViewModel>(`${environment.autenticacao}api/Usuario/GerarToken`, JSON.stringify(login), httpOptions).pipe(catchError(ErrorHandler.arguments));
     }
    }


function tap(arg0: (data: any) => void): import("rxjs").OperatorFunction<Login, unknown> {
    throw new Error("Function not implemented.");
}
