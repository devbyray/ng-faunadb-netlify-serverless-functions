export class ProductService {
	constructor(data) {
		this.q = data.q
		this.client = data.client
	}

	async getProducts() {
		return new Promise((resolve, reject) => {
			this.client
				.query(this.q.Paginate(this.q.Match(this.q.Ref('indexes/all_products'))))
				.then((response) => {
					const productRefs = response.data

					console.log('Product refs', productRefs)
					console.log(`${productRefs.length} todos found`)

					const getAllProductDataQuery = productRefs.map((ref) => {
						return this.q.Get(ref)
					})
					// then query the refs
					this.client.query(getAllProductDataQuery).then((ret) => {
						resolve(ret)
					})
				})
				.catch((error) => {
					console.log('error', error)

					reject(error)
				})
		})
	}
}
