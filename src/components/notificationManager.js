
const notificationMangager = function () {
  let self = {
    applicationServerPublicKey: 'BA8npw3kpcT6dx7LXMxavRTQcWgjYNZN2XGxEdub9itv6onZcTosBrPeXmY4oY1fpXSmb5uOP9sK6YuEJ1IpwzY',
    swRegistration: null,
    isSubscribed: null,
    start ({requestSubscription}) {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported')
        console.log(this.applicationServerPublicKey)

        navigator.serviceWorker.register('/static/swPush.js')
          .then((swReg) => {
            console.log('Service Worker is registered', swReg)
            this.requestPermission()
            this.swRegistration = swReg
            requestSubscription && this.requestSubscription()
          })
          .catch(function (error) {
            console.error('Service Worker Error', error)
          })
      } else {
        console.warn('Push messaging is not supported')
        // pushButton.textContent = 'Push Not Supported'
      }
    },
    requestPermission () {
      Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status)
      })
    },
    requestSubscription () {
      const applicationServerKey = urlB64ToUint8Array(this.applicationServerPublicKey)
      console.log(this.swRegistration)

      this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
        .then((subscription) => {
          console.log('User is subscribed.')
          console.log(JSON.stringify(subscription))

          // updateSubscriptionOnServer(subscription)

          this.isSubscribed = true

          // updateBtn()
        })
        .catch(function (err) {
          console.log('Failed to subscribe the user: ', err)
          // updateBtn()
        })
    },
    getSubscription () {
      this.swRegistration.pushManager.getSubscription()
        .then((subscription) => {
          this.isSubscribed = !(subscription === null)

          // updateSubscriptionOnServer(subscription)

          if (this.isSubscribed) {
            console.log('User IS subscribed.')
          } else {
            console.log('User is NOT subscribed.')
          }

          // updateBtn()
        })
    },
    test () {
      if (Notification.permission === 'granted') {
        console.log()

        navigator.serviceWorker.getRegistrations().then(function (reg) {
          console.log(reg)

          var options = {
            body: 'Here is a notification body!',
            icon: 'images/example.png',
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1
            }
          }
          reg[0].showNotification('Hello world!', options)
        })
      }
    }
  }

  function urlB64ToUint8Array (base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  return self
}

export default notificationMangager()
