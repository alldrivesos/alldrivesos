import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { onMessageListener, requestForToken } from "../firebase/firebase";
interface Notify {
  title: string;
  body: string;
}
const Notification = () => {
  const [notification, setNotification] = useState<Notify>({
    title: "",
    body: "",
  });
  const notify = () => toast.info(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return <></>;
};

export default Notification;
