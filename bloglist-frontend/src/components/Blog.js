import React from 'react'
import Togglable from './Togglable'




const Blog = ({ blog, handleDelete, handleLike }) => {



  return(

    <div className='blog'>
      <div className="titleauthor">
        {blog.title} {blog.author}
      </div>
      <button onClick={() => handleDelete(blog.id)}>
          delete
      </button>

      <div className='viewMore'>
        <Togglable  buttonLabel='view'>
        url: {blog.url}
          <br></br>
          <div className='toClickLike' onClick={(event) => handleLike(event, blog.id)} > likes:{blog.likes}
            <button  id='buttonForLikes' type='submit'>like</button>
          </div>
        </Togglable>
      </div>
    </div>
  )

}

export default Blog