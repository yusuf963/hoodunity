import mongoose from 'mongoose'

const itemSchema = mongoose.schema({
  name: { type: "string", required: true },
  category: { type: "string", required: true },
  image: {
    type: String,
    required: true,
    validate: (image) => typeof image === 'string' && image.length > 0 && image.includes('https:' || 'http:')
  },
  discription: { type: "string", required: true },
  wights: { type: String, required: true },
  timeToCollect: { type: String, required: true },
  timeToReturn: { type: String, required: true },
  user: { type: mongoose.Schema.Objectid, ref: 'User', required: true },
  comment: [commentSchema]

})

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Objectid, ref: 'User', required: true }
})

export default mongoose.model('Object', itemSchema)