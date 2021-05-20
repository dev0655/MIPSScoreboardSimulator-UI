import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import * as CodeMirror from 'codemirror';


import { HttpClient } from '@angular/common/http';
import { Host } from './host';
import { Registors } from 'src/models/registors';
import 'codemirror/mode/xml/xml';
import 'src/assets/mipsasm/mipsasm';
import 'codemirror/addon/selection/active-line';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy{
  @ViewChild('codeeditor')
  private codeEditor:any;
   
  
  code:string ='ADD 3, 1, 1 \nADD 1, 2, 3\nMUL 4, 2, 3\nDIV 5, 4, 3';

  options: any = {
    lineNumbers: true,
    mode: 'mipsasm',
    theme:'monokai',
    styleActiveLine: { nonEmpty: true }
  };
  title = 'MIPSSimulator';
  registors: Registors[]=[new Registors(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
    new Registors(1,1,2,3,4,5,5,6,7,8,9,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1)
    ,new Registors(634,154,26,36,96,57,5,6,7,8,9,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1),
    new Registors(35,14,236,35,54,657,5,6,7,8,9,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1),
    new Registors(3553,4355,263,36,96,57,5,6,7,8,9,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1),
    new Registors(345,3554,454,45,96,57,5,6,7,8,9,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1)];
  
  position: number=0;
  data:Registors= this.registors[this.position];
  constructor(private http: HttpClient) {
    
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(){
  }

  

step(){
  this.position= this.position+1;
  this.data = this.registors[this.position];
  const editor = this.codeEditor.codeMirror;
   const doc = editor.getDoc();
   doc.setCursor(this.position);
}
reset(){
  this.position= 0;
  this.data = this.registors[this.position];
  const editor = this.codeEditor.codeMirror;
   const doc = editor.getDoc();
   doc.setCursor(this.position);
}
execute(){

}

 
 



  ngOnDestroy(){
    
  }
 
 

}
