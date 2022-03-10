importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

firebase.initializeApp({
    apiKey: "AIzaSyAhgO18_s_1za7LcVyQDnH3QbAL5L1-dDI",
    authDomain: "any-time-message.firebaseapp.com",
    databaseURL: "https://any-time-message-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "any-time-message",
    storageBucket:"any-time-message.appspot.com",
    messagingSenderId:" 639372300514",
    appId: "1:639372300514:web:be920c413b34ee95758ebb"
  })

const message = firebase.messaging();
// message.onBackgroundMessage((payload)=>{
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body:  payload.notification.body,
//       icon: './favicon.ico'
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
// })