import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

const SALAHMONTHLY_KEY = 'salahmonthly'
const TATAWWUMONTHLY_KEY = 'tatawwumonthly'
const QURANMONTHLY_KEY = 'quranmonthly'
const ALMATHURAATMONTHLY_KEY = 'almathuraatmonthly'
const ZIYAARAHMONTHLY_KEY = 'ziyaarahmonthly'
const OTHERSMONTHLY_KEY = 'othersmonthly'
const MONTHLYCOUNT_KEY = 'monthlycount'

const TOTALCOUNT_KEY = 'totalcount'

@Injectable({
    providedIn: 'root'
  })
  export class ibaadahTotalService {
      constructor(public storage: Storage){}

      public totalkey = TOTALCOUNT_KEY

      public monthlycount: any[] = [];
      public jancount: any[] = [];
      public febcount: any[] = [];
      public marcount: any[] = [];
      public aprcount: any[] = [];
      public maycount: any[] = [];
      public juncount: any[] = [];
      public julcount: any[] = [];
      public augcount: any[] = [];
      public sepcount: any[] = [];
      public octcount: any[] = [];
      public novcount: any[] = [];
      public deccount: any[] = [];


    }