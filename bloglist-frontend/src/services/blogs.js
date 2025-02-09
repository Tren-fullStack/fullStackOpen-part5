import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blogInfo, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  const request = await axios.post(baseUrl, blogInfo, config)
  return request.data
}

export default { getAll, createBlog }