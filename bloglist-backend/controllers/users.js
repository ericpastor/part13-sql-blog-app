const router = require("express").Router()

const { User, Blog, ReadingList } = require("../models")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  })
  res.json(users)
})

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get("/:id", async (req, res) => {
  const where = {}
  if (req.query.read === "true") {
    where.blog_read = true
  }
  if (req.query.read === "false") {
    where.blog_read = false
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      },
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        through: {
          attributes: [],
        },
        include: {
          model: ReadingList,
          where,
          attributes: ["id", "blog_read"],
        },
      },
    ],
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
