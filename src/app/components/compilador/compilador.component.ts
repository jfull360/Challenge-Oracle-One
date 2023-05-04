import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { removerAcentos } from 'src/app/utils/quitarAcentos';
import { ShowResultComponent } from '../show-result/show-result.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export type caracteresConvertidor = {
  [key in string]: string;
};
@Component({
  selector: 'compilador',
  templateUrl: './compilador.component.html',
  styleUrls: ['./compilador.component.css'],
  imports: [FormsModule, ReactiveFormsModule, ShowResultComponent, CommonModule, BrowserModule],
  providers: [ConfirmationService, MessageService],
  standalone: true,
})
export class Compiladorcomponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  form: UntypedFormGroup = this.fb.group({
    texto: ['', [Validators.required, Validators.pattern('/^[0-9A-Za-z]$/')]],
  });
  resultado:string='';
  converciones: caracteresConvertidor = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat',
  };
  reglas: RegExp = /^[0-9A-Za-z]$/;


  ngOnInit(): void {}

  validaciones() {
    const regex = new RegExp("/^([0-9A-Za-z])\w+/g");
    console.log(regex.test(this.form.get('texto')?.value));
    
    /* if (!regex.test(this.form.get('texto')?.value))
      return (
        console.log('first'),
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        })
      ); */
    //Debe funcionar solo con letras minúsculas
    let minuscula = removerAcentos(this.form.get('texto')?.value.toLowerCase());
    this.encriptar(minuscula);
  }

  encriptar(stringValido: string) {
    /*La letra "e" es convertida para "enter"
    La letra "i" es convertida para "imes"
    La letra "a" es convertida para "ai"
    La letra "o" es convertida para "ober"
    La letra "u" es convertida para "ufat" */
    let arrayEncriptado: string = '';
    [...stringValido].forEach((caracter) => {
      arrayEncriptado =
        arrayEncriptado + (this.converciones[caracter] ?? caracter);
    });

    console.log(arrayEncriptado);
    this.resultado=arrayEncriptado;
  }
}
