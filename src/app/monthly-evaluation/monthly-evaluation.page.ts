import { LoadingController } from '@ionic/angular';
import { ibaadahMonthlyService } from './../../service/ibaadahmonthly';
import { Storage } from '@ionic/storage';
import { NavService } from './../../service/NavService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-monthly-evaluation',
  templateUrl: './monthly-evaluation.page.html',
  styleUrls: ['./monthly-evaluation.page.scss'],
})
export class MonthlyEvaluationPage implements OnInit {
  @ViewChild('barCanvas') barCanvas;

  barChart: any;

  constructor(public nav:NavService, public storage: Storage, public monthly: ibaadahMonthlyService,
              public loadCtrl: LoadingController) { }
 
  days : number = 0;
  
  Week2 = false; 
  Week3 = false; 
  Week4 = false;  
  Week5 = false;

  Salah : boolean;
  Tatawwu : boolean;
  Quran : boolean;
  Almathuraat : boolean;
  Ziyaarah : boolean;
  Others : boolean;
  sort: any = "week 1";
  selectedsalah: any[] = [];
  selectedtatawwu: any[] = [];
  selectedquran: any[] = [];
  selectedalmathuraat: any[] = [];
  selectedziyaarah: any[] = [];
  selectedothers: any[] = [];

  //Salah values
  subh:any= 0; zuhr:any= 0; asr:any= 0; maghrib:any= 0; isha:any= 0;
  //Tatawwu values
  Tahajjud:any= 0; Duha:any= 0; Sawm:any= 0; Taobah:any= 0;
  //Quran values
  Tilaawah:any= 0; Hifz:any= 0; Revision:any= 0; Tafsir:any= 0;
  //Almathuraat values
  Morning:any= 0; Evening:any= 0;
  //Ziyaaraah values
  Qubuur:any= 0; Brother:any= 0; Hospital:any= 0; Solihin:any= 0;
  //Others values
  GroupIftar:any= 0; BookReading:any= 0; Riyaadah:any= 0; Halqah:any= 0;
  Sadaqah:any= 0; Fardiyyah:any= 0; Family :any= 0; Remembrance:any= 0;
  Rabitoh:any= 0;


 
  customAlertOptions: any = {
    header: 'Choose Week',
    translucent: true
  };

  ngOnInit() {
    this.updateweek();
    this.updatetemp();
    this.presentLoading();
    this.updatevisibility();
    this.updatecount();
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    
    this.getdays();

    this.choosesalahweek();
    this.choosetatawwuweek();
    this.choosequranweek();
    this.choosealmathuraatweek();
    this.chooseziyaarahweek();
    this.chooseothersweek();
    console.log("selected1", this.selectedsalah)
    console.log("selected2", this.selectedtatawwu)
    console.log("selected3", this.selectedquran)
    console.log("selected4", this.selectedalmathuraat)
    console.log("selected5", this.selectedziyaarah)
    console.log("selected6", this.selectedothers)

    this.calculatesalah();
    this.calculatetatawwu();
    this.calculatequran();
    this.calculatealmathuraat();
    this.calculateziyaarah();
    this.calculateothers();
    this.updatechart();

    loading.dismiss();
  }

