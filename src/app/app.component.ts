import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { HttpClient } from '@angular/common/http';
import { Host } from './host';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'NetworkMonitor';
  users: Host[]=[];
  content: String="data";
  iptables: String[]=[];
  dataRefresher: any;
  constructor(private http: HttpClient) {
    
  }

  ngOnInit(){
    this.getAllHosts();
    this.refreshData();
  }

  upload(file: File[]){
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("configFile", file[0], file[0].name);
    formData.append("instructionFile", file[0], file[0].name);
    formData.append("dataFile", file[0], file[0].name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post("http://localhost:8080/NetworkMonitor/api/getAllHosts", formData)
}

  getAllHosts(){
    this.http.get<Host[]>("http://localhost:8080/NetworkMonitor/api/getAllHosts").subscribe(
      data=>{
        
        console.log("Here");
        this.users=data;
      }
      
    );
  }

  getIptables(host:String){
    this.http.get<String[]>("http://localhost:8080/NetworkMonitor/api/iptables/"+host).subscribe(
      data=>{
        
        console.log("Here");
        this.iptables=data;
      }
    );
  }

  refreshData(){
    this.dataRefresher =
      setInterval(() => {
        this.getAllHosts();
      }, 6000);  
  }

  ngOnDestroy(){
    this.users=[];
    this.iptables=[];
  }
 
 

}
