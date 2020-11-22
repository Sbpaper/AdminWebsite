const USER_DATA_KEY = {
  Username: "localStorageUserName",
  Token: "localStorageUserToken",
  Userhead: "localStorageUserHead",
  UserID: "localStorageUserID",
  UserJurisdiction: "localStorageUserJurisdiction"
}

export function getuser() {
  console.log("[auth.js]获取用户信息")
  if (window.localStorage.getItem(USER_DATA_KEY.Token)){
    return {
      Username: window.localStorage.getItem(USER_DATA_KEY.Username),
      Token: window.localStorage.getItem(USER_DATA_KEY.Token),
      Userhead: window.localStorage.getItem(USER_DATA_KEY.Userhead),
      UserID: window.localStorage.getItem(USER_DATA_KEY.UserID),
      UserJurisdiction: window.localStorage.getItem(USER_DATA_KEY.UserJurisdiction),
    }
  }else{
    return {
      Username:null,
      Token:null,
      Userhead:null,
      UserID:null,
      UserJurisdiction:null
    }
  }

}

export function uploaduserhead(Userhead){
  window.localStorage.setItem(USER_DATA_KEY.Userhead, Userhead)
}

export function signin(token, Username, Userhead, UserID, UserJurisdiction) {
  console.log("[auth.js]成功记录用户信息")
  window.localStorage.setItem(USER_DATA_KEY.Token, token)
  window.localStorage.setItem(USER_DATA_KEY.Username, Username)
  window.localStorage.setItem(USER_DATA_KEY.Userhead, Userhead)
  window.localStorage.setItem(USER_DATA_KEY.UserID, UserID)
  window.localStorage.setItem(USER_DATA_KEY.UserJurisdiction, UserJurisdiction)
  return token
}

export function logout() {
  window.localStorage.removeItem(USER_DATA_KEY.Token)
  window.localStorage.removeItem(USER_DATA_KEY.Username)
  window.localStorage.removeItem(USER_DATA_KEY.Userhead)
  window.localStorage.removeItem(USER_DATA_KEY.UserID)
  window.localStorage.removeItem(USER_DATA_KEY.UserJurisdiction)
  window.localStorage.clear()
  console.log("[auth.js]退出登录")
}