/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {

  const createBlog = jest.fn()
  const user = userEvent.setup()

  const container = render(<BlogForm createBlog={createBlog} />)

  const inputTitle = container.getByLabelText('title:')
  const inputAuthor = container.getByLabelText('author:')
  const inputUrl = container.getByLabelText('url:')
  const sendButton = screen.getByText('save')

  await user.type(inputTitle, 'Testing Create' )
  await user.type(inputAuthor, 'Creator' )
  await user.type(inputUrl, 'https://www.creatorTest' )
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing Create')
  expect(createBlog.mock.calls[0][0].author).toBe('Creator')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.creatorTest')
})