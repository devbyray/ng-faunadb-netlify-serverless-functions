import { ProductService } from '../lib/product-service.js'
import { client, headers } from '../lib/config.js'

const service = new ProductService({ client })

exports.handler = async (event, context) => {
	console.log('Function `product-delete` invoked')

	const { path } = event
	const productId = path.substr(path.lastIndexOf('/') + 1)

	if (event.httpMethod === 'OPTIONS') {
		return { statusCode: 200, headers, body: 'Ok' }
	}

	if (event.httpMethod !== 'DELETE') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	}

	try {
		let product = null
		if (event.httpMethod === 'DELETE' && productId) {
			product = await service.deleteProduct(productId)
		}
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
