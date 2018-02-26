import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'Firebase'
import config from './firebase.config'

Vue.use(Vuex)
Firebase.initializeApp(config)

const state = {
  user: null
}

const mutations = {

}

const actions = {
  signUpUser: ({commit}, {email, password, name}) => {
    console.log(email, password, name)

    Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.updateProfile({
          displayName: name
        }).then(() => console.log('User name added')
        )
      }, error => console.log(error))
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
