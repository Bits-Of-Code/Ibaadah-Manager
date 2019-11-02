import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'options', loadChildren: './options/options.module#OptionsPageModule' },
  { path: 'sidemenu', loadChildren: './sidemenu/sidemenu.module#SidemenuPageModule' },
  { path: 'wkly-prayer-eval', loadChildren: './wkly-prayer-eval/wkly-prayer-eval.module#WklyPrayerEvalPageModule' },
  { path: 'monthly-evaluation', loadChildren: './monthly-evaluation/monthly-evaluation.module#MonthlyEvaluationPageModule' },
  { path: 'fromstart', loadChildren: './fromstart/fromstart.module#FromstartPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
