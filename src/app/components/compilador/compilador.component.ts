import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'compilador',
  templateUrl: './compilador.component.html',
  styleUrls: ['./compilador.component.css'],
  imports:[FormsModule, ReactiveFormsModule],
  standalone:true
})
export class Compiladorcomponent implements OnInit {

  constructor(private fb: UntypedFormBuilder) { }

  form:UntypedFormGroup=this.fb.group({
    texto:['',Validators.required]
  });

  ngOnInit(): void {
    
  }

  encriptar(){
    console.log(this.form.get('texto')?.value)
  }


}
