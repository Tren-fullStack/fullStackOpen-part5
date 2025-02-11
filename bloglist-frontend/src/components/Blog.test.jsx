import { queryByText, render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
  const blog = {
    title: 'testing isnt fun but is necessary',
    author: 'Stephen D',
    url: 'http://testing.com',
  }

  // render the test blog component to DOM
  render (<Blog blog={blog} />)
})

test('renders just title and author', () => {
    // finds first div that has className blog
    const div = screen.getByTestId('1002')
        
    // validate that title and author were rendered to screen in found div
    expect(div).toHaveTextContent('testing isnt fun but is necessary')
    expect(div).toHaveTextContent('Stephen D')
})
test('does not display likes and url before view button clicke', () => {
    // blog details should not be displayed before view button click
    const div = screen.getByTestId('1003')
    expect(div).toHaveStyle('display:none')
})

test('renders likes and url when view button clicked', async () => {
    // simulates user click of view button
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    
    // blog details div should be displayed after button click
    const div = screen.getByTestId('1003')
    expect(div).not.toHaveStyle('display:none')
})