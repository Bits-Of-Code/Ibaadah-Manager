import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class TaskService{
    
    constructor(){}

            public Salah =[
                {name: "Subh", id: 1, IsDone: false},
                {name: "Zuhr", id: 1, IsDone: false},
                {name: "Asr", id: 1, IsDone: false},
                {name: "Maghrib", id: 1, IsDone: false},
                {name: "Ishaa", id: 1, IsDone: false},
             ];
            public Tatawwu = [
                {name: "Tahajjud", id: 2, IsDone: false},
                {name: "Duha", id: 2, IsDone: false},
                {name: "Sawm",  id: 2, IsDone: false},
                {name: "Taobah", id: 2, IsDone: false},
            ];
            public Quran = [
                {name: "Tilaawah", id: 3, IsDone: false},
                {name: "Hifz", id: 3, IsDone: false},
                {name: "Revision",  id: 3, IsDone: false},
                {name: "Tafsir", id: 3, IsDone: false},
            ];
            public AlMathuraat = [
                {name: "Morning", id: 4, IsDone: false},
                {name: "Evening", id: 4, IsDone: false},
            ];
            public Ziyaarah = [
                {name: "Qubuur", id: 5, IsDone: false},
                {name: "Brother", id: 5, IsDone: false},
                {name: "Hospital",  id: 5, IsDone: false},
                {name: "Solihin", id: 5, IsDone: false},
            ];
            public Others = [
                {name: "Group Iftar", id: 6, IsDone: false},
                {name: "Book Reading", id: 6, IsDone: false},
                {name: "Riyaadah",  id: 6, IsDone: false},
                {name: "Halqah", id: 6, IsDone: false},
                {name: "Sadaqah", id: 6, IsDone: false},
                {name: "Fardiyyah", id: 6, IsDone: false},
                {name: "Family Sitting",  id: 6, IsDone: false},
                {name: "Remembrance", id: 6, IsDone: false},
                {name: "Rabitoh", id: 6, IsDone: false},
            ];

            public dailycount =[
                {name:"salah", id: 1, IsdoneCount: 0}, 
                {name:"tatawwu", id: 2, IsdoneCount: 0},
                {name:"quran", id: 3, IsdoneCount: 0},
                {name:"almathuraat", id: 4, IsdoneCount: 0},
                {name:"ziyaarah", id: 5, IsdoneCount: 0},
                {name:"others", id: 6, IsdoneCount: 0},
             ];
            SalahCount=[
                {name:"Subh", IsdoneCount: 0}, 
                {name:"Zuhr", IsdoneCount: 0},
                {name:"Asr", IsdoneCount: 0},
                {name:"Maghrib", IsdoneCount: 0},
                {name:"Ishaa", IsdoneCount: 0},
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

            public missed: [];
            public counter:number;
            public counter2:number;
            public counter3:number;
            public counter4:number;
            public counter5:number;
            public counter6:number;
            
                                                   ///////////////////////////////////////                                  
                                                   //                                   //
                                                   //                                   //
                                                   //        NEW\TEST FEATURES          //
                                                   //                                   //
                                                   //                                   //
                                                   ///////////////////////////////////////
            
            public IbaadahWeekly: any[] = [];


}