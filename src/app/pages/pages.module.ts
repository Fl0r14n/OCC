import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HomePageComponent} from './home/home.page';
import {AppRoutingModule} from '../app.routing';
import {ComponentsModule} from '../components/components.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    HomePageComponent,
  ],
  exports: [
    HomePageComponent,
  ]
})
export class PagesModule {
}
