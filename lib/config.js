import faunadb from 'faunadb'
require('dotenv').config()

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
}

const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
})

export { client, headers }
