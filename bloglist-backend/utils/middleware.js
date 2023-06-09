const { Blog, ReadingList, User } = require("../models")
const Session = require("../models/session")
const { SECRET } = require("./config")
const jwt = require("jsonwebtoken")

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id",
    })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message,
    })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    })
  }

  next(error)
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const readingListFinder = async (req, res, next) => {
  req.readinglist = await ReadingList.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: "token invalid" })
    }
  } else {
    return res.status(401).json({ error: "token missing" })
  }
  next()
}

const activeSession = async (req, res, next) => {
  const isActive = await Session.findOne({
    where: {
      userId: req.decodedToken.id,
    },
    include: {
      model: User,
      attributes: ["disabled"],
    },
  })
  !isActive
    ? res.status(401).json({ error: "Session is not active. Log in" })
    : next()

  isActive.user.disabled = true
    ? res.status(409).json({ error: "User disabled" })
    : next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  blogFinder,
  tokenExtractor,
  readingListFinder,
  activeSession,
}
