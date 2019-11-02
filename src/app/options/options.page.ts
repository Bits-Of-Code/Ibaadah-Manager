import { TaskService } from './../../service/Task';
import { StorageService } from './../../service/storage';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor(public storage: Storage, public storageService:StorageService, public TaskService:TaskService,
              public alert: AlertController, public toast: ToastController) { }

  ngOnInit() {
  }

async confirmclear() {
  const alert = await this.alert.create({
    header: 'Do you really want to clear all records?',
    message: 'All records will be lost and cannot be recovered.',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {

        }
      }, {
        text: 'Yes',
        cssClass: 'danger',
        handler: () => {
          this.storageService.clear();
          this.resetweeklycount();
          this.presentToast();
        }
      }
    ]
  });

  await alert.present();
}

async presentToast() {
  const toast = await this.toast.create({
    message: 'All records have been cleared.',
    duration: 2000
  });
  toast.present();
}

  resetweeklycount(){
    this.TaskService.SalahCount.filter(count=>{
        count.IsdoneCount == 0;  
    }) 
    this.TaskService.TatawwuCount.filter(count=>{
      count.IsdoneCount == 0;  
    }) 
    this.TaskService.QuranCount.filter(count=>{
      count.IsdoneCount == 0;  
    }) 
    this.TaskService.AlmathuraatCount.filter(count=>{
      count.IsdoneCount == 0;  
    }) 
    this.TaskService.ZiyaarahCount.filter(count=>{
      count.IsdoneCount == 0;  
    }) 
    this.TaskService.OthersCount.filter(count=>{
      count.IsdoneCount == 0;  
    }) 
  }
}
