import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthHomeProvider } from '../../providers/auth-home/auth-home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthHomeProvider]
})
export class HomePage {

  private dados : Array<{albumId: any, id: any, thumbnailUrl : any, title :any, url: any }> = [];
  private temp : Array<{albumId: any, id: any, thumbnailUrl : any, title :any, url: any }> = [];
  private numFoto: any;

  constructor(public navCtrl: NavController,
              public servico:AuthHomeProvider) {
        
      if(this.dados.length == 0){
       this.servicoDados(2);      
      }
  }

  getAll() {
    this.servico.load()
      .then((result: any) => {

        for (var i = 0; i < 2; i++) { 
          this.dados.push(result[i]);
        }
        this.temp = this.dados;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  filterItems(qnt){ 
    if(this.temp == undefined || this.temp.length <= 0)
      this.temp = this.dados;
    if(this.numFoto != undefined && this.numFoto != ""){     
      this.servico.load().then((result: any) => {
        this.temp = [];

        for(var f=0; f<result.length; f++) {
          if(result[f].id.toString().indexOf(this.numFoto.toString()) > -1) {  
            if(this.temp.length < qnt)            
              this.temp.push(result[f]);  
            else
              break;              
          }
          else if(this.temp.length >= qnt)  
            break;  
        }         
      }       
      );
    }
    else
      this.temp = this.dados;    
  }

  scroll(event){
    setTimeout(() => { 
    if(this.numFoto != undefined && this.numFoto != ""){
      this.filterItems(this.temp.length +2);
    }
    else{      
      this.servicoDados(this.temp.length + 2);
        new Promise((resolve) => {       
          for(var i= this.temp.length; i < this.dados.length; i++){
            if(this.dados[i] != undefined)
              this.temp.push(this.dados[i]);
          }         
          resolve();
        });      
    }
    event.complete();
  },500);
  }

  servicoDados(qnt) {
    this.servico.load()
      .then((result: any) => {
        this.dados = [];
        this.temp = [];
        for (var i = 0; i < qnt; i++) { 
          this.dados.push(result[i]);
        }
        if(this.temp.length == 0)
          this.temp = this.dados;
      })
      .catch((error: any) => {
        console.log(error);       
      });
  }
  
}
