// express server
const path = require("path");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { promisify } = require("util");

dotenv.config();
const admin = require("firebase-admin");
const express = require("express");
const LicenceToken = require("./LicenceToken");
const { getAuth } = require("firebase-admin/auth");
const app = express();
const { getDatabase } = require("firebase-admin/database");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fetch = require("node-fetch");
const port = process.env.PORT || 8080;
const randomBytes = promisify(crypto.randomBytes);

// Firebase service account configurations.
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
  private_key: process.env.private_key.replace(/\\n/g, "\n"), // Parsing private key by replacing
};

// Initializing Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://any-time-message-default-rtdb.asia-southeast1.firebasedatabase.app",
});
const db = getDatabase();
app.use(express.json()); // Parse the body to json format
app.use(cookieParser()); // parse cookie middle-ware
app.use(
  session({
    secret: process.env.serverSession_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { expires: new Date(253402300000000) },
  })
);

// Listen for "/register" post request called every time after successfull creation of a new user accout.
app.post("/register", (req, res) => {
  getAuth()
    .verifyIdToken(req.headers.authorization) // Verify the user using JWT send in header as authorization token
    .then((Decodetoken) => {
      // callback function after varification
      if (req.body.uid === Decodetoken.uid) {
        const ref = db.ref(`${Decodetoken.uid}/PersonalInfo`); // Database reference to userID/PersonalInfo
        const { uid, email } = Decodetoken; // Destructring Decodetoken to get email and uid
        const Name = req.body.name; // Name of the user
        // Setting value in the database Reference
        ref.set({
          email: email,
          uid: uid,
          name: Name,
          photoURL: "",
        });
        // Generating uniqe token for the user to validate and varify uniquely
        LicenceToken(Decodetoken.uid).then(async (token) => {
          const nonce = (await randomBytes(32)).toString("base64"); // Random string used to make Client local database key string
          const databaseKey = `${nonce}:${req.sessionID}`; //Random Database key for the Client localStorage
          res.cookie("sessionId", req.sessionID, {
            maxAge: new Date(23423432323232),
          });
          res.cookie("databaseKey", databaseKey, {
            maxAge: new Date(23423432323232),
          });
          res.cookie("appId", process.env.seald_appId, {
            maxAge: new Date(23423432323232),
          });
          const sendChallengeResult = await fetch(
            `${process.env.ssks_key_storage_url}tmr/back/challenge_send/`,
            {
              method: "POST",
              credentials: "omit",
              headers: {
                "Content-Type": "application/json",
                "X-SEALD-APPID": process.env.seald_appId,
                "X-SEALD-APIKEY": process.env.ssks_key_storage_api,
              },
              body: JSON.stringify({
                create_user: true, // boolean determined above
                user_id: Decodetoken.uid, // unique identifier for the user in this app
                auth_factor: {
                  type: "EM",
                  value: Decodetoken.email, // email address of the user
                },
                template: "<html><body>Challenge: $$CHALLENGE$$</body></html>", // email template to use
              }),
            }
          );
          if (!sendChallengeResult.ok) {
            const responseText = await sendChallengeResult.text();
            throw new Error(
              `Error in SSKS createUser: ${sendChallengeResult.status} ${responseText}`
            );
          }
          // retrieval of the session id which will be used by the user
          const {
            session_id: twoManRuleSessionId,
            must_authenticate: mustAuthenticate,
          } = await sendChallengeResult.json();
          // if there is no `twoManRuleKey` stored yet, we generate a new one

          const twoManRuleKey = (await randomBytes(64)).toString("base64");
          const storeTwoManRuleKey = db.ref(`${Decodetoken.uid}/securityKey`);
          storeTwoManRuleKey.update(
            {
              ssks2mrKey: twoManRuleKey,
            },
            (err) => {
              if (!err) {
                res.status(201).json({
                  token: token,
                  twoManRuleSessionId,
                  twoManRuleKey: twoManRuleKey,
                  mustAuthenticate,
                });
              }
            }
          );

          // response to the user
        });
      } else {
        req.status(401);
      }
    })
    // Catch error in athentication JWT Token
    .catch((error) => {
      res.status(500);
      console.log(error);
    });
});

