import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'Firebase'
import when from 'when'
import firebaseConfig from './firebase.config'
// import unspalshConfig from './unspalsh.config'

// import Unsplash from 'unsplash-js'

Vue.use(Vuex)
Firebase.initializeApp(firebaseConfig)

// const unsplash = new Unsplash(unspalshConfig)
const AFPtoken = 'c278dcdc-5d6d-4244-ab02-b20cf60389f6'
const lang = 'en'
const latestNewsRequest = 'https://api.afp.com/v1/api/latest?lang='
const unsplashRequest = 'https://source.unsplash.com/1600x900/?'
const state = {
  user: null,
  latestNews: null,
  accessToken: AFPtoken,
  lang: lang
}

const mutations = {
  updateUser (state, {user}) {
    state.user = user
  },
  updateLatestNews (state, {latestNews}) {
    state.latestNews = latestNews
  }
}

const actions = {
  signUpUser: ({commit}, {email, password, name}) => {
    console.log(email, password, name)

    Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.updateProfile({
          displayName: name
        }).then(() => console.log('User name added'))
      }, error => console.log(error))
  },
  signInUser: ({commit}, {email, password}) => {
    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User connected')
      }, error => console.log(error))
  },
  getLatestNews: ({commit}) => {
    let defer = when.defer()
    let request = latestNewsRequest + state.lang + '&access_token=' + state.accessToken
    Vue.http.get(request).then(response => {
      defer.resolve(response)
    })
    return defer.promise
  },
  getUnsplashImage: ({commit}, {tags}) => {
    // unsplash.photos.getRandomPhoto({query: tags}).then(res => console.log(res))
    let request = unsplashRequest + tags
    let defer = when.defer()

    let xhr = new XMLHttpRequest()
    xhr.open('GET', request)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      let urlCreator = window.URL || window.webkitURL
      console.log(xhr.response)

      let imageUrl = urlCreator.createObjectURL(xhr.response)
      defer.resolve(imageUrl)
    }
    xhr.send()

    return defer.promise
  },
  getToken: ({commit}) => {
    let req = new XMLHttpRequest()
    req.open('POST', 'https://api.afp.com/oauth/token?username=Gobelins-GLegenty&password=28a2ac751876&grant_type=password', true)
    req.setRequestHeader('Accept', 'application/json')
    req.setRequestHeader('Authorization', 'Basic ' + btoa('Gobelins' + ':' + '5812dd69-9558-4b8a-a25a-378053ec825b'))
    req.onreadystatechange = function () {
      if (req.readyState !== 4) { return }
      if (req.status !== 200) {
        console.log('error')
        return
      }
      console.log(JSON.parse(req.responseText))
    }
    req.send()
  }

}

const getters = {

}

export default new Vuex.Store({
  db: Firebase.database(),
  state,
  mutations,
  actions,
  getters
})
