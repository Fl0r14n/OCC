import {Component, Input} from '@angular/core';
import {ProductWsDTO} from '../../providers/types/ycommercewebservices';

@Component({
  selector: 'my-product-inline',
  templateUrl: 'product-inline.component.html',
  styleUrls: ['product-inline.component.scss']
})
export class ProductInlineComponent {

  @Input()
  product: ProductWsDTO
}
