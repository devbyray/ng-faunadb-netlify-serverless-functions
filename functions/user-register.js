import { UsersService } from '../lib/user-service.js'
import { client, headers } from '../lib/config.js'

const service = new UsersService({ client })

exports.handler = async (event, context) => {
	console.log('Function `user-register` invoked')

	const { body } = event

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

	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	}

	try {
		const user = await service.createUser(parsedBody)
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(user),
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
