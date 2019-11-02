import { Day } from './../../model/daymodel';
import { IbaadahTotalcount } from './../../model/totalcount';
import { ibaadahTotalService } from './../../service/Total';
import { Ibaadahcount } from './../../model/ibaadahcount';
import { Ibaadahmonthly } from './../../model/ibaadahMonthly';
import { ibaadahMonthlyService } from './../../service/ibaadahmonthly';
import { ibaadahweeklyService } from './../../service/ibaadahweekly';
import { Storage } from '@ionic/storage';
import { TaskService } from './../../service/Task';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Ibaadahweekly } from 'src/model/IbaadahWeekly';

const SALAH_KEY = 'salah'
const TATAWWU_KEY = 'tatawwu'
const QURAN_KEY = 'quran'
const ALMATHURAAT_KEY = 'almathuraat'
const ZIYAARAH_KEY = 'ziyaarah'
const OTHERS_KEY = 'others'
const COUNT_KEY = 'count'
const SALAHWEEKLYCOUNT_KEY = 'salahweeklycount'
const TATAWWUWEEKLYCOUNT_KEY = 'tatawwuweeklycount'
const QURANWEEKLYCOUNT_KEY = 'quranweeklycount'
const ALMATHURAATWEEKLYCOUNT_KEY = 'almathuraatweeklycount'
const ZIYAARAHWEEKLYCOUNT_KEY = 'ziyaarahweeklycount'
const OTHERSWEEKLYCOUNT_KEY = 'othersweeklycount'
const TEMPSALAHWEEKLY_KEY = 'tempsalahweekly'
const TEMPTATAWWUWEEKLY_KEY = 'temptatawwuweekly'
const TEMPQURANWEEKLY_KEY = 'tempquranweekly'
const TEMPALMATHURAATWEEKLY_KEY = 'tempalmathuraatweekly'
const TEMPZIYAARAHWEEKLY_KEY = 'tempziyaarahweekly'
const TEMPOTHERSWEEKLY_KEY = 'tempothersweekly'
const MONTHLYCOUNT_KEY = 'monthlycount'
const TOTALCOUNT_KEY = 'totalcount'
const WEEK_KEY = 'week'
const DAY_KEY = 'day'
var end;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  constructor(public navCtrl: NavController, public taskService: TaskService, public storage: Storage,
              public ibaadah: ibaadahweeklyService, public monthservice: ibaadahMonthlyService,
              public total: ibaadahTotalService, private plt: Platform) {
                                      this.dayend();
                                      this.plt.ready().then(()=>{
                                        this.resetTimeout();
                                      })
                }
 
    dayend(){
    var now = new Date();
    var timeTill12 = <any> new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - <any> now;
    if (timeTill12 < 0) {
      timeTill12 += 86400000
      // 86400000;
    }
    end = setTimeout(
      ()=>{
        //function to execute at 12:00 am
        console.log("Function Works!!!!!", timeTill12);
        this.endday();
        this.dayend();
      },
      timeTill12
       );   
  }

  resetTimeout(){
    // clearTimeout(end);
    (function(no = 5){
      var count = 1;
    if(count < no){
      console.log("workssssssssss");
      // this.endday();
    }
  })(0);
    // this.dayend();
  }


  getpassedDays(){
    this.storage.get("last_open_day").then(date=>{
      if(date){
       let lastdate = date;
       var dt = new Date();
      var now = new Date(dt.getUTCDate() + '/' + (dt.getUTCMonth() + 1) + '/' + dt.getUTCFullYear());
      var timeDiff = now.getTime() - lastdate.getTime();
      var daysdiff = timeDiff / (1000 * 3600 * 24);
      console.log(now);
      }
    })
  }

  ionViewDidEnter(){
    this.getpassedDays();
    this.getday();
    this.storage.get(COUNT_KEY).then(data=>{
      if(data){
        this.count = data;
      }else{
        this.count.filter(count=>{
          count.IsdoneCount = 0;
        })
      }
    })
    this.storage.get(SALAH_KEY).then(data=>{
      if(data){
        this.Salah = data;
      }else{
        this.clicked = false;
        this.Salah.filter(task=>{
          task.IsDone = false;
        })
      }  
    })
    this.storage.get(QURAN_KEY).then(data=>{
      if(data){
        this.Quran = data;
      }else{
        this.clicked3 = false;
        this.Quran.filter(task=>{
          task.IsDone = false;
        })
      }  
    })
    this.storage.get(TATAWWU_KEY).then(data=>{
      if(data){
        this.Tatawwu = data;
      }else{
        this.clicked2 = false;
        this.Tatawwu.filter(task=>{
          task.IsDone = false;
        })
      }  
    })
    this.storage.get(ALMATHURAAT_KEY).then(data=>{
      if(data){
        this.AlMathuraat = data;
      }else{
        this.clicked4 = false;
        this.AlMathuraat.filter(task=>{
          task.IsDone = false;
        })
      }  
    })
    this.storage.get(ZIYAARAH_KEY).then(data=>{
      if(data){
        this.Ziyaarah = data;
      }else{
        this.clicked5 = false;
        this.Ziyaarah.filter(task=>{
          task.IsDone = false;
        })
      }  
    })
    this.storage.get(OTHERS_KEY).then(data=>{
      if(data){
        this.Others = data;
      }else{
        this.clicked6 = false;
        this.Others.filter(task=>{
          task.IsDone = false;
        })
      }  
    })
  this.storage.get(TEMPSALAHWEEKLY_KEY).then(data=>{
    if(data){
      this.salahweekly = data;
    }else{
      this.salahweekly = [];
    }
  })
  this.storage.get(TEMPTATAWWUWEEKLY_KEY).then(data=>{
    if(data){
      this.tatawwuweekly = data;
    }else{
      this.tatawwuweekly = [];
    }
  })
  this.storage.get(TEMPQURANWEEKLY_KEY).then(data=>{
    if(data){
      this.quranweekly = data;
    }else{
      this.quranweekly = [];
    }
  })
  this.storage.get(TEMPALMATHURAATWEEKLY_KEY).then(data=>{
    if(data){
      this.almathuraatweekly = data;
    }else{
      this.almathuraatweekly = [];
    }
  })
  this.storage.get(TEMPZIYAARAHWEEKLY_KEY).then(data=>{
    if(data){
      this.ziyaarahweekly = data;
    }else{
      this.ziyaarahweekly = [];
    }
  })
  this.storage.get(TEMPOTHERSWEEKLY_KEY).then(data=>{
    if(data){
      this.othersweekly = data;
    }else{
      this.othersweekly = [];
    }
  })
this.storage.get(TOTALCOUNT_KEY).then(count=>{
  if(count){
    this.total.monthlycount = count;
  }else{
    this.total.monthlycount = [];
  }
})
    
    this.updatesalahservice();
    this.updatetatawwuservice();
    this.updatequranservice();
    this.updatealmathuraatservice();
    this.updateziyaarahservice();
    this.updateothersservice();
    this.getweek();
  }

  day: number = 1;
  week: number = 1;

  Salah = this.taskService.Salah;
  Tatawwu = this.taskService.Tatawwu;
  Quran = this.taskService.Quran;
  AlMathuraat = this.taskService.AlMathuraat;
  Ziyaarah= this.taskService.Ziyaarah;
  Others= this.taskService.Others;

  count = this.taskService.dailycount; 
  salahcount = this.taskService.SalahCount;
  tatawwucount = this.taskService.TatawwuCount;
  qurancount = this.taskService.QuranCount;
  almathuraatcount = this.taskService.AlmathuraatCount;
  ziyaarahcount = this.taskService.ZiyaarahCount;
  otherscount = this.taskService.OthersCount;

  salahweekly = this.ibaadah.salahWeekly;
  tatawwuweekly = this.ibaadah.tatawwuWeekly;
  quranweekly = this.ibaadah.quranWeekly;
  almathuraatweekly = this.ibaadah.almathuraatWeekly;
  ziyaarahweekly = this.ibaadah.ziyaarahWeekly;
  othersweekly = this.ibaadah.othersWeekly;
  
  clicked: boolean = false;
  clicked2: boolean = false;
  clicked3: boolean = false;
  clicked4: boolean = false;
  clicked5: boolean = false;
  clicked6: boolean = false;


