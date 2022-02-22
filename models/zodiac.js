import mongoose from 'mongoose' // mongooge is the ODM that interacts with our mongoDB server
import uniqueValidator from 'mongoose-unique-validator'

// SCHEMA
// Schemas are blueprints for documents
// Documents are individual items inside of a collection

const { Schema } = mongoose

// REFERENCED RELATIONSHIPS
// ref relationships are between 2 collections, we define a field on one and reference the other
// We need two things, the type and the ref. (type = ObjectId, ref = the name of the model)

// comments is an array, making is a 1-M embedded relationship 



const zodiacSchema = new Schema({
  name: { type: String, required: true, unique: true }, // required key makes a field required, unique means there can only be one
  dates: { type: String, required: true },
  symbol: { type: String, required: true },
  element: { type: String, required: true },
  quality: { type: String, required: true },
  planet: { type: String, required: true },
  keyPhrase: { type: String, required: true },
  keyTraits: { type: String, required: true },
  house:  { type: String, required: true },
  compatibility: [{ type: String }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

// Plugins
zodiacSchema.plugin(uniqueValidator)

// Schemas define the document but we need to attach it to a model so that we can interact with the database
// mongoose.model takes two arguments:
// First argument is the name of the collection. This will be capitalised, but will actually be created all lowercase
// Second argument is the schema
export default mongoose.model('Zodiac', zodiacSchema)