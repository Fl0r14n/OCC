import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'myTruncateText'
})
export class TruncateText implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    if (args[0]) {
      let wordCount = args[0];
      let result = this.buildText(value, wordCount);
      if (args[1]) {
        while (result.length > args[1]) {
          result = this.buildText(value, --wordCount);
        }
      }
      return result;
    }
    return value;
  }

  private buildText(value, words) {
    return value.split(' ').slice(0, words).join(' ') + '...';
  }
}
