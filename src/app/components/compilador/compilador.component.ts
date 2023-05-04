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
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
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
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ShowResultComponent,
    CommonModule,
    BrowserModule,
    ConfirmPopupModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
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
    texto: ['', [Validators.required]],
  });
  resultado: string = '';
  converciones: caracteresConvertidor = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat',
  };

  ngOnInit(): void {}

  validaciones() {
    //comprobación de que el usuario ingreso texto
    if (this.form.get('texto')?.value === '')
      return this.messageService.add({
        severity: 'warn',
        summary: '¡Advertencia!',
        detail: 'Por favor escriba un texto para encriptarlo.',
      });

    if (!this.onlyLettersAndNumbers(this.form.get('texto')?.value))
      return this.messageService.add({
        severity: 'error',
        summary: '¡Advertencia!',
        detail: 'El texto debe contener solo letras y numeros.',
      });
    //Debe funcionar solo con letras minúsculas
    let minuscula = removerAcentos(this.form.get('texto')?.value.toLowerCase());
    this.encriptar(minuscula);
  }

  onlyLettersAndNumbers(str: string): boolean {
    //funcion que testea si el string solo contiene letras, espacios y numeros y regresa un boleano
    return /^[A-Za-z0-9\s]*$/.test(str);
  }

  encriptar(stringValido: string) {
    this.resultado = '';
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
    this.resultado = arrayEncriptado;
  }

  cleanEvent(evento:boolean){
    evento && (this.form.get('texto')?.setValue(''));
  }
}
