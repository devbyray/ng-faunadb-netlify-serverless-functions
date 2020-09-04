import { ProductService } from '../lib/product-service.js'
import { client, headers } from '../lib/config.js'

const service = new ProductService({ client })

exports.handler = async (event, context) => {
	console.log('Function `product-update` invoked')

	const { body, path } = event
	const productId = path.substr(path.lastIndexOf('/') + 1)

	if (event.httpMethod === 'OPTIONS') {
		return { statusCode: 200, headers, body: 'Ok' }
	}

	const parsedBody = JSON.parse(body)
	console.log('parsedBody: ', parsedBody)

	if (!parsedBody) {
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify({ message: 'Some product data is missing', parsedBody }),
		}
	}

	if (event.httpMethod !== 'PUT') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	}

	try {
		let product = null
		if (event.httpMethod === 'PUT' && productId) {
			product = await service.updateProduct(productId, parsedBody)
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
