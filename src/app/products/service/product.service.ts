import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Product } from '../models/product'
@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private http: HttpClient) {}

	getProducts(): Promise<Product[]> {
		return this.http.get<Product[]>('http://localhost:9000/.netlify/functions/products').toPromise()
	}
}
