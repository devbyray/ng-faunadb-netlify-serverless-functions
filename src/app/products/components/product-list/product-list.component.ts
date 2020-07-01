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
		this.product.getProducts().then((products: Product[]) => {
			const cleanedData = products.map((productItem: Product) => {
				const tempProduct = { ...productItem }

				switch (tempProduct.data.name) {
					case 'Pizza':
						tempProduct.data.image =
							'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80'
						break
					case 'Beef Cheek':
						tempProduct.data.image =
							'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80'
						break

					case 'Cup':
						tempProduct.data.image =
							'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80'
						break

					default:
						break
				}

				return new Product(tempProduct).data
			})
			this.products = cleanedData
		})
	}
}
