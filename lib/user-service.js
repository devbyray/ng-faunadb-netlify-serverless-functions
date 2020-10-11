import faunadb from 'faunadb'
const q = faunadb.query

export class UsersService {
	constructor(data) {
		this.client = data.client
	}

	async createUser(user) {
		if (!user && user?.email && user?.password) {
			reject('User data is missing')
		}

		return new Promise((resolve, reject) => {
			this.client
				.query(
					q.Create(q.Collection('users'), {
						data: {
							credentials: { password: user?.password },
							data: {
								email: user?.email,
							},
						},
					}),
				)
				.then((result) => {
					console.log('user result', result)
					resolve(result)
				})
				.catch((error) => {
					console.log('createUser', error)

					reject(error)
				})
		})
	}

	async userByEmail(body) {
		const parsedBody = JSON.parse(body)
		const { email } = parsedBody

		return new Promise((resolve, reject) => {
			// Find user by email
			// .query(this.q.Paginate(this.q.Match(this.q.Index('users_by_email'), email)))
			this.client
				.query(q.Get(q.Ref(q.Collection('users'), email)))
				.then(async (response) => {
					// When user is found, use USDER ID to try to login
					const refs = response.data

					console.log('users refs', refs)
					console.log(`${refs.length} users found`)

					const getAll = refs.map((ref) => {
						return this.q.Get(ref)
					})

					console.log('getAll: ', JSON.stringify(getAll[0]))

					console.log('userId: ', getAll[0])
					// then query the refs
					const users = await this.client.query(getAll)

					console.log('users: ', users)
					resolve(users)
				})
				.catch((error) => {
					console.log('error', error)

					reject(error)
				})
		})
	}

	async loginUser(body) {
		const parsedBody = JSON.parse(body)
		const { username, password } = parsedBody
		// console.log('body: ', JSON.stringify(parsedBody))

		// const userByEmail = await this.userByEmail(username)
		// const userRef = userByEmail.length === 1 ? userByEmail[0] : null
		// console.log('userRef: ', userRef)

		// Source: https://github.com/clamstew/netlify-faunadb-example2

		return new Promise((resolve, reject) => {
			// Find user by email
			this.client
				.query(
					this.q.Login(this.q.Match(this.q.Index('users_by_email'), username), {
						password: password,
					}),
				)
				.then((response) => {
					const { secret } = response

					console.log('usersLogin refs', secret)

					resolve({
						token: secret,
					})
				})
				.catch((error) => {
					console.log('error', error)

					const { name, message } = error

					reject({
						error: name,
						message: message,
					})
				})
		})
	}
}
