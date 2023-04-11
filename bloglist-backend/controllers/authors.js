const router = require("express").Router()
const sequelize = require("sequelize")

const { Blog } = require("../models")

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("title")), "titles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [["likes", "DESC"]],
  })
  res.json(authors)
})

module.exports = router
