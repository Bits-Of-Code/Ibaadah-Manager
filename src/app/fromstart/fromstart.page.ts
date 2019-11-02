import { ibaadahTotalService } from './../../service/Total';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavService } from './../../service/NavService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fromstart',
  templateUrl: './fromstart.page.html',
  styleUrls: ['./fromstart.page.scss'],
})
export class FromstartPage implements OnInit {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(public nav:NavService, public storage: Storage, public total: ibaadahTotalService,
    public loadCtrl: LoadingController, public toastController: ToastController) { }

    days : number = 0;

  Salah : boolean;
  Tatawwu : boolean;
  Quran : boolean;
  Almathuraat : boolean;
  Ziyaarah : boolean;
  Others : boolean;

  selectedsalah: any[] = [];
  selectedtatawwu: any[] = [];
  selectedquran: any[] = [];
  selectedalmathuraat: any[] = [];
  selectedziyaarah: any[] = [];
  selectedothers: any[] = [];


  sort: string;

  jan: boolean = false;
  feb: boolean = false;
  mar: boolean = false;
  apr: boolean = false;
  may: boolean = false;
  jun: boolean = false;
  jul: boolean = false;
  aug: boolean = false;
  sep: boolean = false;
  oct: boolean = false;
  nov: boolean = false;
  dec: boolean = false;

   //Salah values
   subharray:any[]= []; zuhrarray:any[]= []; asrarray:any[]= [];
   maghribarray:any[]= []; ishaarray:any[]= [];
   subh:any = 0; zuhr:any= 0; asr:any= 0; maghrib:any= 0; isha:any= 0;
   //Tatawwu values
   Tahajjud:any= 0; Duha:any= 0; Sawm:any= 0; Taobah:any= 0;
   Tahajjudarray:any[]= []; Duhaarray:any[]= []; Sawmarray:any[]= [];
   Taobaharray:any[]= [];
   //Quran values
   Tilaawaharray:any[]= []; Hifzarray:any[]= []; Revisionarray:any[]= [];
   Tafsirarray:any[]= [];
   Tilaawah:any= 0; Hifz:any= 0; Revision:any= 0; Tafsir:any= 0;
   //Almathuraat values
   Morningarray:any[]= []; Eveningarray:any[]= [];
   Morning:any= 0; Evening:any= 0;
   //Ziyaaraah values
   Qubuurarray:any[]= []; Brotherarray:any[]= []; Hospitalarray:any[]= [];
   Solihinarray:any[]= [];
   Qubuur:any= 0; Brother:any= 0; Hospital:any= 0; Solihin:any= 0;
   //Others values
   GroupIftararray:any[]= []; BookReadingarray:any[]= []; Riyaadaharray:any[]= [];
   Halqaharray:any[]= [];Sadaqaharray:any[]= []; Fardiyyaharray:any[]= [];
   Familyarray:any[]= []; Remembrancearray:any[]= []; Rabitoharray:any[]= [];
   GroupIftar:any= 0; BookReading:any= 0; Riyaadah:any= 0; Halqah:any= 0;
   Sadaqah:any= 0; Fardiyyah:any= 0; Family :any= 0; Remembrance:any= 0;
   Rabitoh:any= 0;

  customAlertOptions: any = {
    header: 'Choose Month',
    translucent: true
  };

  ngOnInit() {
    this.checkmonth();
    this.getdays();
    this.getmonth()
    this.resetmonthyarray();
    this.updatecount();
    this.presentLoading();
    this.updatevisibility();
  }

