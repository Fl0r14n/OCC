import {RouterModule, Routes} from '@angular/router';
import {Component, NgModule} from '@angular/core';
import {HomePageComponent} from './pages/home/home.page';

@Component({
  template: '<h2>Page not found</h2>'
})
export class PageNotFoundComponent {
}

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      breadcrumb: 'Startseite'
    },
    children: [
      // {
      //   path: 'login',
      //   component: LoginPageComponent,
      //   data: {
      //     breadcrumb: 'Anmelden / Registrieren'
      //   }
      // },
    ]
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
