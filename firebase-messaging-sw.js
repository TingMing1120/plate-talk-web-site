// 匯入 Firebase 9.x 兼容版本的 app 和 messaging 腳本，供 Service Worker 使用
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// 初始化 Firebase app，填入你的專案設定
firebase.initializeApp(firebaseConfig);

// 取得 Firebase Cloud Messaging 的實例，準備接收訊息
const messaging = firebase.messaging();

// 監聽背景訊息事件
messaging.onBackgroundMessage((payload) => {
  // 印出收到的背景通知內容及當下 ISO 格式時間
  console.log(
    `[${new Date().toISOString()}] [firebase-message-sw.js] 收到背景通知: `,
    payload
  );
  /* 
  下面程式碼反註解後會讓通知發送兩次，讓service work 去自動發送就好了，在F12 Application 找到service worker 查看所有 
  see all registration
  找到你的網址，然後/firebase-messaging-sw.js，這是你在js上面寫的
  // 從 payload 拿出 notification 部分
  const notification = payload.notification;

  // 設定通知標題，如果沒帶就用預設標題
  const notificationTitle = notification.title || "預設標題";

  // 設定通知內容與圖示，如果沒帶就用預設文字與圖示
  const notificationOptions = {
    body: notification.body || "預設內文",
    icon: notification.imageUrl || "/default-icon.png",
  };

  // 顯示通知，讓用戶在背景也能看到推播
  self.registration.showNotification(notificationTitle, notificationOptions);
  */
});
