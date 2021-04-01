const express=require('express');
const webpush=require('web-push');
const path=require('path');

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const publicVapidKey="BCq4_96R9SxAXdTuM95RLtiaA2P6kpW6Sm6D4abeeDb6ub_-K3W6QnHJKKlVYFbsFY8psAmKQjDY7OVgwftbT6Y";
const privateVapidKey="ilFZzoy1IqIvJSuphDK4skm2tMxOsJACACS63CuGKBc";

webpush.setVapidDetails(
    'mailto:pratikshathakur360@gmail.com',
    publicVapidKey,
    privateVapidKey
    );

app.post('/subscribe',(req,res)=>{
    //get pushSubscription object
    const subscription=req.body;
    
    //send 201-resource created
    res.status(201).json({})

    //create payload
    const payload=JSON.stringify({title:"Push test"});

    //pass object into sendNotification
    webpush.sendNotification(subscription,payload).catch(err=>console.log(err));
})

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})