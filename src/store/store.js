import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'Firebase'
import when from 'when'
import config from './firebase.config'

Vue.use(Vuex)
Firebase.initializeApp(config)
const latestNewsRequest = 'https://api.afp.com/v1/api/latest?lang=fr&access_token=66ab8e2f-02d2-4eda-a0a6-814db33b77c9'
const state = {
  user: null,
  latestNews: null
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

    Vue.http.get(latestNewsRequest).then(response => {
      defer.resolve(response)
    })

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