  getdays(){
    switch (this.sort) {
        case "jan":
            this.storage.get('jandays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "feb":
            this.storage.get('febdays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "mar":
            this.storage.get('mardays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "apr":
            this.storage.get('aprdays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "may":
            this.storage.get('maydays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "jun":
            this.storage.get('juldays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "jul":
            this.storage.get('juldays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "aug":
            this.storage.get('augdays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "sep":
            this.storage.get('sepdays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "oct":
            this.storage.get('octdays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "nov":
            this.storage.get('novdays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
        case "dec":
            this.storage.get('decdays').then(day=>{
                if(day){
                    this.days = day;
                }
            })
        break;
    }
    
}

async presentToast() {
    if(this.days == 0){
        const toast = await this.toastController.create({
            message: 'You records are\'nt up to a month yet.',
            duration: 2000
        });
        toast.present();
    }
}

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
     
    this.resetactsarrays();    
    this.choosesalahmonth();
    this.choosetatawwumonth();
    this.choosequranmonth();
    this.choosealmathuraatmonth();
    this.chooseziyaarahmonth();
    this.chooseothersmonth();
    console.log("jan array is", this.total.jancount)
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
    this.presentToast();
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
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  
        type: 'line',
        data: {
            labels: ["Subh", "Zuhr", "Asr", "Maghrib", "Isha"],
            datasets: [{
                label: "Salah",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [this.subh, this.zuhr, this.asr, this.maghrib, this.isha],
                spanGaps: false
            }]
        },
       
    
    });
    
    }else if(this.Tatawwu == true){
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  
        type: 'line',
        data: {
            labels: ["Tahajjud", "Duha", "Sawm", "Taobah"],
            datasets: [{
                label: "Tatawwu",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [this.Tahajjud, this.Duha, this.Sawm, this.Taobah],
                spanGaps: false
            }]
        },
        
    });
    }else if(this.Quran == true){
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
              
                    type: 'line',
                    data: {
                        labels: ["Tilaawah", "Hifz", "Revision", "Tafsir"],
                        datasets: [{
                            label: "Quran",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [this.Tilaawah, this.Hifz, this.Revision, this.Tafsir],
                            spanGaps: false
                        }]
                    },
                    
                });
    }else if(this.Almathuraat == true){
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                          
                            type: 'line',
                            data: {
                            labels: ["Morning", "Evening"],
                            datasets: [{
                            label: "Almathuraat",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [this.Morning, this.Evening],
                            spanGaps: false
                                    }]
                                },
                            
                            });
    }else if(this.Ziyaarah == true){
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                          
            type: 'line',
                            data: {
                            labels: ["Qubuur", "Brother", "Hospital", "Solihin"],
                            datasets: [{
                            label: "Ziyaarah",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [this.Qubuur, this.Brother, this.Hospital, this.Solihin],
                            spanGaps: false
                                                 
                                   }]
                                      },
                                        
                                        });
    }else if(this.Others == true){
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                          
            type: 'line',
                            data: {
                            labels: ["Group Iftar", "Book Reading", "Riyaadah",
                                     "Halqah", "Sadaqah", "Fardiyyah", "Family Sitting",
                                     "Remembrance", "Rabitoh"],
                            datasets: [{
                            label: "Others",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [this.GroupIftar, this.BookReading, this.Riyaadah, this.Halqah, this.Sadaqah,
                                    this.Fardiyyah, this.Family, this.Remembrance, this.Rabitoh],
                            spanGaps: false                                                   
                                    }]
                         },
                                                    
                         });
              }
    }

resetmonthyarray(){
    this.total.jancount.splice(0,);
    this.total.febcount.splice(0,);
    this.total.marcount.splice(0,);
    this.total.aprcount.splice(0,);
    this.total.maycount.splice(0,);
    this.total.juncount.splice(0,);
    this.total.julcount.splice(0,);
    this.total.augcount.splice(0,);
    this.total.sepcount.splice(0,);
    this.total.octcount.splice(0,);
    this.total.novcount.splice(0,);
    this.total.deccount.splice(0,);
    
}

