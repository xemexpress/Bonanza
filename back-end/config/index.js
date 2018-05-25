module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  admin: process.env.NODE_ENV === 'production' ? process.env.ADMIN : 'testtest'
}