// Listen for Post reqest made on "/session/login"  called every time after successfull login of the User .
app.post("/session/login", async (req, res) => {
  getAuth()
    .verifyIdToken(req.headers.authorization) // Verfiy the user using JWT .
    .then(async (Decodetoken) => {
      if (req.body.uid === Decodetoken.uid) {
        // Set session Cookie after verifying the user is authentcated
        const nonce = (await randomBytes(32)).toString("base64");
        const databaseKey = `${nonce}:${req.sessionID}`; //database key for seald-identity stored on client device
        res.cookie("sessionId", req.sessionID, {
          maxAge: new Date(23423432323232),
        }); // set session id
        res.cookie("databaseKey", databaseKey, {
          maxAge: new Date(23423432323232),
        }); //set databaseKey
        res.cookie("appId", process.env.seald_appId, {
          maxAge: new Date(23423432323232),
        }); // set AppId
        console.log(Decodetoken);
        const sendChallengeResult = await fetch(
          `${process.env.ssks_key_storage_url}tmr/back/challenge_send/`,

          {
            method: "POST",
            credentials: "omit",
            headers: {
              "Content-Type": "application/json",
              "X-SEALD-APPID": process.env.seald_appId,
              "X-SEALD-APIKEY": process.env.ssks_key_storage_api,
            },
            body: JSON.stringify({
              create_user: true, // boolean determined above
              user_id: Decodetoken.uid, // unique identifier for the user in this app
              auth_factor: {
                type: "EM",
                value: Decodetoken.email, // email address of the user
              },

              template: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                      <div style="border-bottom:1px solid #eee"> <a href=""
                              style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MessageHub</a> </div>
                      <p style="font-size:1.1em">Hi,${Decodetoken.name}</p>
                      <p> Use the following OTP to complete your Sign Up procedures. OTP is valid
                          for 15 minutes</p>
                      <h2
                          style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
                          $$CHALLENGE$$</h2>
                      <p style="font-size:0.9em;">Regards,<br />Team MessageHub</p>
                      <hr style="border:none;border-top:1px solid #eee" />
              
                  </div>
              </div>`, // email template to use
            }),
          }
        );
        console.log(Decodetoken.email);
        if (!sendChallengeResult.ok) {
          const responseText = await sendChallengeResult.text();
          throw new Error(
            `Error in SSKS createUser: ${sendChallengeResult.status} ${responseText}`
          );
        }
        // retrieval of the session id which will be used by the user
        const {
          session_id: twoManRuleSessionId,
          must_authenticate: mustAuthenticate,
        } = await sendChallengeResult.json();
        // if there is no `twoManRuleKey` stored yet, we generate a new one
        const storeTwoManRuleKey = db.ref(`${Decodetoken.uid}/securityKey`);
        storeTwoManRuleKey.once("value", async (data) => {
          if (data.hasChildren()) {
            console.log(data.val().ssks2mrkey);
            res.status(200).json({
              twoManRuleSessionId,
              twoManRuleKey: data.val().ssks2mrkey,
              mustAuthenticate,
              passRetrival: false,
            });
          } else {
            const twoManRuleKey = (await randomBytes(64)).toString("base64");
            storeTwoManRuleKey.update(
              {
                ssks2mrkey: twoManRuleKey,
              },
              (e) => {
                res.status(200).json({
                  twoManRuleSessionId,
                  twoManRuleKey: twoManRuleKey,
                  mustAuthenticate,
                  passRetrival: true,
                });
              }
            );
          }
        });
      }
    });
});

// Listen for Post reqest made on "/session/logout"  called every time after user Logout.
app.post("/session/logout", (req, res) => {
  //  Destroy the session and clear sessionId
  req.session.destroy((err) => {
    res.clearCookie("sessionId"); // Clear sessionId
    res.clearCookie("databaseKey"); // clear databaseKey
    res.clearCookie("appId"); // clear appId
    if (!err) {
      res.status(200);
      res.send("done");
    }
  });
});

// Listen for Post reqest made on "/addcontact"  called when user add a Contact.
app.post("/addcontact", (req, res) => {
  getAuth()
    .verifyIdToken(req.headers.authorization) // Verify user  using Firebase JWT
    .then((decodeToken) => {
      getAuth()
        .getUserByEmail(req.body.email) // tries to get user by email return user if exist otherwise give error
        .then((user) => {
          // User recived
          const ref = db.ref(`${decodeToken.uid}/contacts`); // Referece to database.

          let present = []; //variable ot hold present Contact
          // Retrive all Present Contact of the user
          ref.once("value", (data) => {
            data.forEach((childData) => {
              if (childData.val().email === req.body.email) {
                present.push(childData.val().email);
              }
            });
            // Check if the user already added in Contact' s if not add it
            if (!present.includes(req.body.email)) {
              ref.push().set({
                uid: user.uid,
              });

              res.status(201);
              res.send("Contact Added to the server ");
            } else {
              // Else Raise error .
              res.status(409);
              res.send("user already in contact list");
            }
          });
        })
        .catch((error) => {
          // catch no user exist with the email send error no user exist
          console.log(error);
          res.status(500);
          res.send("No User with this email");
        });
    })
    .catch((error) => {
      // Catch error in athentication JWT Token
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
        const ProfileImg = db.ref(`${Decodetoken.uid}/PersonalInfo`);
        ProfileImg.update(
          {
            photoURL: req.body.url,
          },
          (error) => {
            if (!error) {
              res.status(200);
              res.send("Update");
            } else {
              res.status(400);
              res.send("error");
            }
          }
        );
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
          `${decodeToken.uid}/chats/${req.body.Recipetuid}/messages`
        ); // Referense for sender accout
        const refRecive = db.ref(
          `${req.body.Recipetuid}/chats/${decodeToken.uid}/messages`
        ); // Referense for reciver accout
        const reciveSession = db.ref(
          `${req.body.Recipetuid}/chats/${decodeToken.uid}`
        ); // Referense for sender session
        const sendSession = db.ref(
          `${decodeToken.uid}/chats/${req.body.Recipetuid}`
        ); // Referense for resiver session
        if (req.body.sessionId) {
          // check if sessionId is send by frontend or not
          sendSession.update({
            sessionId: req.body.sessionId,
          }); // save sesion id for sender
          reciveSession.update({
            sessionId: req.body.sessionId,
          }); // save sesion id for Reciver
        }
        if (req.body.message) {
          refSend.push().set(
            {
              message: req.body.message,
              send: true,
              type: "text",
            }, //Save messag for sender
            (error) => {
              if (!error) {
                // Check for error
                refRecive.push().set(
                  {
                    message: req.body.message,
                    send: false,
                    type: "text",
                  }, //Save messag for Reciver
                  (error) => {
                    if (!error) {
                      //Check for error
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
        } else if (req.body.url) {
          refSend.push().set(
            {
              url: req.body.url,
              send: true,
              type: "audio",
            },
            (error) => {
              if (!error) {
                refRecive.push().set(
                  {
                    url: req.body.url,
                    send: false,
                    type: "audio",
                  },
                  (error) => {
                    if (!error) {
                      //Check for error
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
        }
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
// app.get("/audioMessage",(res,req)=>{
//   getAuth()
//     .verifyIdToken(req.headers.authorization).then((decodeToken)=>{
//       if(req.body.uid===decodeToken){

//       }
//     })
// })
app.post("/notification", (req, res) => {
  getAuth()
    .verifyIdToken(req.headers.authorization)
    .then((decodeToken) => {
      db.ref(`${decodeToken.uid}/PersonalInfo`).update(
        {
          notification: req.body.token,
        },
        (err) => {
          if (!err) {
            res.status(201);
            res.send("done");
          } else {
            res.status(406);
            res.send("Not Saved");
          }
        }
      );
    });
});
app.use(express.static(path.join(__dirname, "/message-frontend/build")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "/message-frontend/build", "index.html"));
});
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port} !`);
});
