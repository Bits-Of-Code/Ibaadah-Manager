import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

const SALAH_KEY = 'salahk'

@Injectable({
    providedIn: 'root'
  })

  export class StorageService{
 
             Salah = [
                {name: "Subh", id: 1, IsDone: false},
                {name: "Zuhr", id: 2, IsDone: false},
                {name: "Asr",  id: 3, IsDone: false},
                {name: "Maghrib", id: 4, IsDone: false},
                {name: "Ishaa",  id: 5, IsDone: false},
            ];
            public Tatawwu: any;
            public Quran: any;
            public AlMathuraat: any;
            public Ziyaarah: any;
            public Others: any;
            public SalahIsdoneCount:number = 0;
            public TatawwuIsdoneCount:number = 0;
            public QuranIsdoneCount:number = 0;
            public AlmathuraatIsdoneCount:number = 0;
            public ZiyaarahIsdoneCount:number = 0;
            public OthersIsdoneCount:number = 0;

    constructor(private storage: Storage){
        
    }
    clear(){
        this.storage.clear();
    }

  }