import { NavService } from './../../service/NavService';
import { Storage } from '@ionic/storage';
import { TaskService } from './../../service/Task';
import { Component, OnInit } from '@angular/core';

const SALAHWEEKLYCOUNT_KEY = 'salahweeklycount'
const TATAWWUWEEKLYCOUNT_KEY = 'tatawwuweeklycount'
const QURANWEEKLYCOUNT_KEY = 'quranweeklycount'
const ALMATHURAATWEEKLYCOUNT_KEY = 'almathuraatweeklycount'
const ZIYAARAHWEEKLYCOUNT_KEY = 'ziyaarahweeklycount'
const OTHERSWEEKLYCOUNT_KEY = 'othersweeklycount'

@Component({
  selector: 'app-wkly-prayer-eval',
  templateUrl: './wkly-prayer-eval.page.html',
  styleUrls: ['./wkly-prayer-eval.page.scss'],
})
export class WklyPrayerEvalPage implements OnInit {

  constructor(
    public taskService: TaskService,
    private storage: Storage,
    public nav: NavService) { }


  Salah : boolean;
  Tatawwu : boolean;
  Quran : boolean;
  Almathuraat : boolean;
  Ziyaarah : boolean;
  Others : boolean;

  salahcount = this.taskService.SalahCount;
   subhcount= 0; zuhrcount= 0; asrcount= 0; maghribcount= 0; ishacount= 0;
  subhvalue = 0;zuhrvalue = 0; asrvalue = 0; maghribvalue = 0; ishavalue = 0;
   Tatawwucount = this.taskService.TatawwuCount;
  tahajjudcount= 0; duhacount= 0; sawmcount= 0; taobahcount= 0;
   tahajjudvalue = 0; duhavalue = 0; sawmvalue = 0; taobahvalue = 0;
  Qurancount = this.taskService.QuranCount;
   tilaawahcount= 0; hifzcount= 0; revisioncount= 0; tafsircount= 0;
  tilaawahvalue = 0;hifzvalue = 0; revisionvalue = 0; tafsirvalue = 0; 
  Almathuraatcount = this.taskService.AlmathuraatCount;
   morningcount= 0; eveningcount= 0;
  morningvalue = 0; eveningvalue = 0;
   ziyaarahcount = this.taskService.ZiyaarahCount;
  qubuurcount= 0; brothercount= 0; hospitalcount= 0; solihincount= 0;
   qubuurvalue = 0;brothervalue = 0; hospitalvalue = 0; solihinvalue = 0; 
  otherscount = this.taskService.OthersCount;
  iftarcount= 0; bookcount= 0; riyaadahcount= 0; halqahcount= 0; sadaqahcount= 0;
   fardiyyahcount= 0; familycount= 0; remembrancecount= 0; rabitohcount= 0;
  iftarvalue = 0; bookvalue = 0; riyaadahvalue = 0; halqahvalue = 0; sadaqahvalue = 0;
   fardiyyahvalue = 0;familyvalue = 0; remembrancevalue = 0; rabitohvalue = 0;

  ngOnInit() {
    this.updateSalah();
    this.updateTatawwu();
    this.updateQuran();
    this.updateAlmathuraat();
    this.updateZiyaarah();
    this.updateOthers();
    this.updatevisibility();
  }

  updateSalah(){
    this.storage.get(SALAHWEEKLYCOUNT_KEY).then(data=>{
      if(data){
      data.filter(count=>{
        switch (count.name) {
          case 'Subh':
              this.subhcount = count.IsdoneCount;
              this.subhvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Zuhr':
              this.zuhrcount = count.IsdoneCount;
              this.zuhrvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Asr':
              this.asrcount = count.IsdoneCount;
              this.asrvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Maghrib':
              this.maghribcount = count.IsdoneCount;
              this.maghribvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Ishaa':
              this.ishacount = count.IsdoneCount;
              this.ishavalue = (count.IsdoneCount/7)* 100;
          break;
        }
    })
  }
  }) 
  }

  updateTatawwu(){
    this.storage.get(TATAWWUWEEKLYCOUNT_KEY).then(data=>{
      if(data){
      data.filter(count=>{
        switch (count.name) {
          case 'Tahajjud':
              this.tahajjudcount = count.IsdoneCount;
              this.tahajjudvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Duha':
              this.duhacount = count.IsdoneCount;
              this.duhavalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Sawm':
              this.sawmcount = count.IsdoneCount;
              this.sawmvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Taobah':
              this.taobahcount = count.IsdoneCount;
              this.taobahvalue = (count.IsdoneCount/7)* 100;
          break;
        }
    })
  }
  }) 
  }

