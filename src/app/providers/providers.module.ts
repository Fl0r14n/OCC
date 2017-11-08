import {NgModule} from '@angular/core';
import {CardTypesService} from './card-types-service';
import {CatalogsService} from './catalogs-service';
import {CurrenciesService} from './currencies-service';
import {CustomerGroupsService} from './customer-groups-service';
import {DeliveryCountriesService} from './delivery-countries-service';
import {ExportService} from './export-service';
import {FeedsService} from './feeds-service';
import {ForgottenPasswordTokensService} from './forgotten-password-tokens-service';
import {LanguagesService} from './languages-service';
import {OrdersService} from './orders-service';
import {ProductsService} from './products-service';
import {PromotionsService} from './promotions-service';
import {StoresService} from './stores-service';
import {TitlesService} from './titles-service';
import {UsersService} from './users-service';
import {VoucherService} from './voucher-service';
import {AuthentificationService} from './authentification-service';

@NgModule({
  providers: [
    AuthentificationService,
    TokenInterceptor,
    CardTypesService,
    CatalogsService,
    CurrenciesService,
    CustomerGroupsService,
    DeliveryCountriesService,
    ExportService,
    FeedsService,
    ForgottenPasswordTokensService,
    LanguagesService,
    OrdersService,
    ProductsService,
    PromotionsService,
    StoresService,
    TitlesService,
    UsersService,
    VoucherService
  ]
})
export class ProvidersModule {
}
