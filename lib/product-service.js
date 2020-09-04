import faunadb from 'faunadb'
const q = faunadb.query

export class ProductService {
	constructor(data) {
		this.client = data.client
	}

	async getProducts() {
		return new Promise((resolve, reject) => {
			const query = q.Let(
				{
					productRefs: q.Paginate(q.Match(q.Ref('indexes/all_products'))),
					products: q.Map(q.Var('productRefs'), q.Lambda(['ref'], q.Get(q.Var('ref')))),
				},
				q.Var('products'),
			)
			this.client
				.query(query)
				.then((response) => {
					resolve(response)
				})
				.catch((error) => {
					console.log('error', error)
					reject(error)
				})
		})
	}

	async getProductById(id) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('No ID provided')
			}
			this.client
				.query(q.Get(q.Ref(q.Collection('products'), id)))
				.then((response) => {
					console.log('response', response)
					resolve(response)
				})
				.catch((error) => {
					console.log('error', error)

					reject(error)
				})
		})
	}

	async createNewProduct(product) {
		return new Promise((resolve, reject) => {
			if (!product) {
				reject('No product data provided')
			}

			this.client
				.query(
					q.Create(q.Collection('products'), {
						data: product,
					}),
				)
				.then((result) => {
					resolve(result)
				})
				.catch((error) => {
					console.log('createNewProduct', error)

					reject(error)
				})
		})
	}

	async updateProduct(productId, product) {
		const filterdProduct = await this.filterUnChangedKeys(product)

		console.log('updateProduct', filterdProduct)

		return new Promise((resolve, reject) => {
			if (!product || !filterdProduct) {
				reject('No product data provided')
			}

			this.client
				.query(q.Update(q.Ref(q.Collection('products'), productId), { data: filterdProduct }))
				.then((result) => {
					resolve(result)
				})
				.catch((error) => {
					console.log('updateProduct', error)

					reject(error)
				})
		})
	}

	async filterUnChangedKeys(product) {
		const originalProduct = await this.getProductById(product.id)
		return new Promise((resolve, reject) => {
			if (!originalProduct) {
				reject(originalProduct)
			}
			const tempProduct = {}
			for (const key in product) {
				const value = product[key]
				if (value !== originalProduct.data[key] && key !== 'id' && key !== 'storehouse') {
					tempProduct[key] = value
				}
			}
			resolve(tempProduct)
		})
	}
}
