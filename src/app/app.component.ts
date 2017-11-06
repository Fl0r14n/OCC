import {Component, OnInit} from '@angular/core';

import '../style/app.scss';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(i18nService: TranslateService) {
    i18nService.addLangs(['en', 'de']);
    i18nService.setDefaultLang('en');
    let browserLang = i18nService.getBrowserLang();
    i18nService.use(browserLang.match(/en|de/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }
}