resetactsarrays(){
    this.subharray= [];this.zuhrarray= [];this.asrarray= [];this.maghribarray= [];this.ishaarray= [];

    this.Tahajjudarray= [];this.Duhaarray= [];this.Sawmarray= [];this.Taobaharray= [];

    this.Tilaawaharray= [];this.Hifzarray= [];this.Revisionarray= [];this.Tafsirarray= [];

    this.Morningarray= [];this.Eveningarray= [];

    this.Qubuurarray= [];this.Brotherarray= [];this.Hospitalarray= [];this.Solihinarray= [];

    this.GroupIftararray= [];this.BookReadingarray= [];this.Riyaadaharray= [];this.Halqaharray= [];this.Sadaqaharray= [];
    this.Fardiyyaharray= [];this.Familyarray= [];this.Remembrancearray= [];this.Rabitoharray= [];
}

  sortby(){
        console.log(this.sort)
      this.updateselected();
      this.presentLoading();  
  }

getmonth(){
    let now = new Date();
    switch (now.getMonth()) {
        case 0:
            this.sort = "jan"
            this.jan = true
        break;
        case 1:
            this.sort = "feb"
            this.feb = true
        break;
        case 2:
            this.sort = "mar"
            this.mar = true
        break;
        case 3:
            this.sort = "apr"
            this.apr = true
        break;
        case 4:
            this.sort = "may"
            this.may = true
        break;
        case 5:
            this.sort = "jun"
            this.jun = true
        break;
        case 6:
            this.sort = "jul"
            this.jul = true
        break;
        case 7:
            this.sort = "aug"
            this.aug = true
        break;
        case 8:
            this.sort = "sep"
            this.sep = true
        break;
        case 9:
            this.sort = "oct"
            this.oct = true
        break;
        case 10:
            this.sort = "nov"
            this.nov = true
        break;
        case 11:
            this.sort = "dec"
            this.dec = true
        break;
    }
}

checkmonth(){
    this.storage.get("totalcount").then(count=>{
        if(count){
            count.filter(count=>{
                switch (count.Month) {
                    case 0:
                        this.jan = true
                    break;
                    case 1:
                        this.feb = true
                    break;
                    case 2:
                        this.mar = true
                    break;
                    case 3:
                        this.apr = true
                    break;
                    case 4:
                        this.may = true
                    break;
                    case 5:
                        this.jun = true
                    break;
                    case 6:
                        this.jul = true
                    break;
                    case 7:
                        this.aug = true
                    break;
                    case 8:
                        this.sep = true
                    break;
                    case 9:
                        this.oct = true
                    break;
                    case 10:
                        this.nov = true
                    break;
                    case 11:
                        this.dec = true
                    break;
                }
            })
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
    this.storage.get(this.total.totalkey).then(data=>{
        if(data){
            data.filter(count=>{
                if(count.Month == 0){
                    this.total.jancount.push(count.Acts);
                }else if(count.Month == 1){
                    this.total.febcount.push(count.Acts);
                }else if(count.Month == 2){
                    this.total.marcount.push(count.Acts);
                }else if(count.Month == 3){
                    this.total.aprcount.push(count.Acts);
                }else if(count.Month == 4){
                    this.total.maycount.push(count.Acts);
                }else if(count.Month == 5){
                    this.total.juncount.push(count.Acts);
                }else if(count.Month == 6){
                    this.total.julcount.push(count.Acts);
                }else if(count.Month == 7){
                    this.total.augcount.push(count.Acts);
                }else if(count.Month == 8){
                    this.total.sepcount.push(count.Acts);
                }else if(count.Month == 9){
                    this.total.octcount.push(count.Acts);
                }else if(count.Month == 10){
                    this.total.novcount.push(count.Acts);
                }else if(count.Month == 11){
                    this.total.deccount.push(count.Acts);
                }
            })
        }
    })
}

choosesalahmonth(){
  if(this.sort == "jan"){
   this.total.jancount.filter(count =>{
       count.filter(acts=>{
        if(acts.Name == "Salah"){
            this.selectedsalah.push(acts);
        }
       })
   })    
  }else if(this.sort == "feb"){
    this.total.febcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "mar"){
    this.total.marcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "apr"){
    this.total.aprcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "may"){
    this.total.maycount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "jun"){
    this.total.juncount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "jul"){
    this.total.julcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "aug"){
    this.total.augcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "sep"){
    this.total.sepcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "oct"){
    this.total.octcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "nov"){
    this.total.novcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }else if(this.sort == "dec"){
    this.total.deccount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Salah"){
             this.selectedsalah.push(acts);
         }
        })
  })
  }

}

