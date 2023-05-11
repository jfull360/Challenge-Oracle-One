import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { objetoHistorial } from '../compilador/compilador.component';
@Pipe({
  name: 'pipeTexto',
  standalone: true,
})
export class PipeTexto implements PipeTransform {
  transform(texto: string): string {
    // si el texto sobrepasa los 35 caracteres solo presentaremos esos 10 caracteres
    //y evitar deformar el template
    if (texto.length >= 35) {
      return texto.substring(0, 35) + ' ...';
    } else {
      return texto;
    }
  }
}
@Component({
  selector: 'historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, BrowserModule, PipeTexto],
})
export class HistorialComponent implements OnInit {
  @Input() historial: objetoHistorial[] = [];
  @Output() textoEvent = new EventEmitter<string>();

  constructor(private clipboard: Clipboard) {}

  ngOnInit() {}
  enviarMensaje(texto: string) {
    this.textoEvent.emit(texto);
  }
}
