function showNotification () {
  self.registration.showNotification('Organspendekongress', {
    tag: 'newinfo',
    body: 'Die Infos wurden geupdatet, schau rein :)',
    renotify: true
  })
}

self.addEventListener('notificationclick', function(event) {
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(function(clientList) {
      for (var i = 0 ; i < clientList.length ; i++) {
        clientList[i].focus
        return
      }
      clients.openWindow('/')
    })
    .then(() => {
      event.notification.close()
    })
  )
}, false)

self.addEventListener('activate', async () => {
  console.log('activate')
  const vapid = (await (await fetch('/api/pushask')).json()).vapid
  console.log(vapid)
  if (!vapid) return
  try {
    const options = {
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(vapid)
    }
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log(subscription)
    const response = saveSubscription(subscription)
    console.log(response)
  } catch (err) {
    console.log('Error', err)
  }
})

function urlB64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function saveSubscription (subscription) {
  const SERVER_URL = '/api/pushsignup'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
      auth: subscription.keys ? subscription.keys.auth : null,
      p256dh: subscription.keys ? subscription.keys.p256dh : null,
      expirationTime: subscription.expirationTime
    }),
  })
  return response
}

self.addEventListener('push', function(event) {
  showNotification()
})