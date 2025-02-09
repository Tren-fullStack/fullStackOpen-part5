const AddBlogForm = ({ title, author, url, onTitleChange, onAuthorChange, onUrlChange, handleSubmitBlog }) => {
  return(  
  <form method='post' onSubmit={handleSubmitBlog}>
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
    </div>
  </form>
  )
}

export default AddBlogForm