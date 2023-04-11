const express = require("express")
const cors = require("cors")
require("express-async-errors")

const app = express()

const { PORT } = require("./utils/config")
const { connectToDatabase } = require("./utils/db")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const { unknownEndpoint, errorHandler } = require("./utils/middleware")

app.use(express.json())
app.use(cors())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

// require("dotenv").config()
// const { Sequelize, Model, DataTypes } = require("sequelize")
// const express = require("express")
// const app = express()
// const cors = require("cors")

// app.use(express.json())
// app.use(cors())

// const sequelize = new Sequelize(process.env.DATABASE_URL)

// class Blog extends Model {}
// Blog.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     author: {
//       type: DataTypes.TEXT,
//     },
//     url: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     likes: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//   },
//   {
//     sequelize,
//     underscored: true,
//     timestamps: false,
//     modelName: "blog",
//   }
// )

// Blog.sync()

// app.get("/api/blogs", async (req, res) => {
//   const blogs = await Blog.findAll()
//   console.log(JSON.stringify(blogs, null, 2))
//   res.json(blogs)
// })

// app.get("/api/blogs/:id", async (req, res) => {
//   const blog = await Blog.findByPk(req.params.id)
//   if (blog) {
//     console.log(blog.toJSON())
//     res.json(blog)
//   } else {
//     res.status(404).end()
//   }
// })

// app.post("/api/blogs", async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body)
//     return res.json(blog)
//   } catch (error) {
//     return res.status(400).json({ error })
//   }
// })

// app.delete("/api/blogs/:id", async (req, res) => {
//   const blog = await Blog.findByPk(req.params.id)
//   if (blog) {
//     await blog.destroy()
//   }
//   res.status(204).end()
// })

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
