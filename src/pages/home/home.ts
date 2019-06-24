import { Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { identifierModuleUrl } from '@angular/compiler';
import { AppModule } from '../../app/app.module';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedDay = new Date();
  calendar = {
    mode:'month',
    //currentDate: this.selectedDay
  }
  clic=false;
  user:string;
  botondisable=true;
  fecha:string;
  letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  seldia:string;
  dia:string;
  hora:string;
  ha:string;
  filteredcategorias=[];
  agdia:string;
  pndia:string;

  public listcars = [
    { id: '1', make: 'audi', model: 'r8', year: '2012' }, 
    { id: '2', make: 'audi', model: 'rs5', year: '2013' },
    { id: '3', make: 'ford', model: 'mustang', year: '2012' }, 
    { id: '4', make: 'ford', model: 'fusion', year: '2015' }, 
    { id: '5', make: 'kia', model: 'optima', year: '2012' }
  ];



  public lista:any;
  public carros=[];
  public result:any;
  public materias:any;
  public prue=[];
  public ase:any;
  peri=[];
  seldate="";
  mensaje="¡No hay registros!";
  msj="";
  alluni=''; 
  public unidades=[]; 

  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private httpc: Http) {
    
    /*this.httpc.get("http://localhost:3000/pruebas")
        .subscribe(
            res => {
                this.prue = res.json();
                //console.log(this.prue);
            },
            error => {
                console.log(error);
            }
        );

      this.categorias.map(category => {
        if(!this.filteredcategorias.find(cat => cat.id == category.id)){
          var filter2=[];
          const { id,name,department} = category;
          this.filteredcategorias.push({id,Categoria:[filter2.push({name,department})]});
        }
      });
      console.log(this.filteredcategorias);*/
      //var carros = [];
      //var result = [];

        this.httpc.get("http://localhost:3000/catperiodos")
        .subscribe(
            res => {
                this.peri = res.json();
                //console.log(this.peri);
                for (var x=0;x<this.peri.length;x++){
                  var pe = this.peri[0].id_periodo;
                  console.log(pe);
                  this.ionViewDidLoad(pe);
                }
            },
            error => {
                console.log(error);
            }
        );

      /*this.result = this.listcars.reduce(function (r, a) { 
        r[a.make] = r[a.make] || []; 
        r[a.make].push(a); 
        return r; 
      },{}); 
      console.log(this.result);*/
  }

   ionViewDidLoad(item:string) {
     //var fec = '20191'
    //console.log('ionViewDidLoad CatperiodosPage');
    this.httpc.get("http://localhost:3000/progasesorias/"+item)
        .subscribe(
            res => {
                this.prue = res.json();
                //console.log(this.prue);
                if(this.prue.length > 0){
                  this.mensaje=" ";
                }
            },
            error => {
                console.log(error);
            }
        );
  }

  crearINP(){
    //aquí instanciamos al componente padre
    var padre = document.getElementById("geninput");
    //aquí agregamos el componente de tipo input
    var input = document.createElement("INPUT");
    var input2 = document.createElement("INPUT");
    var input3 = document.createElement("INPUT");
    //aquí indicamos que es un input de tipo text
    input.setAttribute("type","text");
    input.setAttribute("name","msj");
    input.setAttribute("size", "120%");
    input.className = "input";
    
    //y por ultimo agreamos el componente creado al padre
    padre.appendChild(input);
    //padre.appendChild(input2);
    //padre.appendChild(input3);
  }
  
  mosmsj(){
    console.log(this.msj);
  }

  mosuni(){
    let alert = this.alertCtrl.create({
      title: "Insertando Unidades",
      subTitle: "Introduce el numero de unidades",
      inputs: [
        {
          name: 'numuni',
          type: 'number',
          placeholder: 'Numero de Unidades'
        }
      ],       
      buttons: [
        {
          text: 'Aceptar',
          handler: data => {
            var nu = data.numuni;
            this.unidades = [];
            this.alluni = "";
            //var unidades = [];
            //console.log(nu);
            for(var i=nu; i>=1;i--){
              //console.log(i);
              let alert = this.alertCtrl.create({
                title: "Unidad "+i,
                subTitle: "Introduce el nombre",
                inputs: [
                  {
                    name: 'unin',
                    type: 'text',
                    placeholder: 'Nombre de la unidad'
                  }
                ],        
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: data2 => {
                      var nombreuni = data2.unin;
                      this.unidades.push(data2.unin); 
                      this.alluni = this.alluni+nombreuni+"-";
                      //var nmu = this.unidades.length; 
                      //console.log(this.unidades);
                      //console.log(this.alluni); 
                      //console.log(nmu);
                            
                    }
                  },
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                      console.log('cancelo');
                    }
                  }        
                ]
              });
              alert.present()
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelo');
          }
        }        
      ]
    });
    alert.present();
  }

  resultuni(){
    var duni = this.alluni.split("-");
    for(var ji=0;ji<duni.length-1;ji++){
      var nuuni = ji+1;
      console.log(nuuni+"-"+duni[ji]);
    }
  }

  mostrarunidades(){
    if(this.clic==false){
      //document.getElementById("caja").style.height = "100px";
      document.getElementById("uni").style.display = "block"; 
      this.clic=true;
    }else{
      //document.getElementById("caja").style.height = "0px"; 
      document.getElementById("uni").style.display = "none"; 
      this.clic=false;
    }
  }

  create(){
    let alert = this.alertCtrl.create({
      title: "Nuevo Periodo",
      subTitle: "Elige el periodo:",
      inputs: [
        {
          type: 'radio',
          label: 'Enero-Junio',
          //name: 'inicio',
          value: 'Enero-Junio'
          //placeholder: 'Inicio'
        },
        {
          type: 'radio',
          label: 'Agosto-Diciembre',
          //name: 'fin',
          value: 'Agosto-Diciembre'
          //placeholder: 'Fin'
        }
      ],
      buttons: [
        {
          text: 'Aceptar',
          handler: data => {
            var peri = data.split("-");
            //console.log(peri[0]);
            //console.log(peri[1]);
            let alert = this.alertCtrl.create({
              title: "Nuevo Periodo",
              subTitle: "ingresa el año:",
              inputs: [
                {
                  name: 'year',
                  type: 'number',
                  placeholder: 'Año'
                }
              ],        
              buttons: [
                {
                  text: 'Aceptar',
                  handler: data2 => {
                    var y = data2.year;
                    var ye = data2.year;
                    if(peri[0]=="Enero"){
                      y=y+"1";
                    }
                    else{
                      y=y+"2";
                    }

                    let alert = this.alertCtrl.create({
                      title: "¿Datos Correctos?",
                      subTitle: "Periodo: "+y+"<br>Inicio: "+peri[0]+"<br>Fin: "+peri[1]+"<br>Año: "+ye,        
                      buttons: [
                        {
                          text: 'Aceptar',
                          handler: () => {        
                            console.log(y+"-"+peri[0]+"-"+peri[1]+"-"+ye);
                          }
                        },
                        {
                          text: 'Cancelar',
                          role: 'cancel',
                          handler: () => {
                            console.log('cancelo');
                          }
                        }        
                      ]
                    });
                    alert.present();
                  }
                },
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                    console.log('cancelo');
                  }
                }        
              ]
            });
            alert.present();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelo');
          }
        }        
      ]
    });
    alert.present();
  }

  mosprogra(){
    this.httpc.get("http://localhost:3000/progasesorias/"+this.seldate)
        .subscribe(
            res => {
                this.prue = res.json();
                console.log(this.prue);
                if(this.prue.length > 0){
                  this.mensaje=" ";
                }
            },
            error => {
                console.log(error);
            }
        );
  }
  lunes(){
    this.agdia=this.agdia+"Lunes,";
  }
  martes(){
    this.agdia=this.agdia+"Martes,";
  }
  miercoles(){
    this.agdia=this.agdia+"Miércoles,";
  }
  jueves(){
    this.agdia=this.agdia+"Jueves,";
  }
  viernes(){
    this.agdia=this.agdia+"Viernes,";
  }
  
  mostrardias(){
    this.agdia="mameswey";
    let alert = this.alertCtrl.create({
      title: "Checando dia",
      subTitle: this.agdia,
      buttons: ["Ok"]
    });
    alert.present();
  }

  mosdate(n:string,a:string,m:string){
    let alert = this.alertCtrl.create({
      title: "Checando dato",
      subTitle: n+a+m,
      buttons: ["Ok"]
    });
    alert.present();
  }

  listar(){
    this.materias = this.prue.reduce(function(r,a){
      r[a.Nombre] = r[a.Nombre] || [];
      r[a.Nombre].push(a);
      return r;
    },{});

    console.log(this.materias);

  }
  maho(){
    let alert = this.alertCtrl.create({
      title: "Checando hora",
      subTitle: this.ha.toUpperCase(),
      buttons: ["Ok"]
    });
    alert.present();
  }
  toggleSection(i){
    this.prue[i].open = !this.prue[i].open;
    /*this.httpc.get("http://localhost:3000/ctm/"+id)
        .subscribe(
            res => {
                this.ase = res.json();
                console.log(this.ase);
            },
            error => {
                console.log(error);
            }
        );
    let alert = this.alertCtrl.create({
      title: "Materia",
      subTitle: id+" ",
      buttons: ["Ok"]
    });
    alert.present();*/

  }

  cambiarcolor(){
    for (var x=0;x<this.lista.length;x++){
      if(this.lista[x].deporte=="futbol"){
        for(var y=0;y<this.lista[x].lenght;y++){
          document.getElementById("licolor").style.background = this.lista[x].color; 
        }
        console.log(this.lista[x]);
      }
    }
    console.log("hola");
    /*this.lista.forEach(function(dep){
      //console.log(dep.deporte == "futbol");
      if(dep.deporte == "futbol"){
        console.log("existe");
        document.getElementById("licolor").style.background = "green"; 
      }
    });*/
}

