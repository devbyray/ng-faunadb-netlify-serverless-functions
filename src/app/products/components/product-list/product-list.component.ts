import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { Product, ProductData } from '../../models/product'

@Component({
	selector: 'product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
	products: ProductData[] = []

	constructor(private product: ProductService) {}

	ngOnInit(): void {
		this.product.getProducts().then((products: ProductData[]) => {
			this.products = products
		})
	}
}
