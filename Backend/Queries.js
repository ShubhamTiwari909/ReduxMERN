const mongo = require("./mongo");
const userSchema = require("./Schema/Schema");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



// get method
app.get("/Users", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const result = await userSchema.find({});
        res.send(result);
      } finally {
        
      }
    });
  };
  connnectToMongo();
});



//post method
app.post("/Register", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const user = {
          email: req.body.email,
          name: req.body.name,
          number: req.body.number,
        };
        console.log(user);
        const result = await userSchema(user).save();
        // console.log(result);
        res.send(result);
      }
      catch {
        console.log("error")
      }
      finally {
        console.log("Everything done");
      }
    });
  };
  connnectToMongo();
});


//update or put method
app.put("/update", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const updateId = req.body.id;
        const updateEmail = req.body.email;
        const updateName = req.body.name;
        const updateNumber = req.body.number;

        console.log(updateId, updateEmail, updateName, updateNumber)
        const result = await userSchema.update(
          { _id: updateId },
          {
            $set: {
              email: updateEmail,
              name: updateName,
              number: updateNumber,
            },
          }
        );
        res.send(result);
      } finally {
        console.log("Data updated succefully");
      }
    });
  };
  connnectToMongo();
});


//delete method
app.delete("/delete/:id", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const id = req.params.id;
        const result = await userSchema.deleteOne({ _id: id });
        res.send(result);
      } finally {
        console.log("Data Deleted succefully");
      }
    });
  };
  connnectToMongo();
});


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('redux1/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/redux1/build/index.html'));
  });
 }


app.listen(port, () => {
  console.log(`running on port ${port}`);
});
