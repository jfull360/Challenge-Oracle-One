import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, BrowserModule],
})
export class ShowResultComponent implements OnInit {
  @Input() resultado: string = '';
  @Output() cleanEvent = new EventEmitter<boolean>(false);

  constructor(private clipboard: Clipboard ){}
  
  ngOnInit() {}

  clean() {
    this.resultado = '';
    this.cleanEvent.emit(true);
  }

  copy(){
    this.clipboard.copy(this.resultado);
  }
}
