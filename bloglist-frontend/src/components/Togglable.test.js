
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Togglable from './Togglable'


describe('<Togglable />', () => {

  let component

  beforeEach(() => {

    component = render(
      <Togglable buttonLabel='view...'>
        <div> togglable content </div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    component.getByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const el = component.getByText('togglable content')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view...')
    fireEvent.click(button)

    const el = component.getByText('togglable content')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })
})