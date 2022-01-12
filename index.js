// express server
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const admin = require("firebase-admin");
const express = require("express");

const { getAuth } = require("firebase-admin/auth");
const app = express();
const { getDatabase } = require("firebase-admin/database");

const port = process.env.PORT || 8081;
const serviceAccount = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  private_key: process.env.private_key.replace(/\\n/g, "\n"),
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://any-time-message-default-rtdb.asia-southeast1.firebasedatabase.app",
});
const db = getDatabase();
app.use(express.json());
// for parsing multipart/form-data

app.post("/register", (req, res) => {
  getAuth()
    .verifyIdToken(req.headers.authorization)
    .then((Decodetoken) => {
      if (req.body.uid === Decodetoken.uid) {
        const ref = db.ref(`${Decodetoken.uid}/PersonalInfo`);
        const { uid, email } = Decodetoken;
        const Name = req.body.name;

        ref.set({
          email: email,
          uid: uid,
          name: Name,
          photoURL: "",
        });
        res.status(201);
      } else {
        req.status(401);
      }
    })
    .catch((error) => {
      res.status(500);
      console.log(error);
    });
  res.send("hel");
});
app.post("/addcontact", (req, res) => {
  getAuth()
    .verifyIdToken(req.headers.authorization)
    .then((decodeToken) => {
      getAuth()
        .getUserByEmail(req.body.email)
        .then((user) => {
          const ref = db.ref(`${decodeToken.uid}/contacts`);

          let present = [];
          ref.once("value", (data) => {
            data.forEach((childData) => {
              if (childData.val().email === req.body.email) {
                present.push(childData.val().email);
              }
            });

            if (!present.includes(req.body.email)) {
              ref.push().set({
                uid: user.uid,
              });

              console.log("Contact Added to the server ");
              res.status(201);
              res.send("Contact Added to the server ");
            } else {
              res.status(409);
              res.send("user already in contact list");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500);
          res.send("No User with this email");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.send("internal server error");
    });
});
app.post("/uploadprofile", (req, res) => {
  getAuth()
    .verifyIdToken(req.headers.authorization)
    .then((Decodetoken) => {
      if (req.body.uid === Decodetoken.uid) {
        const ProfileImg= db.ref(`${Decodetoken.uid}/PersonalInfo`)
        ProfileImg.update({
          "photoURL":req.body.url
        },error=>{
          if(!error){
            res.status(200)
            res.send("Update")
          }else{
            res.status(400)
            res.send("error")
          }
        })
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
      res.send("ping");
    });
});
app.post("/sendmessage", (req, res) => {
  getAuth()
    .verifyIdToken(req.headers.authorization)
    .then((decodeToken) => {
      if (req.body.uid === decodeToken.uid) {
        const refSend = db.ref(
          `${decodeToken.uid}/chats/${req.body.Recipetuid}`
        );
        const refRecive = db.ref(
          `${req.body.Recipetuid}/chats/${decodeToken.uid}`
        );

        refSend.push().set(
          {
            message: req.body.message,
            send: true,
          },
          (error) => {
            if (!error) {
              refRecive.push().set(
                {
                  message: req.body.message,
                  send: false,
                },
                (error) => {
                  if (!error) {
                    res.status(201);
                    res.send("done");
                  } else {
                    res.status(500);
                    res.send("Internel Server error message cannot be send");
                  }
                }
              );
            } else {
              res.status(500);
              res.send("Internel Server error message cannot be send");
            }
          }
        );
      } else {
        res.status(403);
        res.send("Unatorize");
      }
    })
    .catch((error) => {
      res.status(503);
      console.log(error);
      res.send("Internal Server Error");
    });
});
app.use(express.static(path.join(__dirname, "/message-frontend/build")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "/message-frontend/build", "index.html"));
});
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port} !`);
});
