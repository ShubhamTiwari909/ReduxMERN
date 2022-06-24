const mongo = require("./mongo");
const userSchema = require("./Schema/Schema");
const signupSchema = require("./Schema/SignupSchema");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//saving contact information
// get method
app.get("/Users/:id", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const uniqueId = req.params.id;
        const result = await userSchema.find({ uniqueId: uniqueId });
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
        const userEmail = req.body.email;
        const userId = req.body.uniqueId;

        const user = {
          uniqueId: req.body.uniqueId,
          email: req.body.email,
          name: req.body.name,
          number: req.body.number,
        };
        console.log(user)
        const userExist = await userSchema
          .find({ uniqueId: userId, email: userEmail })
          .count();
        console.log(userExist)
        if (userExist >= 1) {
          console.log("user exist")
        } else {
          const result = await userSchema(user).save();
          res.send(result);
        }

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




//saving sign up information
// get method
app.get("/SignupInfo", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const result = await signupSchema.find({});
        res.send(result);
      } finally {

      }
    });
  };
  connnectToMongo();
});


// get method with id
app.get("/SignupInfo/:id", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const id = req.params.id;
        const result = await signupSchema.find({_id:id});
        res.send(result);
      } finally {

      }
    });
  };
  connnectToMongo();
});


//post method
app.post("/RegisterUser", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const userAlreadyExist = req.body.email;
        const user = {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        };
        const userExist = await signupSchema
          .find({ email: userAlreadyExist })
          .count();
        if (userExist >= 1) {
          res.send(true);
        } else {
          const result = await signupSchema(user).save();
          res.send(result);
        }

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


//post method
app.post("/LoginUser", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {

        const email = req.body.email
        const password = req.body.password

        const userExist = await signupSchema
          .find({ email: email, password: password })
          .count();
        if (userExist === 0) {
          res.send("user not exist")
        }
        else {
          const result = await signupSchema.find({ email: email, password: password });
          res.status(200).send(result);
        }

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


//update or put method to change password
app.put("/UpdateUser", (req, res) => {
  const connnectToMongo = async () => {
    await mongo().then(async () => {
      try {
        const updateUsername = req.body.username
        const updateEmail = req.body.email;
        const updateOldPassword = req.body.oldPassword;
        const updateNewPassword = req.body.newPassword;

        console.log(updateEmail, updateOldPassword, updateNewPassword)
        const checkCredentials = await signupSchema.find({
          $and: [
            { email: updateEmail },
            { password: updateOldPassword }
          ]
        }).count();
        console.log(checkCredentials)
        if (checkCredentials >= 1) {
          const result = await signupSchema.update(
            { email: updateEmail },
            {
              $set: {
                username: updateUsername,
                email: updateEmail,
                password:updateNewPassword
              },
            }
          );
          res.send(result);
        }
        else {
          res.send(false);
        }

      } finally {
        console.log("Data updated succefully");
      }
    });
  };
  connnectToMongo();
});




app.listen(port, () => {
  console.log(`running on port ${port}`);
});
