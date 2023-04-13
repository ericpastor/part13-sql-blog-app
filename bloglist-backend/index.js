const express = require("express")
const cors = require("cors")
require("express-async-errors")

const app = express()

const { PORT } = require("./utils/config")
const { connectToDatabase } = require("./utils/db")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const authorsRouter = require("./controllers/authors")
const readinglistsRouter = require("./controllers/readinglists")
const { unknownEndpoint, errorHandler } = require("./utils/middleware")

app.use(express.json())
app.use(cors())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use("/api/authors", authorsRouter)
app.use("/api/readinglists", readinglistsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
