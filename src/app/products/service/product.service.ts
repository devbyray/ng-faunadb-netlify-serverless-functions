import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Product, ProductData } from '../models/product'
import { environment } from 'src/environments/environment'
@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private http: HttpClient) {}

	public async getProducts(): Promise<ProductData[]> {
		let products = null
		let productsWithImages = null
		try {
			products = await this.http.get<Product[]>(environment.apiUrl + 'products').toPromise()
			console.log('products: ', products)
			productsWithImages = products?.data.map((productItem: Product) => new Product(this.getProductImage(productItem)).data)
		} catch (error) {
			console.error(error)
		}
		return productsWithImages
	}

	public async getProductById(id): Promise<ProductData> {
		if (!id) return
		const product = await this.http.get<Product>(environment.apiUrl + 'product-by-id/' + id).toPromise()
		return new Product(this.getProductImage(product)).data
	}

	private getProductImage(product: Product): Product {
		const tempProduct = { ...product }

		console.log('tempProduct:', tempProduct)

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

		return tempProduct
	}

	public async createNewProduct(productData) {
		if (!productData) return

		let product = null

		try {
			product = await this.http.post<Product>(environment.apiUrl + 'product-new/', productData).toPromise()
		} catch (error) {
			console.error('error: ', error)
			return error
		}
		return product
	}
}
