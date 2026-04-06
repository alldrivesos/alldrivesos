// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCO7MMLPLm4XT2Tebf-uwUr6nj4aIl2rKM",
    authDomain: "alldrivesos-f48ec.firebaseapp.com",
    projectId: "alldrivesos-f48ec",
    storageBucket: "alldrivesos-f48ec.appspot.com",
    messagingSenderId: "878499335163",
    appId: "1:878499335163:web:aef1a62b3f0fba2975595e",
    measurementId: "G-2J88YZC3JJ"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});