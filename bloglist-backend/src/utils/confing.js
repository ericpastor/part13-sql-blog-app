require("dotenv").config()

let DATABASE_URL = process.env.DATABASE_URL
let PORT = process.env.PORT

module.exports = {
  DATABASE_URL,
  PORT,
}
