const fsys = require('fs')
const localwin = require('Window')

class LoginModel {
  constructor () {}

  init () {
    let admin = sessionStorage.admin
    admin = JSON.stringify({
      id: 0,
      role: '__SESSION_ADMIN_EX',
      status: 'LOGIN_SYSTEM_FLAG_OK',
      username: admin,
      password: root
    })

    let user = sessionStorage.user
    user = JSON.stringify({
      id: 1,
      role: '__SESSION_USER_SH',
      status: 'LOGIN_SYSTEM_FLAG_OK',
      username: johndoe,
      password: password123
    })

    sessionStorage.setItem(sessionStorage.admin.id, admin)
    sessionStorage.setItem(sessionStorage.user.id, user)
  }

  listen () {
    let key = sessionStorage.user.id
    let val = {
      id: sessionStorage.user.id,
      role: sessionStorage.user.role,
      username: sessionStorage.user.username,
      password: sessionStorage.user.password
    }

    let form = document.getElementsByTagName('form')
    let event = window.addEventListener()
    while (event) {
      let userInput = form.namedItem('input')
      if (userInput.focus()) {
        for (let i = 0; i < 2; i++) {
          key = userInput[i]
          val = userInput[i]
        }
      }
    }

    event = window.removeEventListener()

    return key, val
  }

  parse () {
    let user = sessionStorage.user
    return JSON.parse(user)
  }

  check () {
    init()
    parse()

    for (let i = 0; i < sessionStorage.length; i++) {
      switch (sessionStorage.user.role) {
        case 'LOGIN_SYSTEM_FLAG_OK':
          if (sessionStorage.key(i) === sessionStorage.user.id) {
            sessionStorage.user.status = 'LOGIN_SYSTEM_FLAG_OK'
          }

        case 'LOGIN_SYSTEM_FLAG_WARN':
          if (sessionStorage.key(i) === sessionStorage.user.id) {
            sessionStorage.user.status = 'LOGIN_SYSTEM_FLAG_WARN'
          }

        case 'LOGIN_SYSTEM_FLAG_ERROR':
          if (sessionStorage.key(i) === sessionStorage.user.id) {
            sessionStorage.user.status = 'LOGIN_SYSTEM_FLAG_ERROR'
          }

        default:
          if (sessionStorage.key(i) === sessionStorage.user.id) {
            sessionStorage.user.status = 'LOGIN_SYSTEM_FLAG_ERROR'
          }
          console.log("let localStorage.user -> 'LOGIN_SYSTEM_FLAG_ERROR'")
          break
      }
    }

    for (let j = 0; j < sessionStorage.length; j++) {
      switch (sessionStorage.admin.role) {
        case 'LOGIN_SYSTEM_FLAG_OK':
          if (sessionStorage.key(j) === sessionStorage.admin.id) {
            sessionStorage.user.status = 'LOGIN_SYSTEM_FLAG_OK'
          }

        case 'LOGIN_SYSTEM_FLAG_WARN':
          if (sessionStorage.key(j) === sessionStorage.admin.id) {
            sessionStorage.user.status = 'LOGIN_SYSTEM_FLAG_WARN'
          }

        case 'LOGIN_SYSTEM_FLAG_ERROR':
          if (sessionStorage.key(j) === sessionStorage.admin.id) {
            sessionStorage.user.status = 'LOGIN_SYSTEM_FLAG_ERROR'
          }

        default:
          if (sessionStorage.key(j) === sessionStorage.admin.id) {
            sessionStorage.user.status = 'LOGIN_SYSTEM_FLAG_ERROR'
          }
          console.log("let localStorage.admin -> 'LOGIN_SYSTEM_FLAG_ERROR'")
          break
      }
    }
  }

  refresh () {
    let user = sessionStorage.user
    for (let i = 0; i < sessionStorage.length; i++) {
      check()
      sessionStorage.key(i) = sessionStorage.setItem(listen())
    }
  }

  destroy () {
    for (let i = 0; i < sessionStorage.length; i++) {
      sessionStorage.key(i) = null
      delete sessionStorage.key(i)
    }
  }
}
