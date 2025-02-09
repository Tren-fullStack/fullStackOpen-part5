const Blog = ({ blog }) => (
  <div>
    <li>{blog.title}, written by {blog.author}</li>
  </div>  
)

export default Blog