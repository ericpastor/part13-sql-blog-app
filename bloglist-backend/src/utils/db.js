// const { Sequelize } = require("sequelize")
// const { DATABASE_URL } = require("./confing")

// const sequelize = new Sequelize(DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// })

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log("Connection has been established successfully.")
//   } catch (error) {
//     console.error("Unable to connect to the database:", error)
//   }
// }

// module.exports = {
//   sequelize,
//   connectDB,
// }
