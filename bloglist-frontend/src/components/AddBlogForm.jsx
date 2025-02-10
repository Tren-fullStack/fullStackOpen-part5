import { useState } from 'react'
import Blog from './Blog'

const AddBlogForm = ({ title, author, url, onTitleChange, onAuthorChange, onUrlChange, handleSubmitBlog, blogs, user, handleRemove, handleAddLike }) => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  
  return(
  <form method='post' onSubmit={handleSubmitBlog}>
    <div style={hideWhenVisible}>
      <button type='button' onClick={() => setCreateBlogVisible(true)}>new blog</button>
    </div>
    <div style={showWhenVisible}>
      <h2>create new</h2>  
      <div>
        title:
        <input
        type='text'
        value={title}
        name='title'
        onChange={onTitleChange}
        />
      </div>
      <div>
        author:
        <input
        type='text'
        value={author}
        name='author'
        onChange={onAuthorChange}
        />
      </div>
      <div>
        url:
        <input
        type='text'
        value={url}
        name='url'
        onChange={onUrlChange}
        />
      </div>
      <div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
    </div>
    <div>
      {blogs.map(blog => (
        <Blog key={blog.blogId} blog={blog} onViewClick={() => setBlogDetailsVisible(true)}
         name={blog.user.name} handleRemove={handleRemove} user={user} handleAddLike={handleAddLike}/>
      ))}
    </div>
  </form>
  )
}

export default AddBlogForm