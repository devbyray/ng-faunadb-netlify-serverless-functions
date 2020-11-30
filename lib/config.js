import faunadb from 'faunadb'
require('dotenv').config()

const headers = {
	'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
	'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
	'Access-Control-Allow-Origin': '*',
}

const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
})

export { client, headers }
