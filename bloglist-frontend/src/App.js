import React from "react"
import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(user.token)
    window.localStorage.removeItem("loggedBlogappUser")
  }

  const notify = (message, type = "info") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      notify("Wrong credentials", "alert")
    }
  }

  const createBlog = (blogObject) => {
    blogService

      .create(blogObject)
      .then((returnedBlog) => {
        notify(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch((exception) => {
        notify(exception.response.data.error)
      })
  }

  const likeBlog = async (event, id) => {
    event.preventDefault()
    const blogAddLike = blogs.find((b) => b.id === id)
    console.log(blogAddLike)
    const changedLikes = {
      ...blogAddLike,
      likes: blogAddLike.likes + 1,
      user: blogAddLike.user.id,
    }
    try {
      const returnedBlog = await blogService.update(id, changedLikes)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (error) {
      setNotification("Blog was already removed from server", "alert")
    }
  }

  const deleteBlog = (id) => {
    const toDelete = blogs.find((b) => b.id === id)
    const ok = window.confirm(`Delete ${toDelete.title} by ${toDelete.author}`)
    if (ok) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== id))
          notify(`Deleted ${toDelete.title}`)
        })
        .catch((exception) => {
          notify(exception.response.data.error, "alert")
        })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />

      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUserNameChange={({ target }) => setUsername(target.value)}
          handleUserPasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <p>{user.name} logged in</p>

          <BlogForm createBlog={createBlog} handleLogout={handleLogout} />
          <br></br>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={likeBlog}
                handleDelete={deleteBlog}
              />
            ))}
        </div>
      )}
      <BlogForm createBlog={createBlog} handleLogout={handleLogout} />
      <br></br>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={likeBlog}
            handleDelete={deleteBlog}
          />
        ))}
    </div>
  )
}

export default App
