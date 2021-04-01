const publicVapidKey='BCq4_96R9SxAXdTuM95RLtiaA2P6kpW6Sm6D4abeeDb6ub_-K3W6QnHJKKlVYFbsFY8psAmKQjDY7OVgwftbT6Y';

//check for service worker----navigator is API for browser
if('serviceWorker' in navigator){
    send().catch(err=>console.error(err))
}

//Register Service wroker,register push,send push
async function send(){
    //Register Service Worker
    console.log('Registering service working...');
    const register=await navigator.serviceWorker.register('/worker.js',{
        scope: '/'
    });
    console.log('Service Worker Registred');

    console.log('Registering push ..');
    const subscription =await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registred');

    console.log('Sending Push ');
    await fetch('/subscribe',{
        method:'POST',
        body:JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    })
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
