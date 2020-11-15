import { UsersService } from '../lib/user-service.js'
import { client, headers } from '../lib/config.js'

const service = new UsersService({ client })

exports.handler = async (event, context) => {
  console.log('Function `user-find-by-email` invoked')

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'Ok' }
  }

  const { path } = event
  const userEmail = path.substr(path.lastIndexOf('/') + 1)
  console.log('userEmail: ', userEmail)

  if (!userEmail) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Some user data is missing', userEmail }),
    }
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' }
  }

  try {
    const user = await service.userByEmail(userEmail)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(user),
    }
  } catch (error) {
    console.log('error', error)

    if (error === 'This user cannot be found') {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify(error),
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify(error),
      }
    }


  }
}
