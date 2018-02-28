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
// const AFPtoken = 'c278dcdc-5d6d-4244-ab02-b20cf60389f6'
const lang = 'fr'
const latestNewsRequest = 'https://api.afp.com/v1/api/latest?lang='
const unsplashRequest = 'https://source.unsplash.com/1600x900/?'
const state = {
  user: null,
  latestNews: null,
  accessToken: 'c278dcdc-5d6d-4244-ab02-b20cf60389f6',
  lang: lang,
  articles: []
}

const mutations = {
  updateUser (state, {user}) {
    state.user = user
  },
  updateLatestNews (state, {latestNews}) {
    state.latestNews = latestNews
  },
  updateToken (state, {token}) {
    state.accessToken = token
  }
}

const actions = {
  signUpUser: ({commit}, {email, password, name}) => {
    console.log('sign up', email, password, name)
    let defer = when.defer()

    Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.updateProfile({
          displayName: name
        }).then((user) => {
          this.updateUser({user})
          defer.resolve(user)
        })
      }, error => console.log(error))

    return defer.promise
  },
  signInUser: ({commit}, {email, password}) => {
    console.log('sign in', email, password)
    let defer = when.defer()
    if (!email || !password) {
      defer.reject({message: 'Please fill every field.'})
      return defer.promise
    }
    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        let serialisedUser = JSON.stringify(user)
        localStorage.setItem('user', serialisedUser)
        commit('updateUser', {user})
        defer.resolve(user)
      }, (error) => {
        console.log(error)
        defer.reject(error)
      })

    return defer.promise
  },

  signInOffline: ({commit}) => {
    let defer = when.defer()
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      commit('updateUser', {user})
      defer.resolve(user)
    } else {
      defer.reject('No user in local storage')
    }
    return defer.promise
  },

  getLatestNews: ({commit, dispatch, state}) => {
    let defer = when.defer()
    let request = latestNewsRequest + state.lang + '&access_token=' + state.accessToken

    Vue.http.get(request).then(response => {
      defer.resolve(response)
    }).catch(error => {
      if (error.status === 401) {
        dispatch('getToken').then(token => {
          dispatch('getLatestNews').then(response => defer.resolve(response))
        })
      }
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
    let defer = when.defer()
    req.onload = () => {
      let token = JSON.parse(req.responseText)['access_token']

      commit('updateToken', {token})
      defer.resolve(token)
    }
    req.onerror = error => console.log(error)
    req.send()
    return defer.promise
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