getday(){
  this.storage.get(DAY_KEY).then(day=>{
    if(day){
      this.day = day;
    }
  })
}

  resetday(){
    let day = 0;
    this.storage.set('day', day)
  }

  checkSalah(name: string, id: number){
    this.Salah.filter(task => {
      if(task.name == name && task.IsDone != true){
        task.IsDone = true;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount++;  
          }
        }) 

        this.salahcount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount++;  
          }
        }) 

        this.storage.set(SALAHWEEKLYCOUNT_KEY, this.salahcount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(SALAH_KEY, this.Salah)          
      }else if(task.name == name && task.IsDone == true){           
        task.IsDone = false;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount--;
          }
        })

        this.salahcount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount--;  
          }
        }) 

        this.storage.set(SALAHWEEKLYCOUNT_KEY, this.salahcount);
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(SALAH_KEY, this.Salah)
      }
    });
  }

  checkTatawwu(name: string, id:number){
    this.Tatawwu.filter(task => {
      if(task.name == name && task.IsDone != true){
        task.IsDone = true;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount++;  
          }
        }) 

        this.tatawwucount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount++;  
          }
        }) 

        this.storage.set(TATAWWUWEEKLYCOUNT_KEY, this.tatawwucount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(TATAWWU_KEY, this.Tatawwu)          
      }else if(task.name == name && task.IsDone == true){           
        task.IsDone = false;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount--;
          }
        })

        this.tatawwucount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount--;  
          }
        }) 

        this.storage.set(TATAWWUWEEKLYCOUNT_KEY, this.tatawwucount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(TATAWWU_KEY, this.Tatawwu) 
      }
    });
  }
 
  checkQuran(name: string, id:number){
    this.Quran.filter(task => {
      if(task.name == name && task.IsDone != true){
        task.IsDone = true;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount++;  
          }
        }) 

        this.qurancount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount++;  
          }
        }) 

        this.storage.set(QURANWEEKLYCOUNT_KEY, this.qurancount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(QURAN_KEY, this.Quran)          
      }else if(task.name == name && task.IsDone == true){           
        task.IsDone = false;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount--;
          }
        })

        this.qurancount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount--;  
          }
        }) 

        this.storage.set(QURANWEEKLYCOUNT_KEY, this.qurancount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(QURAN_KEY, this.Quran) 
      }
    });
  }
  
  checkAlMathuraat(name: string, id: number){
    this.AlMathuraat.filter(task => {
      if(task.name == name && task.IsDone != true){
        task.IsDone = true;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount++;  
          }
        }) 

        this.almathuraatcount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount++;  
          }
        }) 

        this.storage.set(ALMATHURAATWEEKLYCOUNT_KEY, this.almathuraatcount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(ALMATHURAAT_KEY, this.AlMathuraat)          
      }else if(task.name == name && task.IsDone == true){           
        task.IsDone = false;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount--;
          }
        })

        this.almathuraatcount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount--;  
          }
        }) 

        this.storage.set(ALMATHURAATWEEKLYCOUNT_KEY, this.almathuraatcount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(ALMATHURAAT_KEY, this.AlMathuraat) 
      }
    });    
  }
 
  checkZiyaarah(name: string, id: number){
    this.Ziyaarah.filter(task => {
      if(task.name == name && task.IsDone != true){
        task.IsDone = true;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount++;  
          }
        }) 

        this.ziyaarahcount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount++;  
          }
        }) 

        this.storage.set(ZIYAARAHWEEKLYCOUNT_KEY, this.ziyaarahcount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(ZIYAARAH_KEY, this.Ziyaarah)          
      }else if(task.name == name && task.IsDone == true){           
        task.IsDone = false;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount--;
          }
        })

        this.storage.set(ZIYAARAHWEEKLYCOUNT_KEY, this.ziyaarahcount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(ZIYAARAH_KEY, this.Ziyaarah) 
      }
    });            
  }
  
  checkOthers(name: string, id: number){
    this.Others.filter(task => {
      if(task.name == name && task.IsDone != true){
        task.IsDone = true;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount++;  
          }
        }) 

        this.otherscount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount++;  
          }
        }) 

        this.storage.set(OTHERSWEEKLYCOUNT_KEY, this.otherscount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(OTHERS_KEY, this.Others)          
      }else if(task.name == name && task.IsDone == true){           
        task.IsDone = false;
        this.count.filter(count=>{
          if(count.id == id){
            count.IsdoneCount--;
          }
        })

        this.otherscount.filter(count=>{
          if(count.name == name){
            count.IsdoneCount--;  
          }
        }) 

        this.storage.set(OTHERSWEEKLYCOUNT_KEY, this.otherscount)
        this.storage.set(COUNT_KEY, this.count)
        this.storage.set(OTHERS_KEY, this.Others) 
      }
    });                  
  }
 
    initexpand(){
      if(this.clicked == false){
          this.clicked = true;
          this.clicked2 = false;
          this.clicked3 = false;
          this.clicked4 = false;
          this.clicked5 = false;
          this.clicked6 = false;
      }else{
        this.clicked = false;
      }
    }
    initexpand2(){
      if(this.clicked2 == false){
          this.clicked2 = true;
          this.clicked = false;
          this.clicked3 = false;
          this.clicked4 = false;
          this.clicked5 = false;
          this.clicked6 = false;
      }else{
        this.clicked2 = false;
      }
    }
    initexpand3(){
      if(this.clicked3 == false){
          this.clicked3 = true;
          this.clicked2 = false;
          this.clicked = false;
          this.clicked4 = false;
          this.clicked5 = false;
          this.clicked6 = false;
      }else{
        this.clicked3 = false;
      }
    }
    initexpand4(){
      if(this.clicked4 == false){
          this.clicked4 = true;
          this.clicked2 = false;
          this.clicked3 = false;
          this.clicked = false;
          this.clicked5 = false;
          this.clicked6 = false;
      }else{
        this.clicked4 = false;
      }
    }
    initexpand5(){
      if(this.clicked5 == false){
          this.clicked5 = true;
          this.clicked2 = false;
          this.clicked3 = false;
          this.clicked4 = false;
          this.clicked = false;
          this.clicked6 = false;
      }else{
        this.clicked5 = false;
      }
    }
    initexpand6(){
      if(this.clicked6 == false){
          this.clicked6 = true;
          this.clicked2 = false;
          this.clicked3 = false;
          this.clicked4 = false;
          this.clicked5 = false;
          this.clicked = false;
      }else{
        this.clicked6 = false;
      }
    }

    updatesalahservice(){
      this.storage.get(SALAHWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          this.salahcount = data;
        }
      })
    }
    updatetatawwuservice(){
      this.storage.get(TATAWWUWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          this.tatawwucount = data;
        }
      })
    }
    updatequranservice(){
      this.storage.get(QURANWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          this.qurancount = data;
        }
      })
    }
    updatealmathuraatservice(){
      this.storage.get(ALMATHURAATWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          this.almathuraatcount = data;
        }
      })
    }
    updateziyaarahservice(){
      this.storage.get(ZIYAARAHWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          this.ziyaarahcount = data;
        }
      })
    }
    updateothersservice(){
      this.storage.get(OTHERSWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          this.otherscount = data;
        }
      })
    }

    tester(){
      this.resetTimeout
      // var dt = new Date();
      // this.storage.set("last_open_day",new Date(dt.getUTCDate() + '/' + (dt.getUTCMonth() + 1) + '/' + dt.getUTCFullYear()));
    }

    setday(){
      this.day++;
      this.storage.set(DAY_KEY, this.day);
      var dt = new Date();
      this.storage.set("last_open_day",new Date(dt.getUTCDate() + '/' + (dt.getUTCMonth() + 1) + '/' + dt.getUTCFullYear()));
    }

    endday(){//day end test
    this.setday();
    this.updatesalahweekly();
    this.updatetatawwuweekly();
    this.updatequranweekly();
    this.updatealmathuraatweekly();
    this.updateziyaarahweekly();
    this.updateothersweekly();
    this.resetibaadahdaily();
    this.resetweeklycount();
    this.resetcount();
    this.doweek();
    }
   
    getweek(){
      this.storage.get(WEEK_KEY).then(data =>{
        if(data){
          this.week = data;
        }else{
          this.week = 1;
        }
      })
    }
    
    updateweek(){//reset weekly array   
      this.storage.remove(this.ibaadah.salahkey);
      this.storage.remove(TEMPSALAHWEEKLY_KEY);
      this.salahweekly = [];
      this.storage.remove(this.ibaadah.tatawwukey);
      this.storage.remove(TEMPTATAWWUWEEKLY_KEY);
      this.tatawwuweekly = [];
      this.storage.remove(this.ibaadah.qurankey);
      this.storage.remove(TEMPQURANWEEKLY_KEY);
      this.quranweekly = [];
      this.storage.remove(this.ibaadah.almathuraatkey);
      this.storage.remove(TEMPALMATHURAATWEEKLY_KEY);
      this.almathuraatweekly = [];
      this.storage.remove(this.ibaadah.ziyaarahkey);
      this.storage.remove(TEMPZIYAARAHWEEKLY_KEY);
      this.ziyaarahweekly = [];
      this.storage.remove(this.ibaadah.otherskey);
      this.storage.remove(TEMPOTHERSWEEKLY_KEY);
      this.othersweekly = [];
     
    }

    doweek(){
      this.storage.get(this.ibaadah.salahkey).then(data=>{
        if(data){
          var now = new Date();
          if(now.getDay() == 0 || data.length == 7){
            console.log("today is yhe day")
            this.testweekend();
            setTimeout(()=>{this.testmonthend()},1000);    
          }
        }else{
          var now = new Date();
          if(now.getDay() == 0){
            console.log("today is yhe day")
            this.testweekend();
            setTimeout(()=>{this.testmonthend()},1000);  
          }
        }
      })
    }

    updatesalahweekly(){
      this.storage.get(SALAH_KEY).then(data=>{
        if(data){
          var now = new Date();
          let salahweekly = new Ibaadahweekly(now.getDate(), this.week, data);
          this.salahweekly.push(salahweekly);
          this.storage.set(TEMPSALAHWEEKLY_KEY, this.salahweekly);
          this.ibaadah.setsalahweekly(this.salahweekly);
        }else{
          var now = new Date();
          let salahweekly = new Ibaadahweekly(now.getDate(), this.week, this.Salah);
          this.salahweekly.push(salahweekly);
          this.storage.set(TEMPSALAHWEEKLY_KEY, this.salahweekly);
          this.ibaadah.setsalahweekly(this.salahweekly);
        }
      })
     }

     updatesalahmonthly(){
      this.storage.get(this.ibaadah.salahkey).then(data=>{  
          if(data){ 
          console.log(this.week);
          let salahmonthly = new Ibaadahmonthly(this.week,data);
          this.monthservice.salahmonthly.push(salahmonthly);
          this.monthservice.setsalahmonthly(this.monthservice.salahmonthly);
          this.testmonthend();
        }else{
          let salahmonthly = new Ibaadahmonthly(this.week,data);
          this.monthservice.salahmonthly.push(salahmonthly);
          this.monthservice.setsalahmonthly(this.monthservice.salahmonthly);
          this.testmonthend();
        }
      })
     }

     updatetatawwuweekly(){
      this.storage.get(TATAWWU_KEY).then(data=>{
        if(data){
          var now = new Date();
          let tatawwuweekly = new Ibaadahweekly(now.getDate(), this.week, data);
          this.tatawwuweekly.push(tatawwuweekly);
          this.storage.set(TEMPTATAWWUWEEKLY_KEY, this.tatawwuweekly);
          this.ibaadah.settatawwuweekly(this.tatawwuweekly);
        }else{
          var now = new Date();
          let tatawwuweekly = new Ibaadahweekly(now.getDate(), this.week, this.Tatawwu);
          this.tatawwuweekly.push(tatawwuweekly);
          this.storage.set(TEMPTATAWWUWEEKLY_KEY, this.tatawwuweekly);
          this.ibaadah.settatawwuweekly(this.tatawwuweekly);
        }
      })
     }

     updatetatawwumonthly(){
      this.storage.get(this.ibaadah.tatawwukey).then(data=>{  
          if(data){ 
          let tatawwumonthly = new Ibaadahmonthly(this.week,data);
          this.monthservice.tatawwumonthly.push(tatawwumonthly);
          this.monthservice.settatawwumonthly(this.monthservice.tatawwumonthly);
        }else{
          let tatawwumonthly = new Ibaadahmonthly(this.week,this.Tatawwu);
          this.monthservice.tatawwumonthly.push(tatawwumonthly);
          this.monthservice.settatawwumonthly(this.monthservice.tatawwumonthly);
        }
      })
     }

     updatequranweekly(){
      this.storage.get(QURAN_KEY).then(data=>{
        if(data){
          var now = new Date();
          let quranweekly = new Ibaadahweekly(now.getDate(), this.week, data);
          this.quranweekly.push(quranweekly);
          this.storage.set(TEMPQURANWEEKLY_KEY, this.quranweekly);
          this.ibaadah.setquranweekly(this.quranweekly);
        }else{
          var now = new Date();
          let quranweekly = new Ibaadahweekly(now.getDate(), this.week, this.Quran);
          this.quranweekly.push(quranweekly);
          this.storage.set(TEMPQURANWEEKLY_KEY, this.quranweekly);
          this.ibaadah.setquranweekly(this.quranweekly);
        }
      })
     }

     updatequranmonthly(){
      this.storage.get(this.ibaadah.qurankey).then(data=>{  
          if(data){ 
          let quranmonthly = new Ibaadahmonthly(this.week,data);
          this.monthservice.quranmonthly.push(quranmonthly);
          this.monthservice.setquranmonthly(this.monthservice.quranmonthly);
        }else{
          let quranmonthly = new Ibaadahmonthly(this.week,this.Quran);
          this.monthservice.quranmonthly.push(quranmonthly);
          this.monthservice.setquranmonthly(this.monthservice.quranmonthly);
        }
      })
     }
     
     updatealmathuraatweekly(){
      this.storage.get(ALMATHURAAT_KEY).then(data=>{
        if(data){
          var now = new Date();
          let almathuraatweekly = new Ibaadahweekly(now.getDate(), this.week, data);
          this.almathuraatweekly.push(almathuraatweekly);
          this.storage.set(TEMPALMATHURAATWEEKLY_KEY, this.almathuraatweekly);
          this.ibaadah.setalmathuraatweekly(this.almathuraatweekly);
        }else{
          var now = new Date();
          let almathuraatweekly = new Ibaadahweekly(now.getDate(), this.week, this.AlMathuraat);
          this.almathuraatweekly.push(almathuraatweekly);
          this.storage.set(TEMPALMATHURAATWEEKLY_KEY, this.almathuraatweekly);
          this.ibaadah.setalmathuraatweekly(this.almathuraatweekly);
        }
      })
     }

     updatealmathuraatmonthly(){
      this.storage.get(this.ibaadah.almathuraatkey).then(data=>{  
          if(data){ 
          let almathuraatmonthly = new Ibaadahmonthly(this.week,data);
          this.monthservice.almathuraatmonthly.push(almathuraatmonthly);
          this.monthservice.setalmathuraatmonthly(this.monthservice.almathuraatmonthly);
        }else{
          let almathuraatmonthly = new Ibaadahmonthly(this.week,this.AlMathuraat);
          this.monthservice.almathuraatmonthly.push(almathuraatmonthly);
          this.monthservice.setalmathuraatmonthly(this.monthservice.almathuraatmonthly);
        }
      })
     }

     updateziyaarahweekly(){
      this.storage.get(ZIYAARAH_KEY).then(data=>{
        if(data){
          var now = new Date();
          let ziyaarahweekly = new Ibaadahweekly(now.getDate(), this.week, data);
          this.ziyaarahweekly.push(ziyaarahweekly);
          this.storage.set(TEMPZIYAARAHWEEKLY_KEY, this.ziyaarahweekly);
          this.ibaadah.setziyaarahweekly(this.ziyaarahweekly);
        }else{
          var now = new Date();
          let ziyaarahweekly = new Ibaadahweekly(now.getDate(), this.week, this.Ziyaarah);
          this.ziyaarahweekly.push(ziyaarahweekly);
          this.storage.set(TEMPZIYAARAHWEEKLY_KEY, this.ziyaarahweekly);
          this.ibaadah.setziyaarahweekly(this.ziyaarahweekly);
        }
      })
     }

     updateziyaarahmonthly(){
      this.storage.get(this.ibaadah.ziyaarahkey).then(data=>{  
          if(data){ 
          let ziyaarahmonthly = new Ibaadahmonthly(this.week,data);
          this.monthservice.ziyaarahmonthly.push(ziyaarahmonthly);
          this.monthservice.setziyaarahmonthly(this.monthservice.ziyaarahmonthly);
        }else{
          let ziyaarahmonthly = new Ibaadahmonthly(this.week,this.Ziyaarah);
          this.monthservice.ziyaarahmonthly.push(ziyaarahmonthly);
          this.monthservice.setziyaarahmonthly(this.monthservice.ziyaarahmonthly);
        }
      })
     }

     updateothersweekly(){
      this.storage.get(OTHERS_KEY).then(data=>{
        if(data){
          var now = new Date();
          let othersweekly = new Ibaadahweekly(now.getDate(), this.week, data);
          this.othersweekly.push(othersweekly);
          this.storage.set(TEMPOTHERSWEEKLY_KEY, this.othersweekly);
          this.ibaadah.setothersweekly(this.othersweekly);
        }else{
          var now = new Date();
          let othersweekly = new Ibaadahweekly(now.getDate(), this.week, this.Others);
          this.othersweekly.push(othersweekly);
          this.storage.set(TEMPOTHERSWEEKLY_KEY, this.othersweekly);
          this.ibaadah.setothersweekly(this.othersweekly);
        }
      })
     }

     updateothersmonthly(){
      this.storage.get(this.ibaadah.otherskey).then(data=>{  
          if(data){ 
          let othersmonthly = new Ibaadahmonthly(this.week,data);
          this.monthservice.othersmonthly.push(othersmonthly);
          this.monthservice.setothersmonthly(this.monthservice.othersmonthly);
        }else{
          let othersmonthly = new Ibaadahmonthly(this.week,this.Others);
          this.monthservice.othersmonthly.push(othersmonthly);
          this.monthservice.setothersmonthly(this.monthservice.othersmonthly);
        }
      })
     }

    resetibaadahdaily(){
      this.Salah.filter(task => {         
        task.IsDone = false;
     });
     this.storage.set(SALAH_KEY, this.Salah);

     this.Tatawwu.filter(task => {         
      task.IsDone = false;
    });
    this.storage.set(TATAWWU_KEY, this.Tatawwu);

    this.Quran.filter(task => {         
      task.IsDone = false;
    });
    this.storage.set(QURAN_KEY, this.Quran);

    this.AlMathuraat.filter(task => {         
      task.IsDone = false;
    });
    this.storage.set(ALMATHURAAT_KEY, this.AlMathuraat);

    this.Ziyaarah.filter(task => {         
      task.IsDone = false;
    });
    this.storage.set(ZIYAARAH_KEY, this.Ziyaarah);
    
    this.Others.filter(task => {         
      task.IsDone = false;
    });
    this.storage.set(OTHERS_KEY, this.Others);

    this.ibaadah.salahWeekly = [];
    this.ibaadah.tatawwuWeekly = [];
    this.ibaadah.quranWeekly = [];
    this.ibaadah.almathuraatWeekly = [];
    this.ibaadah.ziyaarahWeekly = [];
    this.ibaadah.othersWeekly = [];
    }

    resetcount(){
      this.count.filter(count=>{
          count.IsdoneCount  = 0;
       })
       this.storage.set(COUNT_KEY, this.count);
    }

    updatemonthlycount(){
      this.storage.get(SALAHWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          let monthly = new Ibaadahcount(this.week,"Salah",data);
          this.monthservice.monthlycount.push(monthly)
        }else{
          let monthly = new Ibaadahcount(this.week,"Salah",this.salahcount);
          this.monthservice.monthlycount.push(monthly)
        }
      })

      this.storage.get(TATAWWUWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          let monthly = new Ibaadahcount(this.week,"Tatawwu",data);
          this.monthservice.monthlycount.push(monthly)
        }else{
          let monthly = new Ibaadahcount(this.week,"Tatawwu",this.tatawwucount);
          this.monthservice.monthlycount.push(monthly)
        }
      })

      this.storage.get(QURANWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          let monthly = new Ibaadahcount(this.week,"Quran",data);
          this.monthservice.monthlycount.push(monthly)
        }else{
          let monthly = new Ibaadahcount(this.week,"Quran",this.qurancount);
          this.monthservice.monthlycount.push(monthly)
        }
      })

      this.storage.get(ALMATHURAATWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          let monthly = new Ibaadahcount(this.week,"Almathuraat",data);
          this.monthservice.monthlycount.push(monthly)
        }else{
          let monthly = new Ibaadahcount(this.week,"Almathuraat",this.almathuraatcount);
          this.monthservice.monthlycount.push(monthly)
        }
      })

      this.storage.get(ZIYAARAHWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          let monthly = new Ibaadahcount(this.week,"Ziyaarah",data);
          this.monthservice.monthlycount.push(monthly)
        }else{
          let monthly = new Ibaadahcount(this.week,"Ziyaarah",this.ziyaarahcount);
          this.monthservice.monthlycount.push(monthly)
        }
      })

      this.storage.get(OTHERSWEEKLYCOUNT_KEY).then(data=>{
        if(data){
          let monthly = new Ibaadahcount(this.week,"Others",data);
          this.monthservice.monthlycount.push(monthly)
        }else{
          let monthly = new Ibaadahcount(this.week,"Others",this.otherscount);
          this.monthservice.monthlycount.push(monthly)
        }
      })
      
      setTimeout(()=>{
       this.storage.set(MONTHLYCOUNT_KEY, this.monthservice.monthlycount); 
      }, 1000)
    }


    testweekend(){//weekend test
      //update monthly arrays
      this.updatesalahmonthly();
      this.updatetatawwumonthly();
      this.updatequranmonthly();
      this.updatealmathuraatmonthly();
      this.updateziyaarahmonthly();
      this.updateothersmonthly();
      this.updatemonthlycount();

      this.updateweek();

       //update week
      setTimeout(()=>{
        if(this.week < 5){
          this.week++;
          this.storage.set(WEEK_KEY, this.week); 
        }else if(this.week == 5){
          this.week = 1;
          this.storage.set(WEEK_KEY, this.week); 
        }
          
      }, 1000)
       
      
    }

    resetweeklycount(){
      this.salahcount.filter(count=>{
          count.IsdoneCount == 0;  
      }) 
      this.tatawwucount.filter(count=>{
        count.IsdoneCount == 0;  
      }) 
      this.qurancount.filter(count=>{
        count.IsdoneCount == 0;  
      }) 
      this.almathuraatcount.filter(count=>{
        count.IsdoneCount == 0;  
      }) 
      this.ziyaarahcount.filter(count=>{
        count.IsdoneCount == 0;  
      }) 
      this.otherscount.filter(count=>{
        count.IsdoneCount == 0;  
      }) 
    }

    

                                                   ///////////////////////////////////////                                  
                                                   //                                   //
                                                   //                                   //
                                                   //        NEW\TEST FEATURES          //
                                                   //                                   //
                                                   //                                   //
                                                   ///////////////////////////////////////

                                        // finding an object in an array
    //  return this.{data array}.find({object instance in array} => {object instance in array} === param);                                              
  //  e.g getChecklist(id): Checklist {
  //    return this.checklists.find( checklist => checklist.id === id);
  //  }
