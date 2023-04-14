const router = require("express").Router()

const Session = require("../models/session")
const { tokenExtractor, activeSession } = require("../utils/middleware")

router.delete("/", tokenExtractor, activeSession, async (req, res) => {
  await Session.destroy({
    where: {
      userId: req.decodedToken.id,
    },
  })
  res.status(410).end()
})

module.exports = router