choosetatawwumonth(){
   if(this.sort == "jan"){
    this.total.jancount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Tatawwu"){
             this.selectedtatawwu.push(acts);
         }
        })
       })    
      }else if(this.sort == "feb"){
        this.total.febcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Tatawwu"){
                 this.selectedtatawwu.push(acts);
             }
            })
      })
      }else if(this.sort == "mar"){
        this.total.marcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Tatawwu"){
                 this.selectedquran.push(acts);
             }
            })
      })
      }else if(this.sort == "apr"){
        this.total.aprcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Tatawwu"){
                 this.selectedtatawwu.push(acts);
             }
            })
      })
      }else if(this.sort == "may"){
        this.total.maycount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Tatawwu"){
                 this.selectedtatawwu.push(acts);
             }
            })
  })
  }else if(this.sort == "jun"){
    this.total.juncount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Tatawwu"){
             this.selectedtatawwu.push(acts);
         }
        })
  })
  }else if(this.sort == "jul"){
    this.total.julcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Tatawwu"){
             this.selectedtatawwu.push(acts);
         }
        })
  })
  }else if(this.sort == "aug"){
    this.total.augcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Tatawwu"){
             this.selectedtatawwu.push(acts);
         }
        })
  })
  }else if(this.sort == "sep"){
    this.total.sepcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Tatawwu"){
             this.selectedtatawwu.push(acts);
         }
        })
  })
  }else if(this.sort == "oct"){
    this.total.octcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Tatawwu"){
             this.selectedtatawwu.push(acts);
         }
        })
  })
  }else if(this.sort == "nov"){
    this.total.novcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Tatawwu"){
             this.selectedtatawwu.push(acts);
         }
        })
  })
  }else if(this.sort == "dec"){
    this.total.deccount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Tatawwu"){
             this.selectedtatawwu.push(acts);
         }
        })
  })
  }
}

choosequranmonth(){
   if(this.sort == "jan"){
    this.total.jancount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Quran"){
             this.selectedquran.push(acts);
         }
        })
  })
      }else if(this.sort == "feb"){
        this.total.febcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Quran"){
                 this.selectedquran.push(acts);
             }
            })
      })
      }else if(this.sort == "mar"){
        this.total.marcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Quran"){
                 this.selectedquran.push(acts);
             }
            })
      })
      }else if(this.sort == "apr"){
        this.total.aprcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Quran"){
                 this.selectedquran.push(acts);
             }
            })
      })
      }else if(this.sort == "may"){
        this.total.maycount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Quran"){
                 this.selectedquran.push(acts);
             }
            })
  })
  }else if(this.sort == "jun"){
    this.total.juncount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Quran"){
             this.selectedquran.push(acts);
         }
        })
  })
  }else if(this.sort == "jul"){
    this.total.julcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Quran"){
             this.selectedquran.push(acts);
         }
        })
  })
  }else if(this.sort == "aug"){
    this.total.augcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Quran"){
             this.selectedquran.push(acts);
         }
        })
  })
  }else if(this.sort == "sep"){
    this.total.sepcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Quran"){
             this.selectedquran.push(acts);
         }
        })
  })
  }else if(this.sort == "oct"){
    this.total.octcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Quran"){
             this.selectedquran.push(acts);
         }
        })
  })
  }else if(this.sort == "nov"){
    this.total.novcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Quran"){
             this.selectedquran.push(acts);
         }
        })
  })
  }else if(this.sort == "dec"){
    this.total.deccount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Quran"){
             this.selectedquran.push(acts);
         }
        })
  })
  }
}

