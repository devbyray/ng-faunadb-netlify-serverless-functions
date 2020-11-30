import { Component, OnInit } from '@angular/core'
import { ProductData } from '../../models/product'
import { ProductService } from '../../service/product.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-product-admin',
	templateUrl: './product-admin.component.html',
	styleUrls: ['./product-admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
	public products: ProductData[] = []
	public displayedColumns: string[] = ['id', 'name', 'price', 'actions']
	public dataSource = null

	constructor(private productService: ProductService, private router: Router) {}

	ngOnInit(): void {
		console.log('dataSource: ', this.dataSource)
		this.getProductData()
	}

	deleteProduct(productId: string): void {
		this.productService
			.deleteProduct(productId)
			.then((result) => {
				this.getProductData()
			})
			.catch((error) => {
				console.log(error)
			})
	}

	getProductData(): void {
		this.productService.getProducts().then((products: ProductData[]) => {
			console.log(products)
			this.products = products
			this.dataSource = products
		})
	}
}
