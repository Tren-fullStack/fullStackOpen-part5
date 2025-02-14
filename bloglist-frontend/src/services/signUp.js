import axios from 'axios'
const baseUrl = '/api/users'

const trySignUp = async (userInfo) => {
  const response = await axios.post(baseUrl, userInfo)
  return response.data
}

export default { trySignUp }