setmonthdays(){
  switch (new Date().getMonth()) {
    case 0:
      let days = new Day(new Date().getMonth(), this.day)
      this.storage.set("jandays", days);
    break;
    case 1:
      let days1 = new Day(new Date().getMonth(), this.day)
      this.storage.set("febdays", days1);
    break;
    case 2:
      let days2 = new Day(new Date().getMonth(), this.day)
      this.storage.set("mardays", days2);
    break;
    case 3:
      let days3 = new Day(new Date().getMonth(), this.day)
      this.storage.set("aprdays", days3);
    break;
    case 4:
      let days4 = new Day(new Date().getMonth(), this.day)
      this.storage.set("maydays", days4);
    break;
    case 5:
      let days5 = new Day(new Date().getMonth(), this.day)
      this.storage.set("jundays", days5);
    break;
    case 6:
      let days6 = new Day(new Date().getMonth(), this.day)
      this.storage.set("juldays", days6);
    break;
    case 7:
      let days7 = new Day(new Date().getMonth(), this.day)
      this.storage.set("augdays", days7);
    break;
    case 8:
      let days8 = new Day(new Date().getMonth(), this.day)
      this.storage.set("sepdays", days8);
    break;
    case 9:
      let days9 = new Day(new Date().getMonth(), this.day)
      this.storage.set("octdays", days9);
    break;
    case 10:
      let days10 = new Day(new Date().getMonth(), this.day)
      this.storage.set("novdays", days10);
    break;
    case 11:
      let days11 = new Day(new Date().getMonth(), this.day)
      this.storage.set("decdays", days11);
    break;
  }
}

