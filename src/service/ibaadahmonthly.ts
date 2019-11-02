import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

const SALAHMONTHLY_KEY = 'salahmonthly'
const TATAWWUMONTHLY_KEY = 'tatawwumonthly'
const QURANMONTHLY_KEY = 'quranmonthly'
const ALMATHURAATMONTHLY_KEY = 'almathuraatmonthly'
const ZIYAARAHMONTHLY_KEY = 'ziyaarahmonthly'
const OTHERSMONTHLY_KEY = 'othersmonthly'
const MONTHLYCOUNT_KEY = 'monthlycount'


@Injectable({
  providedIn: 'root'
})
export class ibaadahMonthlyService {
    constructor(public storage: Storage){}

public monthlycount: any[] = [];
public salahcount: any[] = [];
public tatawwucount: any[] = [];
public qurancount: any[] = [];
public almathuraatcount: any[] = [];
public ziyaarahcount: any[] = [];
public otherscount: any[] = [];

public salahmonthly: any[] = [];
public tatawwumonthly: any[] = [];
public quranmonthly: any[] = [];
public almathuraatmonthly: any[] = [];
public ziyaarahmonthly: any[] = [];
public othersmonthly: any[] = [];

public salahkey = SALAHMONTHLY_KEY
public tatawwukey = TATAWWUMONTHLY_KEY
public qurankey = QURANMONTHLY_KEY
public almathuraatkey = ALMATHURAATMONTHLY_KEY
public ziyaarahkey = ZIYAARAHMONTHLY_KEY
public otherskey = OTHERSMONTHLY_KEY
public countkey = MONTHLYCOUNT_KEY

SalahCount=[
    {name:"Subh", IsdoneCount: 0}, 
    {name:"Zuhr", IsdoneCount: 0},
    {name:"Asr", IsdoneCount: 0},
    {name:"Maghrib", IsdoneCount: 0},
    {name:"Ishaai", IsdoneCount: 0},
];
TatawwuCount = [
    {name: "Tahajjud", IsdoneCount: 0},
    {name: "Duha", IsdoneCount: 0},
    {name: "Sawm", IsdoneCount: 0},
    {name: "Taobah", IsdoneCount: 0},
];
QuranCount = [
    {name: "Tilaawah", IsdoneCount: 0},
    {name: "Hifz", IsdoneCount: 0},
    {name: "Revision", IsdoneCount: 0},
    {name: "Tafsir", IsdoneCount: 0},
];
AlmathuraatCount = [
    {name: "Morning", IsdoneCount: 0},
    {name: "Evening", IsdoneCount: 0},
];
ZiyaarahCount = [
    {name: "Qubuur", IsdoneCount: 0},
    {name: "Brother", IsdoneCount: 0},
    {name: "Hospital", IsdoneCount: 0},
    {name: "Solihin", IsdoneCount: 0},
];
OthersCount = [
    {name: "Group Iftar", IsdoneCount: 0},
    {name: "Book Reading", IsdoneCount: 0},
    {name: "Riyaadah", IsdoneCount: 0},
    {name: "Halqah", IsdoneCount: 0},
    {name: "Sadaqah", IsdoneCount: 0},
    {name: "Fardiyyah", IsdoneCount: 0},
    {name: "Family Sitting", IsdoneCount: 0},
    {name: "Remembrance", IsdoneCount: 0},
    {name: "Rabitoh", IsdoneCount: 0},
];

getweekly(day, ibaadahkey) {
    this.storage.get(ibaadahkey).then(data=>{
        data.filter(task =>{
            if(task.day == day){
                task.week
            }
        })
    })
}

setsalahmonthly(monthlytasks){
    this.storage.set(SALAHMONTHLY_KEY, monthlytasks);
}


settatawwumonthly(monthlytasks){
    this.storage.set(TATAWWUMONTHLY_KEY, monthlytasks);
}


setquranmonthly(monthlytasks){
    this.storage.set(QURANMONTHLY_KEY, monthlytasks);
}


setalmathuraatmonthly(monthlytasks){
    this.storage.set(ALMATHURAATMONTHLY_KEY, monthlytasks);
}


setziyaarahmonthly(monthlytasks){
    this.storage.set(ZIYAARAHMONTHLY_KEY, monthlytasks);
}


setothersmonthly(monthlytasks){
    this.storage.set(OTHERSMONTHLY_KEY, monthlytasks);
}

}