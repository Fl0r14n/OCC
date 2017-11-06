import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'myTruncateNumber'
})
export class TruncateNumber implements PipeTransform {

  i18n: any[];

  constructor(i18nService: TranslateService) {
    i18nService.stream([
      'truncateNumber.thousand',
      'truncateNumber.million',
      'truncateNumber.billion'
    ]).subscribe((value) => {
      this.i18n = value;
    });
  }

  transform(value: number, ...args: any[]): string {
    if (Math.floor(value / 1000000000) > 0) {
      return `${value / 1000000000}${this.i18n['truncateNumber.billion']}`;
    } else if (Math.floor(value / 1000000) > 0) {
      return `${value / 1000000}${this.i18n['truncateNumber.million']}`;
    } else if (Math.floor(value / 1000) > 0) {
      return `${value / 1000}${this.i18n['truncateNumber.thousand']}`;
    }
    return `${value}`;
  }
}
