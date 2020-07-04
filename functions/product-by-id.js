import { ProductService } from '../lib/product-service.js'
import { client, headers } from '../lib/config.js'

const service = new ProductService({ client })

exports.handler = async (event, context) => {
	console.log('Function `products` invoked')

	const { path } = event
	const productId = path.substr(path.lastIndexOf('/') + 1)

	if (!productId) {
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify({ message: 'Product ID is missing' }),
		}
	}

	if (event.httpMethod !== 'GET') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	}

	try {
		const product = await service.getProductById(productId)
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(product),
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
