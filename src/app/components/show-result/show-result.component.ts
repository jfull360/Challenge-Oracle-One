import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css'],
  standalone:true,
  imports:[FormsModule, CommonModule, BrowserModule]
})
export class ShowResultComponent implements OnInit{

  @Input() resultado:string='';

  ngOnInit(){



  }

}
