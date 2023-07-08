import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const WordSchema = new mongoose.Schema({
  word: {
    /* This word */

    type: String,
    required: [true, 'Please provide a word.'],
    maxlength: [60, 'Word cannot be more than 60 characters'],
  },
  meaning: {
    /* The meanining of this word */

    type: String,
    required: [true, "Please provide the meaning"],
    maxlength: [100, "Meaning cannot be more than 100 characters"],
  },
 
})

export default mongoose.models.Word || mongoose.model('Word', WordSchema)