checkh(){
  var obj=this.hora.split('-');
  if(obj.length!= 2){
    let alert = this.alertCtrl.create({
      title: "Checando hora",
      subTitle: "El formato de la hora es incorrecto",
      buttons: ["Ok"]
    });
    alert.present();
  }else{
    if(obj[1]<=obj[0] ){
      let alert = this.alertCtrl.create({
        title: "Checando hora",
        subTitle: obj+"La segunda hora no puede ser menor a la primera hora",
        buttons: ["Ok"]
      });
      alert.present();
    }else{
      let alert = this.alertCtrl.create({
        title: "Checando hora",
        subTitle: obj+"Es correcto el formato",
        buttons: ["Ok"]
      });
      alert.present();
    }
  }

}  
check(){
    var a = "Hola,";
    var b = "hoy";
    var c = "es";
    var obd2 = this.dia.split(',');
    var obd = this.dia.split(',').length;
    /*let alert = this.alertCtrl.create({
      title: "Checkbox",
      subTitle: obd+" ",
      buttons: ["Ok"]
    });
    alert.present();*/

    for (var x=0;x<obd2.length;x++){
      this.llamar(a,b,c,obd2[x]);
    }

    let alert = this.alertCtrl.create({
      title: "Exito",
      subTitle: "Almacenado correctamente",
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          console.log('hola');
        }
      }]
    });
    alert.present();
      
  }

  llamar(a:string,b:string,c:string,di:string){
    console.log(a+" "+b+" "+c+" "+di);
    /*let alert = this.alertCtrl.create({
      title: "Checkbox",
      subTitle: a+" "+b+" "+c+" "+di,
      buttons: ["Ok"]
    });
    alert.present();*/ 
  }

  esletra(){
    var l= this.user.substring(0,1);
    var esletter = this.letras.find(function(letra){
      return letra == l;
    });

    if(esletter != undefined){
      console.log("esmaestro");
    }
    else {
      console.log("es alumno");
    }
  }

  mayus(e) {
    e.value = e.value.toUpperCase();
  }
  

  onDaySelect(evt){
  this.fecha = this.selectedDay+"";
  var dia = this.selectedDay.getDate();
  var d = evt.date;
  var mes = this.selectedDay.getMonth()+1;
  var m = evt.month+1;
  var ano = this.selectedDay.getFullYear();
  var y = evt.year;
  var fech = ano+"-"+mes+"-"+dia;
  var f = y+"-"+m+"-"+d;
  var dh = new Date(f);
  console.log(dh.getUTCDay());
  console.log(fech);
  console.log(f);
  console.log(evt);
  //console.log(this.fecha);
  //aqui se suman los dias habiles
  var fecha2 = new Date(fech);
  var dias = 3; // Número de días a agregar
  fecha2.setDate(fecha2.getDate() + dias);
  console.log(fecha2);
  console.info(fecha2.getDate()+"-"+fecha2.getMonth()+"-"+fecha2.getUTCFullYear());
  //aqui se convierte la fecha que selecciona
  var fecha3 = new Date(f);
  console.log(fecha3); 
  //aqui se hacen las comparaciones
  if(dh.getUTCDay() == 6 || dh.getUTCDay() == 7){
    let alert = this.alertCtrl.create({
      title: "¡Error!",
      subTitle: "¡No se pueden escoger los dias sabado o domingo!",
      buttons: ["Ok"]
    });
    alert.present();
  }else if(dh.getUTCDay() == 0){
    let alert = this.alertCtrl.create({
      title: "¡Error!",
      subTitle: "¡No se puede escoger el dia domingo!",
      buttons: ["Ok"]
    });
    alert.present();
  }else if(fecha3 > fecha2){
    let alert = this.alertCtrl.create({
      title: "¡Error!",
      subTitle: "¡EL rango de fechas son de 3 dias!",
      buttons: ["Ok"]
    });
    alert.present();
  }else if(evt.isToday == true){
    let alert = this.alertCtrl.create({
      title: "¡Error!",
      subTitle: "¡No puedes agendar hoy mismo!",
      buttons: ["Ok"]
    });
    alert.present();
  }else if(fecha3 < this.selectedDay){
    let alert = this.alertCtrl.create({
      title: "¡Error!",
      subTitle: "¡No se puede escoger dias anteriores!",
      buttons: ["Ok"]
    });
    alert.present();
  }else{
    let alert = this.alertCtrl.create({
      title: "¡Excelente!",
      subTitle: fecha3+"",
      buttons: ["Ok"]
    });
    alert.present();
  }

  //var fechauno = new Date(this.selectedDay.getFullYear()+"-"+this.selectedDay.getMonth()+"-"+this.selectedDay.getDate());
  //var fechados = new Date(evt.year+"-"+evt.month+"-"+evt.date);
  //var resultado = fechauno.getTime() === fechados.getTime();
  //console.log(resultado);
  //if( (new Date('primera fecha').getTime() > new Date('segunda fecha').getTime()))
    //{
     // "Hacer algo"
   // }


    /*var d = evt.date;
    var m = evt.month;
    var y = evt.year;
    console.log(d);
    var di=this.calendar.currentDate.getDate();
    console.log(di);
    console.log(di+3);
    if(d<di){
      console.log("no se puede escoger dias menores");
      this.botondisable=true;
    }
    else if(d>(di+3)){
      console.log("el rango para la fecha es de 3 dias con anticipacion");
      this.botondisable=true;
    }else{
      console.log("todo bien general");
      if(d<10){
        d="0"+evt.date;
      }else{
        d=evt.date;
      }
      
      if(m<10){
        m="0"+evt.month;   
      }else{
        m=evt.month;
      }
      this.fecha = d +"-"+ m +"-"+ y;
      console.log(this.fecha);
      this.botondisable=false;
      

    }*/
    //console.log(evt.date +"/"+ (evt.month+1) + "/"+ evt.year);
    //console.log(evt.isThisMonth);
  }
  onMonthSelect(evt){
    /*var mac=evt.month + 1;
    console.log(mac);
    var ma = this.calendar.currentDate.getMonth()+1;
    console.log(ma);
    if(mac<ma){
      console.log("el ms es menor");
    }*/

  }


  mostrarocultar(){
    if(this.clic==false){
      //document.getElementById("caja").style.height = "100px";
      document.getElementById("cal").style.display = "block"; 
      this.clic=true;
    }else{
      //document.getElementById("caja").style.height = "0px"; 
      document.getElementById("cal").style.display = "none"; 
      this.clic=false;
    }
}

  irlista(){
    this.navCtrl.setRoot("ListaPage");
  }


}