choosealmathuraatmonth(){
   if(this.sort == "jan"){
    this.total.jancount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Almathuraat"){
             this.selectedalmathuraat.push(acts);
         }
        })
    })
      }else if(this.sort == "feb"){
        this.total.febcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Almathuraat"){
                 this.selectedalmathuraat.push(acts);
             }
            })
      })
      }else if(this.sort == "mar"){
        this.total.marcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Almathuraat"){
                 this.selectedalmathuraat.push(acts);
             }
            })
      })
      }else if(this.sort == "apr"){
        this.total.aprcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Almathuraat"){
                 this.selectedalmathuraat.push(acts);
             }
            })
      })
      }else if(this.sort == "may"){
        this.total.maycount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Almathuraat"){
                 this.selectedalmathuraat.push(acts);
             }
            })
  })
  }else if(this.sort == "jun"){
    this.total.juncount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Almathuraat"){
             this.selectedalmathuraat.push(acts);
         }
        })
  })
  }else if(this.sort == "jul"){
    this.total.julcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Almathuraat"){
             this.selectedalmathuraat.push(acts);
         }
        })
  })
  }else if(this.sort == "aug"){
    this.total.augcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Almathuraat"){
             this.selectedalmathuraat.push(acts);
         }
        })
  })
  }else if(this.sort == "sep"){
    this.total.sepcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Almathuraat"){
             this.selectedalmathuraat.push(acts);
         }
        })
  })
  }else if(this.sort == "oct"){
    this.total.octcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Almathuraat"){
             this.selectedalmathuraat.push(acts);
         }
        })
  })
  }else if(this.sort == "nov"){
    this.total.novcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Almathuraat"){
             this.selectedalmathuraat.push(acts);
         }
        })
  })
  }else if(this.sort == "dec"){
    this.total.deccount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Almathuraat"){
             this.selectedalmathuraat.push(acts);
         }
        })
  })
  }
}

chooseziyaarahmonth(){
   if(this.sort == "jan"){
    this.total.jancount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Ziyaarah"){
             this.selectedziyaarah.push(acts);
         }
        })
       })    
      }else if(this.sort == "feb"){
        this.total.febcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Ziyaarah"){
                 this.selectedziyaarah.push(acts);
             }
            })
      })
      }else if(this.sort == "mar"){
        this.total.marcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Ziyaarah"){
                 this.selectedziyaarah.push(acts);
             }
            })
      })
      }else if(this.sort == "apr"){
        this.total.aprcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Ziyaarah"){
                 this.selectedziyaarah.push(acts);
             }
            })
      })
      }else if(this.sort == "may"){
        this.total.maycount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Ziyaarah"){
                 this.selectedziyaarah.push(acts);
             }
            })
  })
  }else if(this.sort == "jun"){
    this.total.juncount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Ziyaarah"){
             this.selectedziyaarah.push(acts);
         }
        })
  })
  }else if(this.sort == "jul"){
    this.total.julcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Ziyaarah"){
             this.selectedziyaarah.push(acts);
         }
        })
  })
  }else if(this.sort == "aug"){
    this.total.augcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Ziyaarah"){
             this.selectedziyaarah.push(acts);
         }
        })
  })
  }else if(this.sort == "sep"){
    this.total.sepcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Ziyaarah"){
             this.selectedziyaarah.push(acts);
         }
        })
  })
  }else if(this.sort == "oct"){
    this.total.octcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Ziyaarah"){
             this.selectedziyaarah.push(acts);
         }
        })
  })
  }else if(this.sort == "nov"){
    this.total.novcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Ziyaarah"){
             this.selectedziyaarah.push(acts);
         }
        })
  })
  }else if(this.sort == "dec"){
    this.total.febcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Ziyaarah"){
             this.selectedziyaarah.push(acts);
         }
        })
  })
  }
}

