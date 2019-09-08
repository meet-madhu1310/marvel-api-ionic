import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome-page',
    pathMatch: 'full'
  },
  {
    path: 'welcome-page',
    loadChildren: () => import('./welcome-page/welcome-page.module').then(m => m.WelcomePagePageModule)
  },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule' 
  },
  { 
    path: 'about', 
    loadChildren: './about/about.module#AboutPageModule' 
  },
  { 
    path: 'testing', 
    loadChildren: './testing/testing.module#TestingPageModule' 
  },
  { 
    path: 'view-comics', 
    loadChildren: './view-comics/view-comics.module#ViewComicsPageModule' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
