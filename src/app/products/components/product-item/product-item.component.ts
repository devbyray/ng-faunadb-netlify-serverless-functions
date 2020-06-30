import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../../service/product.service'
import { ProductData, Product } from '../../models/product'

@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
	public id: string = ''
	public productItem: ProductData = null

	constructor(private product: ProductService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.id = params?.id
		})

		this.product.getProductById(this.id).then((data: Product) => {
			console.log('data', data.data)
			this.productItem = data.data
		})
	}
}