    sortby(){
        this.updateselected();
        this.presentLoading();  
    }

getdays(){
    this.storage.get("day").then(day=>{
        if(day){
            this.days = day;
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

updatechart(){
  if(this.Salah == true){
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: ["Subh", "Zuhr", "Asr", "Maghrib", "Isha"],
          datasets: [{
              label: '# of Salah',
              data: [this.subh, this.zuhr, this.asr, this.maghrib, this.isha],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  
  });
  
  }else if(this.Tatawwu == true){
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: ["Tahajjud", "Duha", "Sawm", "Taobah"],
          datasets: [{
              label: '# of Tatawwu',
              data: [this.Tahajjud, this.Duha, this.Sawm, this.Taobah],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  
  });
  }else if(this.Quran == true){
                this.barChart = new Chart(this.barCanvas.nativeElement, {
            
                  type: 'bar',
                  data: {
                      labels: ["Tilaawah", "Hifz", "Revision", "Tafsir"],
                      datasets: [{
                          label: '# of Quran',
                          data: [this.Tilaawah, this.Hifz, this.Revision, this.Tafsir],
                          backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                          ],
                          borderColor: [
                              'rgba(255,99,132,1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                          ],
                          borderWidth: 1
                      }]
                  },
                  options: {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                              }
                          }]
                      }
                  }
              
              });
  }else if(this.Almathuraat == true){
                            this.barChart = new Chart(this.barCanvas.nativeElement, {
                        
                              type: 'bar',
                              data: {
                                  labels: ["Morning", "Evening"],
                                  datasets: [{
                                      label: '# of Almathuraat',
                                      data: [this.Morning, this.Evening],
                                      backgroundColor: [
                                          'rgba(255, 99, 132, 0.2)',
                                          'rgba(54, 162, 235, 0.2)',
                                      ],
                                      borderColor: [
                                          'rgba(255,99,132,1)',
                                          'rgba(54, 162, 235, 1)',
                                      ],
                                      borderWidth: 1
                                  }]
                              },
                              options: {
                                  scales: {
                                      yAxes: [{
                                          ticks: {
                                              beginAtZero:true
                                          }
                                      }]
                                  }
                              }
                          
                          });
  }else if(this.Ziyaarah == true){
                                        this.barChart = new Chart(this.barCanvas.nativeElement, {
                                    
                                          type: 'bar',
                                          data: {
                                              labels: ["Qubuur", "Brother", "Hospital", "Solihin"],
                                              datasets: [{
                                                  label: '# of Ziyaarah',
                                                  data: [this.Qubuur, this.Brother, this.Hospital, this.Solihin],
                                                  backgroundColor: [
                                                      'rgba(255, 99, 132, 0.2)',
                                                      'rgba(54, 162, 235, 0.2)',
                                                      'rgba(255, 206, 86, 0.2)',
                                                      'rgba(75, 192, 192, 0.2)',
                                                  ],
                                                  borderColor: [
                                                      'rgba(255,99,132,1)',
                                                      'rgba(54, 162, 235, 1)',
                                                      'rgba(255, 206, 86, 1)',
                                                      'rgba(75, 192, 192, 1)',
                                                  ],
                                                  borderWidth: 1
                                              }]
                                          },
                                          options: {
                                              scales: {
                                                  yAxes: [{
                                                      ticks: {
                                                          beginAtZero:true
                                                      }
                                                  }]
                                              }
                                          }
                                      
                                      });
  }else if(this.Others == true){
                                                    this.barChart = new Chart(this.barCanvas.nativeElement, {
                                                
                                                      type: 'bar',
                                                      data: {
                                                          labels: ["Group Iftar", "Book Reading", "Riyaadah",
                                                                   "Halqah", "Sadaqah", "Fardiyyah", "Family Sitting",
                                                                   "Remembrance", "Rabitoh"],
                                                          datasets: [{
                                                              label: '# of Others',
                                                              data: [this.GroupIftar, this.BookReading, this.Riyaadah, this.Halqah, this.Sadaqah,
                                                                     this.Fardiyyah, this.Family, this.Remembrance, this.Rabitoh],
                                                              backgroundColor: [
                                                                  'rgba(255, 99, 132, 0.2)',
                                                                  'rgba(54, 162, 235, 0.2)',
                                                                  'rgba(255, 206, 86, 0.2)',
                                                                  'rgba(75, 192, 192, 0.2)',
                                                                  'rgba(255, 99, 132, 0.2)',
                                                                  'rgba(54, 162, 235, 0.2)',
                                                                  'rgba(255, 206, 86, 0.2)',
                                                                  'rgba(75, 192, 192, 0.2)',
                                                                  'rgba(255, 99, 132, 0.2)'

                                                              ],
                                                              borderColor: [
                                                                  'rgba(255,99,132,1)',
                                                                  'rgba(54, 162, 235, 1)',
                                                                  'rgba(255, 206, 86, 1)',
                                                                  'rgba(75, 192, 192, 1)',
                                                                  'rgba(255,99,132,1)',
                                                                  'rgba(54, 162, 235, 1)',
                                                                  'rgba(255, 206, 86, 1)',
                                                                  'rgba(75, 192, 192, 1)',
                                                                  'rgba(255,99,132,1)'
                                                              ],
                                                              borderWidth: 1
                                                          }]
                                                      },
                                                      options: {
                                                          scales: {
                                                              yAxes: [{
                                                                  ticks: {
                                                                      beginAtZero:true
                                                                  }
                                                              }]
                                                          }
                                                      }
                                                  
                                                  });
            }
  }
  
updatetemp(){
    this.monthly.salahcount.splice(0,);
    this.monthly.tatawwucount.splice(0,);
    this.monthly.qurancount.splice(0,);
    this.monthly.almathuraatcount.splice(0,);
    this.monthly.ziyaarahcount.splice(0,);
    this.monthly.otherscount.splice(0,);
    
}

updateweek(){
    this.storage.get("salahweekly").then(week=>{
        if(week){
            if(week.Week == 2){
                this.Week2 = true;
            }else{
                this.Week2 = false;
            }
            if(week.Week == 3){
                this.Week3 = true;
            }else{
                this.Week3 = false;
            }
            if(week.Week == 4){
                this.Week4 = true;
            }else{
                this.Week4 = false;
            }
            if(week.Week == 5){
                this.Week5 = true;
            }else{
                this.Week5 = false;
            }
        }
    })
}

updateselected(){
    this.selectedsalah.splice(0,);
    this.selectedtatawwu.splice(0,);
    this.selectedquran.splice(0,);
    this.selectedquran.splice(0,);
    this.selectedalmathuraat.splice(0,);
    this.selectedziyaarah.splice(0,);
    this.selectedothers.splice(0,);
}

updatecount(){
    this.storage.get(this.monthly.countkey).then(data=>{
        if(data){
            data.filter(count=>{
                if(count.Name == "Salah"){
                    this.monthly.salahcount.push(count);
                }else if(count.Name == "Tatawwu"){
                    this.monthly.tatawwucount.push(count);
                }else if(count.Name == "Quran"){
                    this.monthly.qurancount.push(count);
                }else if(count.Name == "Almathuraat"){
                    this.monthly.almathuraatcount.push(count);
                }else if(count.Name == "Ziyaarah"){
                    this.monthly.ziyaarahcount.push(count);
                }else if(count.Name == "Others"){
                    this.monthly.otherscount.push(count);
                }
            })
        }
    })
}

choosesalahweek(){
   if(this.sort == "week 1"){
    this.monthly.salahcount.filter(count =>{
        if(count.Week == 1){
            this.selectedsalah.push(count.Acts);
        }
    })    
   }else if(this.sort == "week 2"){
    this.monthly.salahcount.filter(count =>{
        if(count.Week == 2){
            console.log( this.selectedsalah)
            this.selectedsalah.push(count.Acts);
        }
   })
   }else if(this.sort == "week 3"){
    this.monthly.salahcount.filter(count =>{
        if(count.Week == 3){
            this.selectedsalah.push(count.Acts);
        }
   })
   }else if(this.sort == "week 4"){
    this.monthly.salahcount.filter(count =>{
        if(count.Week == 4){
            this.selectedsalah.push(count.Acts);
        }
   })
   }else if(this.sort == "week 5"){
    this.monthly.salahcount.filter(count =>{
        if(count.Week == 5){
            this.selectedsalah.push(count.Acts);
        }
   })
            }

}

choosetatawwuweek(){
    if(this.sort == "week 1"){
        this.monthly.tatawwucount.filter(count =>{
            if(count.Week == 1){
                this.selectedtatawwu.push(count.Acts);
            }
        })    
       }else if(this.sort == "week 2"){
        this.monthly.tatawwucount.filter(count =>{
            if(count.Week == 2){
                this.selectedtatawwu.push(count.Acts);
            }
       })
       }else if(this.sort == "week 3"){
        this.monthly.tatawwucount.filter(count =>{
            if(count.Week == 3){
                this.selectedtatawwu.push(count.Acts);
            }
       })
       }else if(this.sort == "week 4"){
        this.monthly.tatawwucount.filter(count =>{
            if(count.Week == 4){
                this.selectedtatawwu.push(count.Acts);
            }
       })
      }else if(this.sort == "week 5"){
        this.monthly.tatawwucount.filter(count =>{
            if(count.Week == 5){
                this.selectedtatawwu.push(count.Acts);
            }
       })
    }
}

choosequranweek(){
    if(this.sort == "week 1"){
        this.monthly.qurancount.filter(count =>{
            if(count.Week == 1){
                this.selectedquran.push(count.Acts);
            }
        })    
       }else if(this.sort == "week 2"){
        this.monthly.qurancount.filter(count =>{
            if(count.Week == 2){
                this.selectedquran.push(count.Acts);
            }
       })
       }else if(this.sort == "week 3"){
        this.monthly.qurancount.filter(count =>{
            if(count.Week == 3){
                this.selectedquran.push(count.Acts);
            }
       })
       }else if(this.sort == "week 4"){
        this.monthly.qurancount.filter(count =>{
            if(count.Week == 4){
                this.selectedquran.push(count.Acts);
            }
       })
      }else if(this.sort == "week 5"){
        this.monthly.qurancount.filter(count =>{
            if(count.Week == 5){
                this.selectedquran.push(count.Acts);
            }
       })
      }
}

choosealmathuraatweek(){
    if(this.sort == "week 1"){
        this.monthly.almathuraatcount.filter(count =>{
            if(count.Week == 1){
                this.selectedalmathuraat.push(count.Acts);
            }
        })    
       }else if(this.sort == "week 2"){
        this.monthly.almathuraatcount.filter(count =>{
            if(count.Week == 2){
                this.selectedalmathuraat.push(count.Acts);
            }
       })
       }else if(this.sort == "week 3"){
        this.monthly.almathuraatcount.filter(count =>{
            if(count.Week == 3){
                this.selectedalmathuraat.push(count.Acts);
            }
       })
       }else if(this.sort == "week 4"){
        this.monthly.almathuraatcount.filter(count =>{
            if(count.Week == 4){
                this.selectedalmathuraat.push(count.Acts);
            }
       })
      }else if(this.sort == "week 5"){
        this.monthly.almathuraatcount.filter(count =>{
            if(count.Week == 5){
                this.selectedalmathuraat.push(count.Acts);
            }
       })
                }
}

chooseziyaarahweek(){
    if(this.sort == "week 1"){
        this.monthly.ziyaarahcount.filter(count =>{
            if(count.Week == 1){
                this.selectedziyaarah.push(count.Acts);
            }
        })    
       }else if(this.sort == "week 2"){
        this.monthly.ziyaarahcount.filter(count =>{
            if(count.Week == 2){
                this.selectedziyaarah.push(count.Acts);
            }
       })
       }else if(this.sort == "week 3"){
        this.monthly.ziyaarahcount.filter(count =>{
            if(count.Week == 3){
                this.selectedziyaarah.push(count.Acts);
            }
       })
       }else if(this.sort == "week 4"){
        this.monthly.ziyaarahcount.filter(count =>{
            if(count.Week == 4){
                this.selectedziyaarah.push(count.Acts);
            }
       })
       }else if(this.sort == "week 5"){
        this.monthly.ziyaarahcount.filter(count =>{
            if(count.Week == 5){
                this.selectedziyaarah.push(count.Acts);
            }
       })
                }
}

chooseothersweek(){
    if(this.sort == "week 1"){
        this.monthly.otherscount.filter(count =>{
            if(count.Week == 1){
                this.selectedothers.push(count.Acts);
            }
        })    
       }else if(this.sort == "week 2"){
        this.monthly.otherscount.filter(count =>{
            if(count.Week == 2){
                this.selectedothers.push(count.Acts);
            }
       })
       }else if(this.sort == "week 3"){
        this.monthly.otherscount.filter(count =>{
            if(count.Week == 3){
                this.selectedothers.push(count.Acts);
            }
       })
       }else if(this.sort == "week 4"){
        this.monthly.otherscount.filter(count =>{
            if(count.Week == 4){
                this.selectedothers.push(count.Acts);
            }
       })
       }else if(this.sort == "week 5"){
        this.monthly.otherscount.filter(count =>{
            if(count.Week == 5){
                this.selectedothers.push(count.Acts);
            }
       })
                }
}

calculatesalah(){
    this.selectedsalah.filter(count=>{
        if(count[0].name == "Subh"){
         this.subh = count[0].IsdoneCount;
        }
        })
        this.selectedsalah.filter(count=>{
            if(count[1].name == "Zuhr"){
            this.zuhr = count[1].IsdoneCount;
            }
        })
        this.selectedsalah.filter(count=>{
            if(count[2].name == "Asr"){
                this.asr = count[2].IsdoneCount;
            }
        })
        this.selectedsalah.filter(count=>{
            if(count[3].name == "Maghrib"){
                this.maghrib = count[3].IsdoneCount;
            }
        })
        this.selectedsalah.filter(count=>{
            if(count[4].name == "Ishaa"){
                this.isha = count[4].IsdoneCount;
            }
        })
    }
    calculatetatawwu(){
        this.selectedtatawwu.filter(count=>{
            if(count[0].name == "Tahajjud"){
             this.Tahajjud = count[0].IsdoneCount;
            }
            })
            this.selectedtatawwu.filter(count=>{
                if(count[1].name == "Duha"){
                this.Duha = count[1].IsdoneCount;
                }
            })
            this.selectedtatawwu.filter(count=>{
                if(count[2].name == "Sawm"){
                    this.Sawm = count[2].IsdoneCount;
                }
            })
            this.selectedtatawwu.filter(count=>{
                if(count[3].name == "Taobah"){
                    this.Taobah = count[3].IsdoneCount;
                }
            })
        }
 calculatequran(){
        this.selectedquran.filter(count=>{
            if(count[0].name == "Tilaawah"){
             this.Tilaawah = count[0].IsdoneCount;
            }
            })
            this.selectedquran.filter(count=>{
                if(count[1].name == "Hifz"){
                this.Hifz = count[1].IsdoneCount;
                }
            })
            this.selectedquran.filter(count=>{
                if(count[2].name == "Revision"){
                    this.Revision = count[2].IsdoneCount;
                }
            })
            this.selectedquran.filter(count=>{
                if(count[3].name == "Tafsir"){
                    this.Tafsir = count[3].IsdoneCount;
                }
            })
        }
 calculatealmathuraat(){
        this.selectedalmathuraat.filter(count=>{
            if(count[0].name == "Morning"){
             this.Morning = count[0].IsdoneCount;
            }
            })
            this.selectedalmathuraat.filter(count=>{
                if(count[1].name == "Evening"){
                this.Evening = count[1].IsdoneCount;
                }
            })
        }
 calculateziyaarah(){
        this.selectedziyaarah.filter(count=>{
            if(count[0].name == "Qubuur"){
             this.Qubuur = count[0].IsdoneCount;
            }
            })
            this.selectedziyaarah.filter(count=>{
                if(count[1].name == "Brother"){
                this.Brother = count[1].IsdoneCount;
                }
            })
            this.selectedziyaarah.filter(count=>{
                if(count[2].name == "Hospital"){
                    this.Hospital = count[2].IsdoneCount;
                }
            })
            this.selectedziyaarah.filter(count=>{
                if(count[3].name == "Solihin"){
                    this.Solihin = count[3].IsdoneCount;
                }
            })
        }
 calculateothers(){
        this.selectedothers.filter(count=>{
            if(count[0].name == "Group Iftar"){
             this.GroupIftar = count[0].IsdoneCount;
            }
            })
            this.selectedothers.filter(count=>{
                if(count[1].name == "Book Reading"){
                this.BookReading = count[1].IsdoneCount;
                }
            })
            this.selectedothers.filter(count=>{
                if(count[2].name == "Riyaadah"){
                    this.Riyaadah = count[2].IsdoneCount;
                }
            })
            this.selectedothers.filter(count=>{
                if(count[3].name == "Halqah"){
                    this.Halqah = count[3].IsdoneCount;
                }
            })
            this.selectedothers.filter(count=>{
                if(count[4].name == "Sadaqah"){
                 this.Sadaqah = count[4].IsdoneCount;
                }
                })
                this.selectedothers.filter(count=>{
                    if(count[5].name == "Fardiyyah"){
                    this.Fardiyyah = count[5].IsdoneCount;
                    }
                })
                this.selectedothers.filter(count=>{
                    if(count[6].name == "Family Sitting"){
                        this.Family = count[6].IsdoneCount;
                    }
                })
                this.selectedothers.filter(count=>{
                    if(count[7].name == "Remembrance"){
                        this.Remembrance = count[7].IsdoneCount;
                    }
                })
                this.selectedothers.filter(count=>{
                    if(count[8].name == "Rabitoh"){
                        this.Rabitoh = count[8].IsdoneCount;
                    }
                })
        }

}
