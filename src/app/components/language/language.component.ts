import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'my-language',
  templateUrl: 'language.component.html',
  styleUrls: ['language.component.scss']
})
export class LanguageComponent {

  constructor(private translate: TranslateService) {
  }
}
