import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import {TranslateModule} from '@ngx-translate/core';
import {ScrollCollapseModule} from '@thisissoon/angular-scroll-collapse';
import {AnimationsModule} from '../animations/animations.module';
import {AppRoutingModule} from '../app.routing';
import {FiltersModule} from '../filters/filters.module';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MapComponent} from './map/map.component';
import {LanguageComponent} from './language/language.component';
import {LoginComponent} from './login/login.component';
import {OAuthModule} from '../oauth/oauth';
import {SearchComponent} from './search/search.component';
import {ProductInlineComponent} from './product-inline/product-inline.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TranslateModule,
    NgbModule,
    FiltersModule,
    AgmCoreModule,
    ScrollCollapseModule,
    AnimationsModule,
    OAuthModule,
  ],
  declarations: [
    MapComponent,
    FooterComponent,
    HeaderComponent,
    LanguageComponent,
    LoginComponent,
    SearchComponent,
    ProductInlineComponent
  ],
  exports: [
    MapComponent,
    FooterComponent,
    HeaderComponent,
    LanguageComponent,
    LoginComponent,
    SearchComponent,
    ProductInlineComponent
  ]
})
export class ComponentsModule {
}