chooseothersmonth(){
   if(this.sort == "jan"){
    this.total.jancount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Others"){
             this.selectedothers.push(acts);
         }
        })
       })    
      }else if(this.sort == "feb"){
        this.total.febcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Others"){
                 this.selectedothers.push(acts);
             }
            })
      })
      }else if(this.sort == "mar"){
        this.total.marcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Others"){
                 this.selectedothers.push(acts);
             }
            })
      })
      }else if(this.sort == "apr"){
        this.total.aprcount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Others"){
                 this.selectedothers.push(acts);
             }
            })
      })
      }else if(this.sort == "may"){
        this.total.maycount.filter(count =>{
            count.filter(acts=>{
             if(acts.Name == "Others"){
                 this.selectedothers.push(acts);
             }
            })
  })
  }else if(this.sort == "jun"){
    this.total.juncount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Others"){
             this.selectedothers.push(acts);
         }
        })
  })
  }else if(this.sort == "jul"){
    this.total.julcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Others"){
             this.selectedothers.push(acts);
         }
        })
  })
  }else if(this.sort == "aug"){
    this.total.augcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Others"){
             this.selectedothers.push(acts);
         }
        })
  })
  }else if(this.sort == "sep"){
    this.total.sepcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Others"){
             this.selectedothers.push(acts);
         }
        })
  })
  }else if(this.sort == "oct"){
    this.total.octcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Others"){
             this.selectedothers.push(acts);
         }
        })
  })
  }else if(this.sort == "nov"){
    this.total.novcount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Others"){
             this.selectedothers.push(acts);
         }
        })
  })
  }else if(this.sort == "dec"){
    this.total.deccount.filter(count =>{
        count.filter(acts=>{
         if(acts.Name == "Others"){
             this.selectedothers.push(acts);
         }
        })
  })
  }
}

