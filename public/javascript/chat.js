const socket = io.connect()
document.addEventListener('DOMContentLoaded', function () {
  var messages = []

  const field = document.getElementById('data')
  const sendButton = document.getElementById('send')
  var roomUsersObj = {}
  var rooms = []
  var currentGroup = '' // !! update currentRoom as when user switches to diff room !!
  // socket.emit('activeUsers')
  socket.on('setDefaultRoom', (groupName) => {
    console.log('<client chat.js setDefaultRoom> groupName = ', groupName)
    currentGroup = groupName
    populateCurrentGroupName(currentGroup)
  })
  socket.on('disableMessageSenderBoxAndSendButton', () => {
    field.disabled = true
    sendButton.disabled = true
  })
  socket.on('enableMessageSenderBoxAndSendButton', () => {
    field.disabled = false
    sendButton.disabled = false
  })
   sendButton.onclick = function () {
     console.log('<client chat.js onclick> currentGroup = ', currentGroup)
     if (currentGroup.length > 0) {
       socket.emit('chatMessage', {
         groupName: currentGroup,
         text: field.value
       })
     }
    return false
  }
  socket.on('chatMessage', (msg) => {
    console.log('<chat.js chatMessage> currentGroup = ', currentGroup)
    console.log('<chat.js chatMessage> msg.groupName = ', msg.groupName)
    if(currentGroup === msg.groupName) {
      console.log('<chat.js chatMessage> currentGroup === msg.groupName')
      populateCurrentGroupName(msg.groupName)
      populateMessagePannel(msg)
    }
  })
  socket.on('createGroup', (obj) => {
    field.disabled = false
    sendButton.disabled = false
    populateGroup(obj.groupName)
    // !! Add method to relay welcome message to all the member of group !!
  })
  /* joinRoom = function (roomName) {
    currentRoom = roomName
    socket.emit('joinRoom', {
      room: currentRoom
    })
    return false
  } */
  /* socket.on('chatMessage', (msg) => {
    createChildNode(getContentDisplayPannelForRoom(msg.room), msg)
    getIndividualUser(msg.room, getUserListDisplayPannelForRoom(msg.room), msg.users)
    if (rooms.indexOf(msg.room) === -1) {
      rooms.push(msg.room)
      createJoinedRoomNode(alreadyJoined, msg.room)
    }
  }) */
  /* socket.on('joinRoom', (msg) => {
    currentRoom = msg.room
    //toggleUsersAndMessageViewPannel(msg.room)
  }) */
  /* const toggleUsersAndMessageViewPannel = room => {
    switch (room) {
      case 'Default Room':
        defaultRoomContent.style.display = 'block'
        room1Content.style.display = 'none'
        room2Content.style.display = 'none'
        defaultActiveUsers.style.display = 'block'
        room1ActiveUsers.style.display = 'none'
        room2ActiveUsers.style.display = 'none'
        break
      case 'Room1':
        defaultRoomContent.style.display = 'none'
        room1Content.style.display = 'block'
        room2Content.style.display = 'none'
        defaultActiveUsers.style.display = 'none'
        room1ActiveUsers.style.display = 'block'
        room2ActiveUsers.style.display = 'none'
        break
      case 'Room2':
        defaultRoomContent.style.display = 'none'
        room1Content.style.display = 'none'
        room2Content.style.display = 'block'
        defaultActiveUsers.style.display = 'none'
        room1ActiveUsers.style.display = 'none'
        room2ActiveUsers.style.display = 'block'
        break
    }
  } */
  //toggleUsersAndMessageViewPannel('Default Room')

  /* const getIndividualUser = (room, userPannel, users) => {
    for (var user in users) {
      createRoomUsersObj(room, userPannel, users[user])
    }
  } */
  /* const createRoomUsersObj = (room, userPannel, user) => {
    if (!roomUsersObj[room]) {
      roomUsersObj[room] = []
    }
    if (roomUsersObj[room].indexOf(user) === -1) {
      roomUsersObj[room].push(user)
      createUserListChildNode(userPannel, user)
    }
  } */
  /* const createUserListChildNode = (userPannel, user) => {
    let p = document.createElement('p')
    p.appendChild(document.createTextNode(user))
    p.classList.add('members-msgCount')
    userPannel.appendChild(p)
  } */

  /* const createChildNode = (node, msg) => {
    let article = document.createElement('article')
    article.classList.add('media')
    let div1ChildOfArticle = document.createElement('div')
    div1ChildOfArticle.classList.add('media-left')
    let figure = document.createElement('figure')
    figure.classList.add('image', 'is-64x64')
    let img = document.createElement('img')
    img.src = 'http://placehold.it/128x128'
    img.alt = 'Image'
    figure.appendChild(img)
    div1ChildOfArticle.appendChild(figure)
    article.appendChild(div1ChildOfArticle)
    let div2ChildOfArticle = document.createElement('div')
    div2ChildOfArticle.classList.add('media-content')
    let div3ChildOfDiv2 = document.createElement('div')
    div3ChildOfDiv2.classList.add('content')
    let p = document.createElement('p')
    let strong = document.createElement('strong')
    strong.appendChild(document.createTextNode(msg.senderName))
    p.appendChild(strong)
    let br = document.createElement('br')
    let msgText = document.createTextNode(msg.text)

    p.insertBefore(br, p.appendChild(msgText))
    div3ChildOfDiv2.appendChild(p)
    let nav = document.createElement('nav')
    nav.classList.add('level')
    let divChildOfNav = document.createElement('div')
    divChildOfNav.classList.add('level-left')
    let a = document.createElement('a')
    a.classList.add('level-item')
    let span = document.createElement('span')
    span.classList.add('icon', 'is-small')
    let i = document.createElement('i')
    i.classList.add('fa', 'fa-reply')
    span.appendChild(i)
    a.appendChild(span)
    divChildOfNav.appendChild(a)
    nav.appendChild(divChildOfNav)
    div2ChildOfArticle.appendChild(div3ChildOfDiv2)
    div2ChildOfArticle.appendChild(nav)
    article.appendChild(div1ChildOfArticle)
    article.appendChild(div2ChildOfArticle)
    node.appendChild(article)
  } */

  /* const createJoinedRoomNode = (alreadyJoined, roomName) => {
    let div1 = document.createElement('div')
    div1.classList.add('columns')

    let div2ChildOf1 = document.createElement('div')
    div2ChildOf1.classList.add('column', 'is-3', 'is-marginless')
    let div3ChildOfDiv2 = document.createElement('div')
    div3ChildOfDiv2.classList.add('image')
    let img = document.createElement('img')
    img.src = 'http://bulma.io/images/placeholders/96x96.png'
    div3ChildOfDiv2.appendChild(img)
    div2ChildOf1.appendChild(div3ChildOfDiv2)

    let div4ChildOf1 = document.createElement('div')
    div4ChildOf1.classList.add('column', 'is-6')
    let p = document.createElement('p')
    let strong = document.createElement('strong')
    strong.appendChild(document.createTextNode(roomName))
    p.appendChild(strong)
    div4ChildOf1.appendChild(p)

    let div5ChildOf1 = document.createElement('div')
    div5ChildOf1.classList.add('column', 'is-3')
    let button = document.createElement('button')
    button.classList.add('button', 'is-active', 'is-info')
    button.value = roomName
    button.addEventListener('click', function () {
      console.log('!!!!!!!!!!!Hi......!!!!!!!!roomName= ', roomName)
      currentRoom = roomName
      toggleUsersAndMessageViewPannel(currentRoom)
    }, false)
    let span = document.createElement('span')
    span.classList.add('icon', 'is-small')
    let i = document.createElement('i')
    i.classList.add('fa', 'fa-toggle-on')
    span.appendChild(i)
    button.appendChild(span)
    div5ChildOf1.appendChild(button)

    div1.appendChild(div2ChildOf1)
    div1.appendChild(div4ChildOf1)
    div1.appendChild(div5ChildOf1)

    alreadyJoined.appendChild(div1)
  } */

  /* const getContentDisplayPannelForRoom = (room) => {
    if (room === 'Default Room') return defaultRoomContent
    if (room === 'Room1') return room1Content
    if (room === 'Room2') return room2Content
  } */
  /* const getUserListDisplayPannelForRoom = (room) => {
    if (room === 'Default Room') return defaultActiveUsers
    if (room === 'Room1') return room1ActiveUsers
    if (room === 'Room2') return room2ActiveUsers
  }
}) */
})
/* Emits event to server to save new group , created by clicking "createGroup" button on UI */
const createGroup = () => {
  let groupName = document.getElementById('groupName').value
  let userList = document.getElementById('usersAdded').value
  if(groupName.length !== 0 && userList.length !== 0) {
    let users = userList.split(' ').filter(item => item)
    console.log('</public/javascript/chat.js createGroup > userList-> ', userList)
    console.log('</public/javascript/chat.js createGroup > users-> ', users)

    socket.emit('createGroup', {
      groupName: groupName,
      users: users
    })
    // Below code closes modal
    let modal = document.getElementById('modal_newRoom')
    modal.classList.remove('is-active')
  }
}



  /* Creates new group in view of all the users added to that group */
  const populateGroup = groupName => {
    let groupUserWrapper = document.getElementById('groupsAndUsers')
    let div1 = document.createElement('div')
    div1.classList.add('columns')

    let div2ChildOfDiv1 = document.createElement('div')
    div2ChildOfDiv1.classList.add('column', 'is-3')
    let div3ChildOfDiv2 = document.createElement('div')
    div3ChildOfDiv2.classList.add('image')
    let img = document.createElement('img')
    img.src = 'http://bulma.io/images/placeholders/96x96.png'
    div3ChildOfDiv2.appendChild(img)
    div2ChildOfDiv1.appendChild(div3ChildOfDiv2)

    let div4ChildOfDiv1 = document.createElement('div')
    div4ChildOfDiv1.classList.add('column', 'is-6')
    let span = document.createElement('span')
    span.style.cursor = 'pointer' // !! Add onclick on span to populate group content !!
    let strong = document.createElement('strong')
    strong.appendChild(document.createTextNode(groupName))
    span.appendChild(strong)
    div4ChildOfDiv1.appendChild(span)

    let hr = document.createElement('hr')
    div1.appendChild(div2ChildOfDiv1)
    div1.appendChild(div4ChildOfDiv1)
    groupUserWrapper.appendChild(div1)
    groupUserWrapper.appendChild(hr)
  }
