import {AgmCoreModule} from '@agm/core';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {ScrollCollapseModule} from '@thisissoon/angular-scroll-collapse';
import {DataTableModule} from 'ngx-datatable-bootstrap4';
import {AnimationsModule} from '../animations/animations.module';
import {AppRoutingModule} from '../app.routing';
import {FiltersModule} from '../filters/filters.module';
import {OAuthModule} from '../oauth/oauth';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {LanguageComponent} from './language/language.component';
import {LoginComponent} from './login/login.component';
import {MapComponent} from './map/map.component';
import {ProductInlineComponent} from './product-inline/product-inline.component';
import {ProductListComponent} from './product-list/product-list.component';
import {SearchComponent} from './search/search.component';


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
    DataTableModule
  ],
  declarations: [
    MapComponent,
    FooterComponent,
    HeaderComponent,
    LanguageComponent,
    LoginComponent,
    SearchComponent,
    ProductInlineComponent,
    ProductListComponent
  ],
  exports: [
    MapComponent,
    FooterComponent,
    HeaderComponent,
    LanguageComponent,
    LoginComponent,
    SearchComponent,
    ProductInlineComponent,
    ProductListComponent
  ]
})
export class ComponentsModule {
}
