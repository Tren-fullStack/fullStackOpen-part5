import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { cleanup } from '@testing-library/react'

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

test('handleAddLike event handler is called twice when like button is clicked twice', async() => {
    // need to create different render for this test, so cleanup before
    cleanup()
    const blog = {
      title: 'testing isnt fun but is necessary',
      author: 'Stephen D',
      url: 'http://testing.com',
    }
    // creates mock function to check event handler is being called
    const mockAddLike = vi.fn()
    render (<Blog blog={blog} handleAddLike={mockAddLike}/>)

    // simulate user click twice
    const user = userEvent.setup()
    const button = screen.getByText('like')
    for (let i=0; i < 2; i++) {
        await user.click(button)
    }

    // check mock event handler called twice
    expect(mockAddLike.mock.calls).toHaveLength(2) 
})