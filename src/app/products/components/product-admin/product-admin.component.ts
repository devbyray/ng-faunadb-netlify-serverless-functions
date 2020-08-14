import { Component, OnInit } from '@angular/core'
import { ProductData } from '../../models/product'
import { ProductService } from '../../service/product.service'

@Component({
	selector: 'app-product-admin',
	templateUrl: './product-admin.component.html',
	styleUrls: ['./product-admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
	public products: ProductData[] = []
	public displayedColumns: string[] = ['id', 'name', 'price', 'actions']
	public dataSource = null

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		console.log('dataSource: ', this.dataSource)
		this.productService.getProducts().then((products: ProductData[]) => {
			console.log(products)
			this.products = products
			this.dataSource = products
			console.log('dataSource: ', this.dataSource)
		})
	}
}
