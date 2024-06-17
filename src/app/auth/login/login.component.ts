import { Component, OnInit } from '@angular/core';
import { Client, NgxSoapService, ISoapMethod } from 'ngx-soap';
import { LoginService } from './login.service';
import { Login, UsuarioRetornoViewModel } from './login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: any;
  erros!: string[];

  message!: string;
  xmlResponse!: string;
  jsonResponse!: string;
  resultLabel!: string;
  client!: Client;
  login: Login = new Login()
  retorno: UsuarioRetornoViewModel = new UsuarioRetornoViewModel()
  constructor(private soap: NgxSoapService, private loginService: LoginService) {
    this.soap.createClient('assets/autenticacao.wsdl')
      .then(client => {
        console.log('Client', client);
        this.client = client;
      })
      .catch(err => console.log('Error', err));
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      cpf: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(1),]),
      senha: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(1),]),
      sistema: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(1),])
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  verificarCpf() {
    console.log('metodo2', this.login.cpf)
    this.loginService.buscarCPF(this.login.cpf).subscribe(x => {
      this.login = x
      console.log('metodo', x)

      if (this.login.idPessoaCdhu !== null || this.login.idPessoaCdhu !== undefined) {
        return true;
      }
      return false

    });
  }

  cpfValido(cpf: Event): any {
    this.login.cpf = (<HTMLInputElement>cpf.target).value
  }


  EnviarFormulario(): void{
    var login = new Login()
    login = this.formulario.value
    login.sistema = "402";
    /* login.cpf = this.formulario.value.cpf;
    login.senha = this.formulario.value.senha;
    login.sistema = "402"; */
    
    console.log('1',login)
    this.erros = [];
    this.loginService.logar(login).subscribe(x=>{
      this.retorno = x;
    },
    (err) => {
      if (err.status) {
        for (const campo in err.error.errors) {
          if (err.error.errors.hasOwnProperty(campo)) {
            this.erros.push(err.error.errors[campo]);
          }
        }
      }
    });
    
  }
  
}
