let express = require("express")
let multer = require("multer")
let upload = multer({ destination: __dirname + "/uploads" })
let app = express()
let cookieParser = require('cookie-parser')
app.use(cookieParser());
let reloadMagic = require('./reload-magic.js')
let passwords = {}
let sessions = {}
let messages = []
let activeTime = {}
reloadMagic(app)
app.use('/', express.static('build'));
app.use('/images', express.static(__dirname + '/uploads'))
app.get("/messages", function (req, res) {

  let sessionId = req.cookies.sid
  let username = sessions[sessionId]
  if (username === undefined) {
    res.send(JSON.stringify({ success: false }))
    return
  }

  while (messages.length > 20) {
    messages.shift()
  }
  let fiveMinutesAgo = (new Date() / 1) - 5 * 60 * 1000
  let allUsernames = Object.keys(activeTime)
  let activeUsers = allUsernames.filter(user => {
    return activeTime[user] > fiveMinutesAgo
  })

  res.send(JSON.stringify({ msgs: messages, activeUsers: activeUsers }))
})

app.post("/newmessage", upload.single('newpic'), (req, res) => {
  console.log("*** inside new message")
  console.log("body", req.body)
  let sessionId = req.cookies.sid
  let username = sessions[sessionId]

  let fileName = req.file.filename
  let frontendPath = '/images/' + fileName


  console.log("username", username)
  let msg = req.body.msg
  let newMsg = {
    username: username,
    message: msg,
    imgPath: frontendPath,
    imgURL: req.body.imgURL
  }
  console.log("new message", newMsg)
  messages = messages.concat(newMsg)
  console.log("updated messages", messages)




  res.send(JSON.stringify({ success: true }))
  activeUsers[username] = new Date() / 1
})

app.post('/kick', (req, res) => {
  let name = req.body.kickee
  messages.push({ username: "admin", message: kickee + " has been kicked out" })
  Object.keys(sessions).forEach(sessionID => {
    if (sessions[sessionID] === name) {
      sessions[sessionId] = undefined
    }
  })



})

app.get('/amiloggedin', (req, res) => {
  let sessionId = req.cookies.sid
  let username = sessions[sessionId]
  if (username !== undefined) {
    res.send(JSON.stringify({ success: true }))
    return
  }
  res.send(JSON.stringify({ success: false }))
})


app.post("/login", upload.none(), (req, res) => {
  console.log("**** I'm in the login endpoint")
  console.log("this is the parsed body", req.body)
  let username = req.body.username
  let enteredPassword = req.body.password
  let expectedPassword = passwords[username]
  console.log("expected password", expectedPassword)
  if (enteredPassword === expectedPassword) {
    console.log("password matches")
    let sessionId = generateId()
    console.log("generated id", sessionId)
    sessions[sessionId] = username
    res.cookie('sid', sessionId);
    messages.push({
      serverMessage: true,
      username: "server",
      message: username + " has logged in"
    })
    res.send(JSON.stringify({ success: true }))
    return
  }
  res.send(JSON.stringify({ success: false }))
})
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000)
}
app.post("/signup", upload.none(), (req, res) => {
  console.log("**** I'm in the signup endpoint")
  console.log("this is the body", req.body)
  let username = req.body.username
  let enteredPassword = req.body.password
  passwords[username] = enteredPassword
  console.log("passwords object", passwords)
  res.send(JSON.stringify({ success: true }))
})
app.all('/*', (req, res, next) => {
  res.sendFile(__dirname + '/build/index.html');
})
app.listen(4000) 