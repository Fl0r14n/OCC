import {Component} from '@angular/core';
import {ProductsService} from '../../providers/products-service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'my-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent {
  model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private productsService: ProductsService) {
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.productsService.search({query: term, fields: 'FULL'}).map(value => value.products).do(() => this.searchFailed = false).catch(() => {
          this.searchFailed = true;
          return Observable.of([]);
        })
      )
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  formatter = (x: { name: string }) => x.name;
}