const showModal = elementId => {
  let modal = document.getElementById('modal_newRoom')
  modal.classList.add('is-active')
}

const closeModal = elementId => {
  let modal = document.getElementById('modal_newRoom')
  modal.classList.remove('is-active')
}
const addToTextBox = obj => {
  let user = obj.value
  let displayUser = document.getElementById('usersAdded')
  if (displayUser.value.indexOf(user) === -1) {
    displayUser.value += ' ' + user + ' '
  }
}
const populateCurrentGroupName = groupName => {
  let currentGroup = document.getElementById('currentGroup')
  currentGroup.innerHTML = groupName
}
const populateMessagePannel = msg => {
  let messageContentWrapper = document.getElementById('messageContent')
  let article = document.createElement('article')
  article.classList.add('media')
  let div1ChildOfArticle = document.createElement('div')
  div1ChildOfArticle.classList.add('media-left')
  let figure = document.createElement('figure')
  figure.classList.add('image', 'is-64x64')
  let img = document.createElement('img')
  img.src = 'http://placehold.it/128x128'
  img.alt = 'Image'
  figure.appendChild(img)
  div1ChildOfArticle.appendChild(figure)
  article.appendChild(div1ChildOfArticle)
  let div2ChildOfArticle = document.createElement('div')
  div2ChildOfArticle.classList.add('media-content')
  let div3ChildOfDiv2 = document.createElement('div')
  div3ChildOfDiv2.classList.add('content')
  let p = document.createElement('p')
  let strong = document.createElement('strong')
  strong.appendChild(document.createTextNode(msg.sender))
  p.appendChild(strong)
  let br = document.createElement('br')
  let msgText = document.createTextNode(msg.text)

  p.insertBefore(br, p.appendChild(msgText))
  div3ChildOfDiv2.appendChild(p)
  let nav = document.createElement('nav')
  nav.classList.add('level')
  let divChildOfNav = document.createElement('div')
  divChildOfNav.classList.add('level-left')
  let a = document.createElement('a')
  a.classList.add('level-item')
  let span = document.createElement('span')
  span.classList.add('icon', 'is-small')
  let i = document.createElement('i')
  i.classList.add('fa', 'fa-reply')
  span.appendChild(i)
  a.appendChild(span)
  divChildOfNav.appendChild(a)
  nav.appendChild(divChildOfNav)
  div2ChildOfArticle.appendChild(div3ChildOfDiv2)
  div2ChildOfArticle.appendChild(nav)
  article.appendChild(div1ChildOfArticle)
  article.appendChild(div2ChildOfArticle)
  let hr = document.createElement('hr')
  messageContentWrapper.appendChild(article)
  messageContentWrapper.appendChild(hr)
}
