import { useState } from 'react'

const AddBlogForm = ({ title, author, url, onTitleChange, onAuthorChange, onUrlChange, handleSubmitBlog }) => {
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
  </form>
  )
}

export default AddBlogForm