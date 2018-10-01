const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema is what we use when we tell mongoose about the fields that a particular model is going to have

// Define the modal
const userSchema = new Schema({
  email: { type: String, unique: true, lowecase: true },
  password: String
});

// Mongoose before saving the record to the database will first verify if the email is unique also taking into account lowercase, as without this declaration it would allow capitalcase to be different from lowercase

// Create the model class
const ModelClass = mongoose.model("user", userSchema);
// This loads the schema to mongoose and the schema corresponds to the "user" entry in DB.

// Export the model
module.exports = ModelClass;