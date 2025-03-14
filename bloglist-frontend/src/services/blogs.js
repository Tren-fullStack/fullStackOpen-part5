import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const removeBlog = async (blogId, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  try {
    await axios.delete(`${baseUrl}/${blogId}`, config)
  } catch {
    const unathorized = 'Cannot delete other user\'s posts'
    return unathorized
  }
}

const addLike = async (blogId) => {
  try {
    await axios.put(`${baseUrl}/${blogId}`)
  } catch(err) {
    console.log('something fucked up', err)
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

export default { getAll, createBlog, removeBlog, addLike }