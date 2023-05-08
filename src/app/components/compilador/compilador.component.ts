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
import { HistorialComponent } from '../historial/historial.component';

export type caracteresConvertidor = {
  [key in string]: string;
};
export type caracteresLongitud = {
  [key in string]: number;
};
@Component({
  selector: 'compilador',
  templateUrl: './compilador.component.html',
  styleUrls: ['./compilador.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ShowResultComponent,
    HistorialComponent,
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
  ) { }

  form: UntypedFormGroup = this.fb.group({
    texto: ['', [Validators.required]],
  });
  resultado: string = '';
  historial: objetoHistorial[] = [];
  converciones: caracteresConvertidor = {
    e: 'enter',
    i: 'imes', //DICCIONARIO ORIGINAL
    a: 'ai',
    o: 'ober',
    u: 'ufat',
  };

  longitudCaracter: caracteresLongitud = {
    e: 5,
    i: 4, //DICCIONARIO RELACION CARACTER/LONGITUD (REFERENCIA DESENCRIPTAR)
    a: 2,
    o: 4,
    u: 4
  }

  ngOnInit(): void { 
    //se obtiene los resultados anteriores para sumarle el nuevo
    (sessionStorage.getItem('historial')) && 
    (this.historial = JSON.parse(sessionStorage.getItem('historial') ?? ''));
  }

  validaciones(tipoAccion: number) {
    //comprobación de que el usuario ingreso texto
    if (this.form.get('texto')?.value === '')
      return this.messageService.add({
        severity: 'warn',
        summary: '¡Advertencia!',
        detail: 'Por favor escriba algún texto.',
      });

    if (!this.onlyLettersAndNumbers(this.form.get('texto')?.value))
      return this.messageService.add({
        severity: 'error',
        summary: '¡Advertencia!',
        detail: 'El texto debe contener solo letras y numeros.',
      });
    //Debe funcionar solo con letras minúsculas
    let minuscula = removerAcentos(this.form.get('texto')?.value.toLowerCase());
    //1 significa que se desea encriptar y 2 desencriptar
    tipoAccion === 1 ? this.encriptar(minuscula) : this.desencriptar(minuscula);
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
    this.addHistorial(stringValido);
  }

  addHistorial(texto: string) {
    //se revisa si el mensaje ya existe en el arreglo para no volver a almacenarlo
    if (this.historial.find(a => a.texto === texto)) return this.messageService.add({
      severity: 'warn',
      summary: '¡Advertencia!',
      detail: 'Texto ingresado anteriormente.',
    });
    //Se agrega el resultado al session Storage
    const objetoHistorial: objetoHistorial = {
      texto: texto
    }
    this.historial.push(objetoHistorial);
    sessionStorage.setItem('historial', JSON.stringify(this.historial));
  }

  desencriptar(stringValido: string) {
    this.resultado = '';
    //AL DICCIONARIO DE DATOS LO CONVERTIMOS 
    const flip = (data: any) => Object.fromEntries(
      Object
        .entries(data)
        .map(([key, value]) => [value, key])
    );
    // CREAMOS COPIA DEL DICCIONARIO ORIGINAL
    const copiaDiccionario = flip(this.converciones);
    let arrayDesencriptado: string = '';
    let concatenador: string = '';
    let caracterEncontrado: string = '';
    [...stringValido].forEach((caracter) => {
      //Ingreso el un caracter del diccionario original y TODAVIA no se encuentra alguno anteriormente
      (this.converciones[caracter] && caracterEncontrado === '') && (caracterEncontrado = caracter);
      // si no se encuentra un caracter simplemente se almacena al resultado pero si se encuentra 
      //se comienza a concatenar
      caracterEncontrado !== '' ? (concatenador = concatenador + caracter) : arrayDesencriptado = arrayDesencriptado + caracter;
      if (this.longitudCaracter[caracterEncontrado] === concatenador.length) {
        //cuando la longitud del caracter sea igual a la que corresponde en el diccionario
        arrayDesencriptado = arrayDesencriptado + (copiaDiccionario[concatenador] ?? caracter);
        concatenador = '';//limpiamos residuo de caracteres anteriores
        caracterEncontrado = '';
      }
    });
    this.resultado = arrayDesencriptado;
  }
  cleanEvent(evento: boolean) {
    evento && (this.form.get('texto')?.setValue(''));
  }
  textoEvent(event: string) {
    this.form.get('texto')?.setValue(event);
  }
}
export interface objetoHistorial {
  texto: string;
}