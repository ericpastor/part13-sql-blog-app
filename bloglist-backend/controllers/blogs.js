const router = require("express").Router()

const { Op } = require("sequelize")
const { Blog, User } = require("../models")
const { blogFinder, tokenExtractor } = require("../utils/middleware")

router.get("/", async (req, res) => {
  if (req.query.search) {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      where: {
        [Op.or]: [
          {
            title: {
              [Op.substring]: req.query.search,
            },
          },
          {
            author: {
              [Op.substring]: req.query.search,
            },
          },
        ],
      },
      order: [["likes", "DESC"]],
    })
    res.json(blogs)
  } else {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
        order: [["likes", "DESC"]],
      },
    })
    res.json(blogs)
  }
})

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    console.log(req.blog.toJSON())
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  return res.json(blog)
})

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (req.blog.userId !== user.id) {
    return res.status(401).json({
      error: "Only the creator can delete a blog",
    })
  }
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router
