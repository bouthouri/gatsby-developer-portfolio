---
title: "Send push notification on Loopback with OneSignal"
published_at: "23 Sep 19"
slug: "send-push-notification-on-loopback-with-onesignal-oan"
---

Push notification is a technology that let your server communicates with your app in one way communication.
For example when you have new content on your blog and you want to notify your users about it.
Push notification is an active way to contact your user even when they are not visiting your website/app.
Used in the right way it will lead to more user interaction, but in the wrong hands, it will lead to spam and an angry user and ultimately to your app delete.

In this tutorial, I will explain how to send a push notification using Loopback and OneSignal to a web app or a mobile app.

## Why OneSignal?

- The free plan has unlimited push notification both for web and mobile users
- You can customize your users by segment 'up to 6 segments for the free plan'
- Easy integration with mobile and web apps
- Tested in production with a massive amount of users and push notification

## Why Loopback?

- Opensource solution by StrongLoop/IBM
- Highly performant "tested in production also"
- Highly extensible
- Create APIs so can be used with either mobile, desktop or web apps

## Setting up OneSignal app

First of all, create an account in OneSignal and sign-in.
Then create an app and name it.
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/n8ct7zzbn0tzj8muyu1l.png)

Then select what type of integration you want, in our case we are going to use the web app integration.
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/2ctcb4imxakpxoii6d24.png)

After that, you fill the info form for the application.
What you need to pay attention to is:

1- The site URL:
If you are testing in your computer you are going to use http://localhost:[optional-port]
I used create React app to create a simple web app but you can use what you want, even a simple HTML page.
Because I use React I am going to append 3000 as an optional port for the site URL so the result would be http://localhost:3000

2- Http & Https:
Because we are not using secure connexion "https" we have to add a label to our app.

3- Permission prompt:
You need to choose at least one Permission prompt setup.
This permission prompt is the way that will be used to contact the visitors.
Either a bell in the corner, a native prompt or something else it is going to be set in this section.
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/qnh397tbe1ct1idfip19.png)

The final result should look something like that.
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/ri7gdsofcow8zro0dhjt.jpg)

## Setting up the webApp

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/kxhq2cok6re8y3ym2x7e.png)
Now that all is good from the OneSignal part we need to set up our project so it can receive the notifications.
Inside my React app I am going to copy the provided code inside the `public/index.html` file inside the head tag.
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/c67ffnjnvqirzcozsb79.png)

Now when you visite your application you will find the little bell in the right corner "if you choose the bell prompt"
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/nrb6k5i794d7yovgy600.png)

If you click on the bell you will be subscribed to the website/web app notification channel. Which in the dashboard will result in something like this.
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/bb7i18zbzgmybenqg0ck.png)

## Send notification

###Initialise the project
We create a new Loopback app and install the OneSignal package then we are ready to go.

```shell
Oussama-MacBook-Pro-3:~ oussama\$ lb lb-push-notification
? Enter name of the directory to contain the project: lb-push-notification
create lb-push-notification/
info change the working directory to lb-push-notification

? Which version of LoopBack would you like to use? 3.x (Active Long Term Support)
? What kind of application do you have in mind?
api-server (A LoopBack API server with local User auth)
empty-server (An empty LoopBack API, without any configured models or datasources)
❯ hello-world (A project containing a controller, including a single vanilla Message and a single remote method)
notes (A project containing a basic working example, including a memory database)
```

`npm install onesignal-node --save`

###Get your app credential from OneSignal dashboard
go to your dashboard, click on your app name then go to settings and you will find the credential on 'Keys & IDs'.
Keep them safe and don't share them publicly.
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/ysbcdmid7bc97frbabge.png)

###Send the notification
The project already contains a remote function that accepts a name and returns a greeting message.
The idea is to tweak the project a little bit so it will send the greeting to all the users via push notification.

To do so we need to change the model definition on the `common/models/message.json` file.
We don't need any argument so we will erase the `accept` part.

```javascript
{
  "name": "Message",
  "base": "Model",
  "properties": {},
  "methods": {
    "greet": {
      "isStatic": true,
      "returns": {
        "arg": "greeting",
        "type": "string"
      },
      "http": {
        "verb": "get"
      }
    }
  }
}
```

After that, we modify the function to integrate OneSignal logic.

```javascript
// import the OneSignal library
var OneSignal = require("onesignal-node")

module.exports = function(Message) {
  Message.greet = function(cb) {
    // instantiate your onesignal app client
    var myClient = new OneSignal.Client({
      userAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhxdN2EwOTE3NjJm", // REST API Key
      app: {
        appAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhxdN2EwOTE3NjJm", // REST API Key
        appId: "fd568c3d-4d40-405f-9214-b5aaf470fac8", // OneSignal App ID
      },
    })

    // we need to create a notification to send
    // inside contents we can add many languages I just used the en for English
    // I set the target to all the user who has subscribed
    var firstNotification = new OneSignal.Notification({
      contents: { en: "Hello dear user" },
      included_segments: ["Subscribed Users"],
    })
    // sending the notification and use the callback
    // for both successfull and unseccessfull status

    myClient.sendNotification(firstNotification, function(
      err,
      httpResponse,
      data
    ) {
      if (err) {
        console.log("Something went wrong...")
      } else {
        // return a message to the api if everything is ok
        cb(null, "The notification was sent")
      }
    })
  }
}
```

Here's the final result on the explorer with the return message and the push notification on the top right corner.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/wvdwmcrl51wioshm4mhe.png)

##Final word
Next time I will explain how to send a notification to a single user.

You can find the complete code in these repositories, use your credentials though because what I put are fake:

https://github.com/Boussama/loopback-push-notification  
https://github.com/Boussama/react-push-notification

If you have any question feel free to post a comment or a GitHub issue.
