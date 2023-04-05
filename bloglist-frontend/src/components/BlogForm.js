import React from 'react'
import { useRef, useState } from 'react'
import Togglable from './Togglable'



export default function BlogForm (
  { createBlog, handleLogout }){

  const [newTitle, setNewTitle] = useState ('')
  const [newAuthor, setNewAuthor] = useState ('')
  const [newUrl, setNewUrl] = useState ('')


  const togglableRef = useRef()

  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    setNewUrl(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url:newUrl,
    }

    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    togglableRef.current.toggleVisibility()
  }


  return(
    <Togglable buttonLabel='Create new blog' ref={togglableRef}>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor='title'> title:</label>
          <input
            id='title'
            name='title'
            value={newTitle}
            onChange={handleChangeTitle}
          />
        </div>

        <div>
          <label htmlFor='author'>author:</label>
          <input
            id='author'
            name='author'
            value={newAuthor}
            onChange={handleChangeAuthor}
          />
        </div>

        <div>
          <label htmlFor='url'>url:</label>
          <input
            id='url'
            name='url'
            value={newUrl}
            onChange={handleChangeUrl}
          />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>


      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Togglable>

  )

}
