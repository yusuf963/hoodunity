import itemCollection from '../model/itemSchema.js'


//! get request for all items 
const getItems = async (req, res, next) => {
  try {
    const itemsList = await itemCollection.find()
    res.status(200).send(itemsList)
  } catch (err) {
    res.send('Something went wrong. ', err)
    next()
  }
}

//! get request for one specific item
const getOneItem = async (req, res, next) => {
  const id = req.params.id
  try {
    const item = await itemCollection.findById(id)
    if (!item) {
      return res.status(404).send({ message: 'the Item you lookoing for does not exist' })
    }
    res.status(200).send(item)
  } catch (err) {
    res.status(404).send({ message: 'the Item you looking for does not exist' })
    next()
  }
}

//!find one Item and update its details

const updateItem = async (req, res, next) => {
  const id = req.param.id
  const newBody = req.body
  const currentUser = req.currentUser
  try {
    const itemToUpdate = await itemCollection.findById(id)
    if (!itemToUpdate) {
      return res.status(404).send({ message: 'the Item you looking for does not exist' })
    }
    if (!currentUser.isAdmin && currentUser._id.equals(itemToUpdate.user._id)) {
      return res.status(401).send({ message: 'Unauthroized' })
    }
    itemToUpdate.set(newBody)
    itemToUpdate.save()
    res.send(itemToUpdate)

  } catch (err) {
    res.status(404).send({ message: 'the Item you lookoing for does not exist' })
    next()
  }
}


const deleteItem = async (req, res, next) => {
  const id = req.params.id
  try {
    const itemToDelete = await itemCollection.findById(id)
    if (!itemToDelete) {
      res.status(404).send({ message: 'the Item you lookoing for does not exist' })
    }
    if (!currentUser.isAdmin && currentUser._id.equals(itemToDelete.use._id)) {
      res.status(404).send({ message: 'the Item you lookoing for does not exist' })
    }
    await itemToDelete.deleteOne()
  } catch (err) {
    res.status(404).send({ message: 'the Item you lookoing for does not exist' })
    next()
  }
}

export default {
  getItems,
  getOneItem,
  updateItem,
  deleteItem
}