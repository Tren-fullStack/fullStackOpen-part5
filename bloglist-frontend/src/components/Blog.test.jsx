import { queryByText, render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders just title and author', () => {
    const blog = {
        title: 'testing isnt fun but is necessary',
        author: 'Stephen D',
        url: 'http://testing.com',
    }
    // render the test blog component to DOM
    render (<Blog blog={blog} />)
    screen.debug()

    // finds first div that has className blog
    const div = screen.getByTestId('1002')
    const url = screen.queryByText(blog.url)
        
    // validate that title and author were rendered to screen in found div
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(url).not.toBeInTheDocument()
})