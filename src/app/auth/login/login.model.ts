export class Login {

      cpf!: string;
      senha: string | undefined;
      sistema!: string;
      idPessoaCdhu!: number
}

export class UsuarioRetornoViewModel {

      token !: string;
      tokenType!: string
      idPessoa !: number
      idPessoaCDHU!: number
      idScope!: number
      nomeUsuario!: string
      nomePessoa!: string
      primeiroNome!: string
      email!: string
      sistema!: number
      tipoAutenticacao!: string
      perfilSelecionado!: string

}