/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'TitleTest',
    author: 'AuthorTest',
    url: 'http://testfrontend.com',
    likes: 99,
    user: 'Ernst Past'
  }
  const component = render(
    <Blog blog={blog} />)
  const div = component.container.querySelector('.titleauthor')
  expect(div).toHaveTextContent('TitleTest')
  expect(div).toHaveTextContent('AuthorTest')

  component.debug()
})

test('clicking the button calls event handler twice', () => {
  const blog = {
    title: 'TitleTest',
    author: 'AuthorTest',
    url: 'http://testfrontend.com',
    likes: 99,
    user: 'Ernst Past'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

