const mongoose = require("mongoose");

const Database =
  "mongodb+srv://Shubham:Shubham909@cluster0.d9wx7.mongodb.net/Contacts?retryWrites=true&w=majority";

module.exports = async () => {
  await mongoose.connect(Database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  return mongoose
};

