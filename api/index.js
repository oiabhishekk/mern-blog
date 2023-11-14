const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
const secret = "fusdhfguyfvgshnfsduytfdsfgdshkaslhsdfgsdf";
var salt = bcrypt.genSaltSync(10);

const { default: mongoose } = require("mongoose");
const User = require("./models/User");

const URL =
  "mongodb+srv://as1255093:VrzO3TMlQIHQ1YWQ@cluster1.qe6bg8s.mongodb.net/?retryWrites=true&w=majority";

main()
  .then(console.log("Connection established"))
  .catch((e) => console.log(e));
async function main() {
  await mongoose.connect(URL);
}

//
app.post("/register", async (req, res) => {
  try {
    const { UserName, Password } = req.body;

    const existingUser = await User.findOne({ UserName });

    if (existingUser) {
      // User with the same username already exists
      return res.status(400).json({ error: "Username is already taken." });
    }

    const registeredUser = new User({
      UserName,
      Password: bcrypt.hashSync(Password, salt),
    });

    await registeredUser.save();
    res.json(registeredUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  const { UserName, Password } = req.body;
  const userDoc = await User.findOne({ UserName });
  const passok = bcrypt.compareSync(Password, userDoc.Password);
  if (passok) {
    //loggedin
    jwt.sign({ UserName, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;

      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("Wrong credentials");
  }

  //   if (userDoc != []) {
  //     if (bcrypt.compareSync(Password, userDoc.Password)) {
  //       console.log("good");
  //     } else {
  //       console.log("password incorrect");
  //     }
  //   } else {
  //     console.log("UserName Not found");
  //   }
});

app.listen(PORT, (req, res) => {
  console.log(`App is Listening to the PORT : ${PORT}`);
});
//mongodb+srv://as1255093:VrzO3TMlQIHQ1YWQ@cluster1.qe6bg8s.mongodb.net/?retryWrites=true&w=majority
