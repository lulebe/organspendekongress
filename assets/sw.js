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
  if (!vapid) return
  try {
    const options = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapid)
    }
    const subscription = await self.registration.pushManager.subscribe(options)
    const response = saveSubscription(subscription)
    console.log(await response)
  } catch (err) {
    console.log('Error', err)
  }
})

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
 
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function saveSubscription (subscription) {
  const sub = JSON.parse(JSON.stringify(subscription))
  console.log(sub)
  const SERVER_URL = '/api/pushsignup'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: sub.endpoint,
      auth: sub.keys ? sub.keys.auth : null,
      p256dh: sub.keys ? sub.keys.p256dh : null,
      expirationTime: sub.expirationTime
    }),
  })
  return response
}

self.addEventListener('push', function(event) {
  showNotification()
})