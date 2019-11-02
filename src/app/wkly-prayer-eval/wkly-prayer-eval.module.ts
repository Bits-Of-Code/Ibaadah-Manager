import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WklyPrayerEvalPage } from './wkly-prayer-eval.page';

const routes: Routes = [
  {
    path: '',
    component: WklyPrayerEvalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [WklyPrayerEvalPage]
})
export class WklyPrayerEvalPageModule {}
