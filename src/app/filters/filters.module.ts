import {NgModule} from '@angular/core';
import {SanitizeHtml} from './sanitize-html';
import {SanitizeStyle} from './sanitize-style';
import {TruncateText} from './truncate-text';
import {TranslateModule} from '@ngx-translate/core';
import {TruncateNumber} from './truncate-number';

@NgModule({
  imports: [
    TranslateModule
  ],
  declarations: [
    SanitizeHtml,
    SanitizeStyle,
    TruncateText,
    TruncateNumber
  ],
  exports: [
    SanitizeHtml,
    SanitizeStyle,
    TruncateText,
    TruncateNumber
  ]
})
export class FiltersModule {
}
