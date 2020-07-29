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
}
