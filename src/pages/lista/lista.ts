import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  almacena:any;
  almacena2:any;
  NM="";

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpc: Http) {
    this.httpc.get("http://localhost:3000/maall")
        .subscribe(
            res => {
                this.almacena = res.json();
                console.log(this.almacena);
            },
            error => {
                console.log(error);
            }
        );
        this.almacena2=[];
  }

  mostrar(i,id:string){
    this.httpc.get("http://localhost:3000/maall/"+id)
        .subscribe(
            res => {
                this.almacena2 = res.json();
                //console.log(this.almacena2);
                this.almacena[i].open = !this.almacena[i].open;
                if(this.almacena[i].open){
                  console.log(this.almacena2);
                }
            },
            error => {
                console.log(error);
            }
        );

        console.log(id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
  }

}
