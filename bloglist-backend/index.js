const express = require("express")
const app = express()

// let blogs = [
//   {
//     id: 1,
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     title: "Go To Statement Considered Harmful",
//     likes: 5,
//   },
// ]

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
})

// app.get("/api/blogs", (req, res) => {
//   res.json(blogs)
// })

// app.get("/blogs/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const blog = blogs.find((blog) => blog.id === id)
//   if (blog) {
//     res.json(blog)
//   } else {
//     res.status(400).end()
//   }
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
