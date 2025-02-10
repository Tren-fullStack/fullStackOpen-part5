const AddBlogForm = ({ title, author, url, onTitleChange, onAuthorChange, onUrlChange, handleSubmitBlog, onClick, showWhenVisible }) => {
  return(
  <form method='post' onSubmit={handleSubmitBlog} style={showWhenVisible}>
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
      <button type='button' onClick={onClick}>cancel</button>
    </div>
  </form>
  )
}

export default AddBlogForm