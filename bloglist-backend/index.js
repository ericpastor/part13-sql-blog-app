const express = require("express")
const app = express()

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
