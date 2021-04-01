console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Pratiksha Thakur!",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEuoOHR0vxJaKO_nh2boPzvJ4t9mO5XygVMQ&usqp=CAU"
  });
});