  updateQuran(){
    this.storage.get(QURANWEEKLYCOUNT_KEY).then(data=>{
      if(data){
      data.filter(count=>{
        switch (count.name) {
          case 'Tilaawah':
              this.tilaawahcount = count.IsdoneCount;
              this.tilaawahvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Hifz':
              this.hifzcount = count.IsdoneCount;
              this.hifzvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Revision':
              this.revisioncount = count.IsdoneCount;
              this.revisionvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Tafsir':
              this.tafsircount = count.IsdoneCount;
              this.tafsirvalue = (count.IsdoneCount/7)* 100;
          break;
        }
    })
  }
  }) 
  }

  updateAlmathuraat(){
    this.storage.get(ALMATHURAATWEEKLYCOUNT_KEY).then(data=>{
      if(data){
      data.filter(count=>{
        switch (count.name) {
          case 'Morning':
              this.morningcount = count.IsdoneCount;
              this.morningvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Evening':
              this.eveningcount = count.IsdoneCount;
              this.eveningvalue = (count.IsdoneCount/7)* 100;
          break;
        }
    })
  }
  }) 
  }

  updateZiyaarah(){
    this.storage.get(ZIYAARAHWEEKLYCOUNT_KEY).then(data=>{
      if(data){
      data.filter(count=>{
        switch (count.name) {
          case 'Qubuur':
              this.qubuurcount = count.IsdoneCount;
              this.qubuurvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Brother':
              this.brothercount = count.IsdoneCount;
              this.brothervalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Hospital':
              this.hospitalcount = count.IsdoneCount;
              this.hospitalvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Solihin':
              this.solihincount = count.IsdoneCount;
              this.solihinvalue = (count.IsdoneCount/7)* 100;
          break;
        }
    })
  }
  }) 
  }

  updateOthers(){
    this.storage.get(OTHERSWEEKLYCOUNT_KEY).then(data=>{
      if(data){
      data.filter(count=>{
        switch (count.name) {
          case 'Group Iftar':
              this.iftarcount = count.IsdoneCount;
              this.iftarvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Book Reading':
              this.bookcount = count.IsdoneCount;
              this.bookvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Riyaadah':
              this.riyaadahcount = count.IsdoneCount;
              this.riyaadahvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Halqah':
              this.halqahcount = count.IsdoneCount;
              this.halqahvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Sadaqah':
              this.sadaqahcount = count.IsdoneCount;
              this.sadaqahvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Fardiyyah':
              this.fardiyyahcount = count.IsdoneCount;
              this.fardiyyahvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Family Sitting':
              this.familycount = count.IsdoneCount;
              this.familyvalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Remembrance':
              this.remembrancecount = count.IsdoneCount;
              this.remembrancevalue = (count.IsdoneCount/7)* 100;
          break;
          case 'Rabitoh':
              this.rabitohcount = count.IsdoneCount;
              this.rabitohvalue = (count.IsdoneCount/7)* 100;
          break;
        }
    })
  }
  }) 
  }

  updatevisibility(){
    let vis = this.nav.get('name');
    if (vis == "Salah") {
      this.Salah = true;
      this.Tatawwu = false;
      this.Quran = false;
      this.Almathuraat = false;
      this.Ziyaarah = false;
      this.Others = false;
    }else if (vis == "Tatawwu") {
      this.Salah = false;
      this.Tatawwu = true;
      this.Quran = false;
      this.Almathuraat = false;
      this.Ziyaarah = false;
      this.Others = false;
    }else if (vis == "Quran") {
      this.Salah = false;
      this.Tatawwu = false;
      this.Quran = true;
      this.Almathuraat = false;
      this.Ziyaarah = false;
      this.Others = false;
    }else if (vis == "Almathuraat") {
      this.Salah = false;
      this.Tatawwu = false;
      this.Quran = false;
      this.Almathuraat = true;
      this.Ziyaarah = false;
      this.Others = false;
    }else if (vis == "Ziyaarah") {
      this.Salah = false;
      this.Tatawwu = false;
      this.Quran = false;
      this.Almathuraat = false;
      this.Ziyaarah = true;
      this.Others = false;
    }else if (vis == "Others") {
      this.Salah = false;
      this.Tatawwu = false;
      this.Quran = false;
      this.Almathuraat = false;
      this.Ziyaarah = false;
      this.Others = true;
    }
  }

}
