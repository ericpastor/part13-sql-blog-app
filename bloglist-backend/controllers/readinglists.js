const { User, ReadingList, Blog } = require("../models")
const {
  readingListFinder,
  tokenExtractor,
  blogFinder,
} = require("../utils/middleware")
const router = require("express").Router()

router.get("/", async (req, res) => {
  const readingists = await ReadingList.findAll()
  res.json(readingists)
})
router.get("/:id", readingListFinder, async (req, res) => {
  if (req.readinglist) {
    console.log(req.readinglist.toJSON())
    res.json(req.readinglist)
  } else {
    res.status(404).end()
  }
})

router.post("/", async (req, res) => {
  const blog = await Blog.findByPk(req.body.blogId)
  const user = await User.findByPk(req.body.userId)

  if (!blog || !user) {
    return res.status(404).json({
      error: "No such user or blog Id",
    })
  }

  const readinglist = ReadingList.create(req.body)
  return res.json(readinglist)
})

router.put("/:id", tokenExtractor, readingListFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (req.readinglist.userId !== user.id) {
    return res.status(401).json({
      error: "Only the creator can delete a blog",
    })
  }
  if (req.readinglist) {
    req.readinglist.blog_read = req.body.blog_read
    await req.readinglist.save()
    res.json(req.readingist)
  } else {
    res.status(404).end()
  }
})

module.exports = router
