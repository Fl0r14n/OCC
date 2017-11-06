import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AnimationsComponent} from './animations.component';

@NgModule({
  imports: [
    BrowserAnimationsModule
  ],
  declarations: [
    AnimationsComponent
  ],
  exports: [
    AnimationsComponent
  ]
})
export class AnimationsModule {
}
