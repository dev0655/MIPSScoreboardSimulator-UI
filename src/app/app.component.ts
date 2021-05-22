import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import * as CodeMirror from 'codemirror';



import { HttpClient, HttpParams } from '@angular/common/http';
import { Host } from './host';
import { Response } from 'src/models/response';
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
   
  
  dataList: any=[];
  errorlist: any=[];
  memorylist: Number[]=[];
 
  
  code:string ='LI R1, 8\nLI R2, 312\nLI R4, 256\nADD R5, R1, R2\nHLT';
  





  options: any = {
    lineNumbers: true,
    mode: 'mipsasm',
    theme:'monokai',
    styleActiveLine: { nonEmpty: true }
  };
  title = 'MIPSSimulator';
  
  position: number=0;
  array: any=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  constructor(private http: HttpClient) {
    
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(){
  }

  

step(){
  this.position= this.position+1;
  this.array= this.dataList[this.position-1];
  const editor = this.codeEditor.codeMirror;
   const doc = editor.getDoc();
   doc.setCursor(this.array[32]);
}
reset(){
  this.position= 0;
  this.array=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  this.dataList =[];
  this.errorlist=[];
  this.memorylist=[];
  const editor = this.codeEditor.codeMirror;
   const doc = editor.getDoc();
   doc.setCursor(this.position);
}
execute(){
  let params = new HttpParams();
params = params.append('configFile', this.code);
  this.http.get<Response>("http://localhost:8080/MIPSSimulator/api/executeSimulator", {params: params}).subscribe(
      data=>{
        
        console.log("Here"+ data);
        this.dataList=data.result;
        this.memorylist=data.memory;
        this.errorlist=data.err;
        console.log(this.memorylist[0]);
        
      }
      
    );
    

}

counter(i: number) {
  return new Array(i);
}
 



  ngOnDestroy(){
    
  }
 
 

}
