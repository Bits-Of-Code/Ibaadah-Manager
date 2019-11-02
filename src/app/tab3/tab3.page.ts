import { NavService } from './../../service/NavService';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskService } from 'src/service/Task';
import { ActivatedRoute } from '@angular/router';

const WEEKLYCOUNT_KEY = 'weeklycount'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
      constructor(
        public navCtrl: NavController,
        public taskService: TaskService,
        private storage: Storage,
        public route: ActivatedRoute,
        public nav: NavService){

      }

      Salah = this.taskService.Salah;
      Tatawwu = this.taskService.Tatawwu;
      Quran = this.taskService.Quran;
      AlMathuraat = this.taskService.AlMathuraat;
      Ziyaarah= this.taskService.Ziyaarah;
      Others= this.taskService.Others;

ionViewDidEnter(){
  
}

  gotowklyprayereval(name){
    this.nav.push('wkly-prayer-eval',{'name': name});
  }
  gotomnthlyeval(name){
    this.nav.push('monthly-evaluation',{'name': name});
  }
  gotofromstart(name){
    this.nav.push('fromstart',{'name': name});
  }
}
