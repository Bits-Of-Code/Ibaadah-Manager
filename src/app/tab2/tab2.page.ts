import { StorageService } from './../../service/storage';
import { Storage } from '@ionic/storage';
import { TaskService } from './../../service/Task';
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

const SALAH_KEY = 'salah'
const TATAWWU_KEY = 'tatawwu'
const QURAN_KEY = 'quran'
const ALMATHURAAT_KEY = 'almathuraat'
const ZIYAARAH_KEY = 'ziyaarah'
const OTHERS_KEY = 'others'
const COUNT_KEY="count"

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(public TaskService: TaskService,
    public storage: Storage,
    public storageService:StorageService,
    public loadCtrl: LoadingController){

  }

  count = this.TaskService.dailycount;

  counter : number;
  counter2 : number;
  counter3 : number;
  counter4 : number;
  counter5 : number;
  counter6 : number;

  salahprogress : string;
  tatawwuprogress: string;
  quranprogress: string;
  almathuraatprogress: string;
  ziyaarahprogress: string;
  othersprogress: string;


  missedsalah: any[] = [];
  missedtatawwu: any[] = [];
  missedquran: any[] = [];
  missedalmathuraat: any[] = [];
  missedziyaarah: any[] = [];
  missedothers: any[] = [];
  
  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.count.filter(count=>{
      switch (count.id) {
          case 1:
          this.counter = (count.IsdoneCount / 5) * 1;
          break;
          case 2:
            this.counter2 = (count.IsdoneCount / 4) * 1;
          break;
          case 3:
            this.counter3 = (count.IsdoneCount / 4) * 1;
          break;
          case 4:
            this.counter4 = (count.IsdoneCount / 2) * 1;
          break;
          case 5:
            this.counter5 = (count.IsdoneCount / 4) * 1;
          break;
          case 6:
            this.counter6 = (count.IsdoneCount / 9) * 1;
          break;
      }
    })

    if(this.counter <= (1/3)){
      this.salahprogress = "danger"
    }else if(this.counter > (1/3) && this.counter <= (2/3)){
      this.salahprogress = "warning"
    }else if(this.counter == 1 ){
      this.salahprogress = "success"
    }
    if(this.counter2 <= (1/3)){
     this.tatawwuprogress = "danger"
   }else if(this.counter2 > (1/3) && this.counter2 <= (2/3)){
     this.tatawwuprogress = "warning"
   }else if(this.counter2 == 1 ){
     this.tatawwuprogress = "success"
   }
   if(this.counter3 <= (1/3)){
     this.quranprogress = "danger"
   }else if(this.counter3 > (1/3) && this.counter3 <= (2/3)){
     this.quranprogress = "warning"
   }else if(this.counter3 == 1 ){
     this.quranprogress = "success"
   }
   if(this.counter4 <= (1/3)){
     this.almathuraatprogress = "danger"
   }else if(this.counter4 > (1/3) && this.counter4 <= (2/3)){
     this.almathuraatprogress = "warning"
   }else if(this.counter4 == 1 ){
     this.almathuraatprogress = "success"
   }
   if(this.counter5 <= (1/3)){
     this.ziyaarahprogress = "danger"
   }else if(this.counter5 > (1/3) && this.counter5 <= (2/3)){
     this.ziyaarahprogress = "warning"
   }else if(this.counter5 == 1 ){
     this.ziyaarahprogress = "success"
   }
   if(this.counter6 <= (1/3)){
     this.othersprogress = "danger"
   }else if(this.counter6 > (1/3) && this.counter6 <= (2/3)){
     this.othersprogress = "warning"
   }else if(this.counter6 == 1 ){
     this.othersprogress = "success"
   }

    this.missedupdater()
 
    loading.dismiss();
  }
  ionViewDidEnter(){
    this.presentLoading();

    this.storage.get(COUNT_KEY).then(data=>{
      if(data){
        this.count = data;
      }else{
        this.count.filter(count=>{
          count.IsdoneCount = 0;
        })
      }
    })
  
  }
  
  missedupdater(){
    this.missedsalah.splice(0,)
    this.missedtatawwu.splice(0,)
    this.missedquran.splice(0,)
    this.missedalmathuraat.splice(0,)
    this.missedziyaarah.splice(0,)
    this.missedothers.splice(0,)


    this.storage.get(SALAH_KEY).then(data=>{
      if(data){
        data.map(task => { 
              if(task.IsDone != true){
                  this.missedsalah.push(task.name)  
           }}); 
      }else{
        this.TaskService.Salah.map(task => { 
          if(task.IsDone != true){
              this.missedsalah.push(task.name)  
       }}); 
      }  
    })
    this.storage.get(QURAN_KEY).then(data=>{
      if(data){
        data.map(task => { 
          if(task.IsDone != true){
              this.missedquran.push(task.name)  
       }}); 
      }else{
        this.TaskService.Quran.map(task => { 
          if(task.IsDone != true){
              this.missedquran.push(task.name)  
       }}); 
      }  
    })
    this.storage.get(TATAWWU_KEY).then(data=>{
      if(data){
        data.map(task => { 
          if(task.IsDone != true){
              this.missedtatawwu.push(task.name)  
       }}); 
      }else{
        this.TaskService.Tatawwu.map(task => { 
          if(task.IsDone != true){
              this.missedtatawwu.push(task.name)  
       }}); 
      }  
    })
    this.storage.get(ALMATHURAAT_KEY).then(data=>{
      if(data){
        data.map(task => { 
          if(task.IsDone != true){
              this.missedalmathuraat.push(task.name)  
       }}); 
      }else{
        this.TaskService.AlMathuraat.map(task => { 
          if(task.IsDone != true){
              this.missedalmathuraat.push(task.name)  
       }}); 
      }  
    })
    this.storage.get(ZIYAARAH_KEY).then(data=>{
      if(data){
        data.map(task => { 
          if(task.IsDone != true){
              this.missedziyaarah.push(task.name)  
       }}); 
      }else{
        this.TaskService.Ziyaarah.map(task => { 
          if(task.IsDone != true){
              this.missedziyaarah.push(task.name)  
       }}); 
      }  
    })
    this.storage.get(OTHERS_KEY).then(data=>{
      if(data){
        data.map(task => { 
          if(task.IsDone != true){
              this.missedothers.push(task.name)  
       }}); 
      }else{
        this.TaskService.Others.map(task => { 
          if(task.IsDone != true){
              this.missedothers.push(task.name)  
       }}); 
      }  
    })

}

    
    
  }    
