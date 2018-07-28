import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { Pessoa } from './pessoa';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cadastroForm: FormGroup;
  pessoaAtual: Pessoa;
  pessoas: Pessoa[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: this.fb.control('', [Validators.required, Validators.maxLength(10)]),
      email: this.fb.control('', Validators.required)
    });

    this.pessoas = [
      { nome: 'Nome1', email: 'Email1' },
      { nome: 'Nome2', email: 'Email2' },
      { nome: 'Nome3', email: 'Email3' }
    ]
  }

  adicionar() {
    if(this.cadastroForm.invalid) {
      alert('Dados inválidos!');
      return;
    }

    let novaPessoa: Pessoa = {
      nome: this.cadastroForm.get('nome').value,
      email: this.cadastroForm.get('email').value
    };

    let listaTemporaria: Pessoa[] = this.pessoas.slice(0);
    let indice: number = listaTemporaria.indexOf(this.pessoaAtual);
    listaTemporaria.splice(indice, 1, novaPessoa);

    this.pessoas = listaTemporaria;
    this.pessoaAtual = novaPessoa;
  }

  editarPessoa(pessoa: Pessoa) {
    this.pessoaAtual = pessoa;

    this.cadastroForm.get('nome').setValue(pessoa.nome);
    this.cadastroForm.get('email').setValue(pessoa.email);
  }

}
