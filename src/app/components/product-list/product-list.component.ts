import {Component} from '@angular/core';
import {DataTableParams} from 'ngx-datatable-bootstrap4';
import {ProductsService} from '../../providers/occ/products-service';
import {ProductWsDTO, SortableRequestWsDTO} from '../../providers/types/ycommercewebservices';

@Component({
  selector: 'my-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss']
})
export class ProductListComponent {

  items: ProductWsDTO[] = [];
  itemCount = 0;

  constructor(private productService: ProductsService) {
  }

  reloadItems(params: DataTableParams) {
    const query: {
      query?: string
    } & SortableRequestWsDTO = {
      pageSize: params.limit,
      currentPage: Math.floor(params.offset / params.limit)
    };
    if (params.sortBy) {
      query.sort = `${params.sortBy}-${params.sortAsc ? 'asc' : 'desc'}`;
    }
    this.productService.search(query).subscribe(searchResult => {
      this.items = searchResult.products;
      this.itemCount = searchResult.pagination.totalResults;
    });
  }

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) {
    return item.description ? item.description.replace(/<\s*br[^>]?>/, '\n').replace(/(<([^>]+)>)/g, '') : '';
  }
}


