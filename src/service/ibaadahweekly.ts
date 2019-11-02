import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

const SALAHWEEKLY_KEY = 'salahweekly'
const TATAWWUWEEKLY_KEY = 'tatawwuweekly'
const QURANWEEKLY_KEY = 'quranweekly'
const ALMATHURAATWEEKLY_KEY = 'almathuraatweekly'
const ZIYAARAHWEEKLY_KEY = 'ziyaarahweekly'
const OTHERSWEEKLY_KEY = 'othersweekly'



@Injectable({
    providedIn: 'root'
  })
export class ibaadahweeklyService{

constructor(public storage: Storage){}

public salahWeekly: any[] = [];
public tatawwuWeekly: any[] = [];
public quranWeekly: any[] = [];
public almathuraatWeekly: any[] = [];
public ziyaarahWeekly: any[] = [];
public othersWeekly: any[] = [];

public salahkey = SALAHWEEKLY_KEY
public tatawwukey = TATAWWUWEEKLY_KEY
public qurankey = QURANWEEKLY_KEY
public almathuraatkey = ALMATHURAATWEEKLY_KEY
public ziyaarahkey = ZIYAARAHWEEKLY_KEY
public otherskey = OTHERSWEEKLY_KEY

setsalahweekly(weeklytasks){
    this.storage.set(SALAHWEEKLY_KEY, weeklytasks);
}


settatawwuweekly(weeklytasks){
    this.storage.set(TATAWWUWEEKLY_KEY, weeklytasks);
}


setquranweekly(weeklytasks){
    this.storage.set(QURANWEEKLY_KEY, weeklytasks);
}


setalmathuraatweekly(weeklytasks){
    this.storage.set(ALMATHURAATWEEKLY_KEY, weeklytasks);
}


setziyaarahweekly(weeklytasks){
    this.storage.set(ZIYAARAHWEEKLY_KEY, weeklytasks);
}


setothersweekly(weeklytasks){
    this.storage.set(OTHERSWEEKLY_KEY, weeklytasks);
}


}