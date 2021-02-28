const page_404 = async (req, res, next) => {
  res.sendFile(path.join(__dirname, '404.html'))
}

export default {
  page_404
}