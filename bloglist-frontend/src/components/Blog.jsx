import { useState } from 'react'

const Blog = ({ blog, name, user, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const hideDetails = { display: blogDetailsVisible ? 'none' : '' }
  const showDetails = { display: blogDetailsVisible ? '' : 'none' }

  return(
    <div style={blogStyle}>
      {blog.title}, written by {blog.author}
      <button  style={hideDetails} type='button' onClick={() => setBlogDetailsVisible(true)}>view</button>
      <button style={showDetails} type='button' onClick={() => setBlogDetailsVisible(false)}>hide</button>
      <div style={showDetails}>
        {blog.url}<br></br>
        likes {blog.likes}<button type='button'>like</button><br></br>
        {name}<br></br>
        <button type='button' onClick={() => handleRemove(blog.blogId, user, blog.title, blog.author)}>remove</button>
      </div>
    </div>
  )  
}

export default Blog