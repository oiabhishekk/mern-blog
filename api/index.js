const express = require("express");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

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
  const userDoc = await User.findOne({ UserName }).maxTimeMS(30000);
  const passok = bcrypt.compareSync(Password, userDoc.Password);
  if (passok) {
    //loggedin
    jwt.sign(
      { UserName, id: userDoc._id },
      secret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        res
          .cookie("token", token, { sameSite: "None", secure: true })
          .json({ UserName, id: userDoc._id });
      }
    );
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

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { sameSite: "None", secure: true }).json("ok");
});

app.listen(PORT, (req, res) => {
  console.log(`App is Listening to the PORT : ${PORT}`);
});
