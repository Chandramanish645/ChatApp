const UserDB = require('../db/userdb').Users
exports.ui = (req, res, next) => {
  if (req.session) {
    let name = req.session.user.userName
    console.log('</routes/chat.js , ui> userName -> ', name)
    req.userName = res.locals.userName = name
    getAllUsers(res, name)
  } else {
    res.redirect('/')
  }
}

getAllUsers = (res, name) => {
  UserDB.all((err, users) => {
    //console.log('<chat.js, getAllUsers > users -> ', users)
    if (err) throw new Error(err)
    if (users.length > 0) {
      res.render('chat_ui', {
        userName: name,
        users: users
      })
    } else {
      res.render('chat_ui', {
        userName: name,
        users: []
      })
    }
  })
}