test(){
  this.storage.get(TOTALCOUNT_KEY).then(count=>{
    console.log("the new array is",count)
  })
}
testmonthend(){
  this.cleartotal();
  this.storage.get(MONTHLYCOUNT_KEY).then(count=>{
    if(count){
      var now = new Date();
      if(now.getDate() == 1){
        this.setmonthdays();
        this.resetday();
        let tcount = new IbaadahTotalcount(now.getMonth(),count);
        this.total.monthlycount.push(tcount);
        this.storage.set(TOTALCOUNT_KEY,this.total.monthlycount);
        this.resetmonthly();
        this.storage.remove(MONTHLYCOUNT_KEY);
        this.monthservice.monthlycount = [];
      }
    }else{
      var now = new Date();
      if(now.getDate() == 1){
        this.setmonthdays();
        this.resetday();
        let tcount = new IbaadahTotalcount(now.getMonth(),count);
        this.total.monthlycount.push(tcount);
        this.storage.set(TOTALCOUNT_KEY,this.total.monthlycount);
        this.resetmonthly();
        this.storage.remove(MONTHLYCOUNT_KEY);
        this.monthservice.monthlycount = [];
                                                   }
        }  
  })
}
cleartotal(){
  this.storage.get(TOTALCOUNT_KEY).then(count=>{
    if(count){
      var now = new Date();
      if(now.getMonth() == 0 && now.getDate() == 1 || count.length == 12){
        this.storage.remove(TOTALCOUNT_KEY);
        this.total.monthlycount = [];
      } 
    }
  })
}
resetmonthly(){
  this.storage.remove(this.monthservice.salahkey);
  this.monthservice.salahmonthly = [];
  this.storage.remove(this.monthservice.tatawwukey);
  this.monthservice.tatawwumonthly = [];
  this.storage.remove(this.monthservice.qurankey);
  this.monthservice.quranmonthly = [];
  this.storage.remove(this.monthservice.almathuraatkey);
  this.monthservice.almathuraatmonthly = [];
  this.storage.remove(this.monthservice.ziyaarahkey);
  this.monthservice.ziyaarahmonthly = [];
  this.storage.remove(this.monthservice.otherskey);
  this.monthservice.othersmonthly = [];
}
}
