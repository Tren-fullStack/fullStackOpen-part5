import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const removeBlog = async (blogInfo, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  try {
    await axios.delete(`${baseUrl}/${blogInfo}`, config)
  } catch (err){
    const unathorized = `Cannot delete other user\'s posts`
    return unathorized
  }
}

const createBlog = async (blogInfo, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  try {
    const request = await axios.post(baseUrl, blogInfo, config)
    return request.data
  } catch (err){
    console.log('something fucked up', err)
  }
}

export default { getAll, createBlog, removeBlog }