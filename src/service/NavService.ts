import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

    data: any;

  constructor(private navCtrl: NavController) { }
  push(pagename: string, data: any = '') {
        this.data = data;
  
        this.navCtrl.navigateForward(pagename);
    }
  
    pop(pagename) {
        this.navCtrl.navigateBack(pagename);
    }
  
    get(key: string) {
        return this.data[key];
    } 
}
