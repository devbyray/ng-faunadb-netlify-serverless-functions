import faunadb from 'faunadb'
const q = faunadb.query

export class UsersService {
	constructor(data) {
		this.client = data.client
	}

	async createUser(user) {

    return new Promise(async (resolve, reject) => {

      console.log('User Service FUNC: ', user)
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
			this.client
        .query(q.Paginate(q.Match(q.Index('users_by_email'), username)))
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
    console.log('login: ', body)
    const { username, password } = body


    return new Promise((resolve, reject) => {
			// Find user by username
			this.client
				.query(
          q.Login(q.Match(q.Index('users_by_email'), username), {
						password: password,
					}),
				)
				.then((response) => {
					const { secret } = response

          console.log('usersLogin refs', response)

					resolve({
						token: secret,
					})
				})
				.catch((error) => {
					console.log('error', error)

          const { name, description, requestResult: { statusCode } } = error

					reject({
            status: statusCode,
						error: name,
            message: description,
					})
				})
		})
	}
}
