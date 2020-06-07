import { ProductService } from '../lib/product-service.js'
import { client, headers } from '../lib/config.js'

const service = new ProductService({ client })

exports.handler = async (event, context) => {
	console.log('Function `products` invoked')

	if (event.httpMethod !== 'GET') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	}

	try {
		const products = await service.getProducts()
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(products),
		}
	} catch (error) {
		console.log('error', error)

		return {
			statusCode: 400,
			headers,
			body: JSON.stringify(error),
		}
	}
}
