// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { updateProfile } from "../services/api/authApi";
import { useMutation } from "@tanstack/react-query";

const VAPID_KEY = import.meta.env.VITE_VAPID_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyCO7MMLPLm4XT2Tebf-uwUr6nj4aIl2rKM",
  authDomain: "alldrivesos-f48ec.firebaseapp.com",
  projectId: "alldrivesos-f48ec",
  storageBucket: "alldrivesos-f48ec.appspot.com",
  messagingSenderId: "878499335163",
  appId: "1:878499335163:web:aef1a62b3f0fba2975595e",
  measurementId: "G-2J88YZC3JJ",
};
export const app = initializeApp(firebaseConfig);

export const requestForToken = async () => {
  const messaging = getMessaging(app);

  await getToken(messaging, { vapidKey: `${VAPID_KEY}` })
    .then((currentToken) => {
      if (currentToken) {
        sendToken(currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const requestForTokenForService = async () => {
  const messaging = getMessaging(app);

  return await getToken(messaging, { vapidKey: `${VAPID_KEY}` })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

const sendToken = async (payload: string) => {
  const mutate = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["save_fcm"],
  });
  const data = {
    fcm_token: payload,
  };
  mutate.mutate(data, {
    onSuccess: () => {},
    onError: () => {},
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
