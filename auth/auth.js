const login = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIbn=true')
  res.redirect('/')
}

export default {
  login
}