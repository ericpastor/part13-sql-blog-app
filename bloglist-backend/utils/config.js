require("dotenv").config()

let DATABASE_URL = process.env.DATABASE_URL
let PORT = process.env.PORT || 3001
let SECRET = process.env.SECRET

module.exports = {
  DATABASE_URL,
  PORT,
  SECRET,
}