calculatesalah(){
  this.selectedsalah.filter(count=>{
    for(let i=0; i<=4; i++){
      if(count.Acts[i].name == "Subh"){
        this.subharray.push(count.Acts[i].IsdoneCount);
          } 
      }
      })
      this.subh = this.subharray.reduce((a,b)=> a+b, 0);
      console.log("first test", this.subh)

   this.selectedsalah.filter(count=>{
    for(let i=0; i<=4; i++){
      if(count.Acts[i].name == "Zuhr"){
        this.zuhrarray.push(count.Acts[i].IsdoneCount);
          } 
      }
      })
      this.zuhr = this.zuhrarray.reduce((a,b)=> a+b, 0);   
      console.log("first test", this.zuhr)

      this.selectedsalah.filter(count=>{
        for(let i=0; i<=4; i++){
          if(count.Acts[i].name == "Asr"){
            this.asrarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.asr = this.asrarray.reduce((a,b)=> a+b, 0);  

  this.selectedsalah.filter(count=>{
        for(let i=0; i<=4; i++){
          if(count.Acts[i].name == "Maghrib"){
            this.maghribarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.maghrib = this.maghribarray.reduce((a,b)=> a+b, 0);  

  this.selectedsalah.filter(count=>{
        for(let i=0; i<=4; i++){
          if(count.Acts[i].name == "Ishaa"){
            this.ishaarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.isha = this.ishaarray.reduce((a,b)=> a+b, 0);  
  }
  calculatetatawwu(){
    this.selectedtatawwu.filter(count=>{
        for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Tahajjud"){
            this.Tahajjudarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Tahajjud = this.Tahajjudarray.reduce((a,b)=> a+b, 0);  
          console.log("tatawwu", this.Tahajjud)
     this.selectedtatawwu.filter(count=>{
        for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Duha"){
            this.Duhaarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Duha = this.Duhaarray.reduce((a,b)=> a+b, 0);  
    this.selectedtatawwu.filter(count=>{
        for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Sawm"){
            this.Sawmarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Sawm = this.Sawmarray.reduce((a,b)=> a+b, 0);  
    this.selectedtatawwu.filter(count=>{
        for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Taobah"){
            this.Taobaharray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Taobah = this.Taobaharray.reduce((a,b)=> a+b, 0);  
      }
calculatequran(){
    this.selectedquran.filter(count=>{
        for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Tilaawah"){
            this.Tilaawaharray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Tilaawah = this.Tilaawaharray.reduce((a,b)=> a+b, 0);  
      this.selectedquran.filter(count=>{
        for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Hifz"){
            this.Hifzarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Hifz = this.Hifzarray.reduce((a,b)=> a+b, 0);   
     this.selectedquran.filter(count=>{
        for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Revision"){
            this.Revisionarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Revision = this.Revisionarray.reduce((a,b)=> a+b, 0); 
     this.selectedquran.filter(count=>{
        for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Tafsir"){
            this.Tafsirarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Tafsir = this.Tafsirarray.reduce((a,b)=> a+b, 0); 
      }
calculatealmathuraat(){
    this.selectedalmathuraat.filter(count=>{
        for(let i=0; i<=1; i++){
          if(count.Acts[i].name == "Morning"){
            this.Morningarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Morning = this.Morningarray.reduce((a,b)=> a+b, 0); 
    this.selectedalmathuraat.filter(count=>{
        for(let i=0; i<=1; i++){
          if(count.Acts[i].name == "Evening"){
            this.Eveningarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
          this.Evening = this.Eveningarray.reduce((a,b)=> a+b, 0); 
      }
calculateziyaarah(){
      this.selectedziyaarah.filter(count=>{
        for(let i=0; i<=3; i++){
            if(count.Acts[i].name == "Qubuur"){
              this.Qubuurarray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.Qubuur = this.Qubuurarray.reduce((a,b)=> a+b, 0); 
     this.selectedziyaarah.filter(count=>{
              for(let i=0; i<=3; i++){
          if(count.Acts[i].name == "Brother"){
            this.Brotherarray.push(count.Acts[i].IsdoneCount);
              } 
          }
          })
        this.Brother = this.Brotherarray.reduce((a,b)=> a+b, 0); 
          this.selectedziyaarah.filter(count=>{
            for(let i=0; i<=3; i++){
                if(count.Acts[i].name == "Hospital"){
                  this.Hospitalarray.push(count.Acts[i].IsdoneCount);
                    } 
                }
                })
                this.Hospital = this.Hospitalarray.reduce((a,b)=> a+b, 0); 
          this.selectedziyaarah.filter(count=>{
            for(let i=0; i<=3; i++){
                if(count.Acts[i].name == "Solihin"){
                  this.Solihinarray.push(count.Acts[i].IsdoneCount);
                    } 
                }
                })
                this.Solihin = this.Solihinarray.reduce((a,b)=> a+b, 0); 
      }
calculateothers(){
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Group Iftar"){
              this.GroupIftararray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.GroupIftar = this.GroupIftararray.reduce((a,b)=> a+b, 0); 
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Book Reading"){
              this.BookReadingarray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.BookReading = this.BookReadingarray.reduce((a,b)=> a+b, 0); 
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Riyaafah"){
              this.Riyaadaharray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.Riyaadah = this.Riyaadaharray.reduce((a,b)=> a+b, 0); 
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Halqah"){
              this.Halqaharray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.Halqah = this.Halqaharray.reduce((a,b)=> a+b, 0); 
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Sadaqah"){
              this.Sadaqaharray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.Sadaqah = this.Sadaqaharray.reduce((a,b)=> a+b, 0); 
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Fardiyyah"){
              this.Fardiyyaharray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.Fardiyyah = this.Fardiyyaharray.reduce((a,b)=> a+b, 0); 
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Family Sitting"){
              this.Familyarray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.Family = this.Familyarray.reduce((a,b)=> a+b, 0); 
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Remembrance"){
              this.Remembrancearray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.Remembrance = this.Remembrancearray.reduce((a,b)=> a+b, 0); 
      this.selectedothers.filter(count=>{
        for(let i=0; i<=8; i++){
            if(count.Acts[i].name == "Rabitoh"){
              this.Rabitoharray.push(count.Acts[i].IsdoneCount);
                } 
            }
            })
        this.Rabitoh = this.Rabitoharray.reduce((a,b)=> a+b, 0); 
      }

}
