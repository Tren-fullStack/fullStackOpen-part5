import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

test('handleSubmitBlog event handler is called when user clicks create after adding blog details', async() => {
    const testBlog = [{
        title: 'testing isnt fun but is necessary',
        author: 'Stephen D',
        url: 'http://testing.com',
        user: {
            name:'Stephen Dorssers',
            username:'Stephen D'
        },
      }]
    // creates mock function to check event handler is being called
    const mockSubmitBlog = vi.fn(event => event.preventDefault())
    render (<AddBlogForm blogs={testBlog} handleSubmitBlog={mockSubmitBlog}/>)
    const user = userEvent.setup()
    
    // create new button clicked to bring up form
    const createNewButton = screen.getByText('new blog')
    await user.click(createNewButton)

    // get textboxes of create blog form and
    // simulates users typing into each textbox
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'mock title')
    await user.type(inputs[1], 'mock author')
    await user.type(inputs[2], 'http://mock.com')

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(mockSubmitBlog.mock.calls).toHaveLength(1)
})