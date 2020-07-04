import faunadb from 'faunadb'
const q = faunadb.query

export class ProductService {
	constructor(data) {
		this.client = data.client
	}

	async getProducts() {
		return new Promise((resolve, reject) => {
			this.client
				.query(q.Paginate(q.Match(q.Ref('indexes/all_products'))))
				.then((response) => {
					const productRefs = response.data
					const getAllProductDataQuery = q.Map(productRefs, q.Lambda(['ref'], q.Get(q.Var('ref'))))

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
}
