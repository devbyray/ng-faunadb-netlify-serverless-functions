import faunadb from 'faunadb'
const q = faunadb.query

export class UsersService {
	constructor(data) {
		this.client = data.client
	}

	async createUser(user) {

    return new Promise(async (resolve, reject) => {
      if (!user || !user.hasOwnProperty('username') || !user.hasOwnProperty('password')) {
        reject('User data is missing')
      }

      const userExists = await this.userByEmail(user?.username)

      console.log('userExists: ', userExists)

      if (userExists.length > 0) {
        reject('This user cannot be created')
      }

      this.client
				.query(
          q.Create(q.Collection('users'), {
							credentials: { password: user?.password },
							data: {
                username: user?.username,
                admin: user?.admin || false,
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

  async userByEmail(username) {
    return new Promise((resolve, reject) => {


      // Find user by username
      console.log('username', username);
			this.client
        .query(q.Paginate(q.Match(q.Index('users_by_username'), username)))
        .then(async (response) => {

          console.log('userByEmail', response);

          const refs = response.data
          const getAll = refs.map((ref) => {
            return q.Get(ref)
          })

					// then query the refs
          const users = await this.client.query(getAll)
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
			// Find user by username
			this.client
				.query(
          this.q.Login(this.q.Match(this.q.Index('users_by_username'), username), {
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
