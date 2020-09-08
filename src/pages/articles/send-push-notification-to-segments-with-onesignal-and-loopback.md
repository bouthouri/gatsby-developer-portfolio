---
title: "Send push notification to segments with OneSignal and Loopback"
published_at: "07 Oct 19"
slug: "send-push-notification-to-segments-with-onesignal-and-loopback-4jjd"
---

##The scenario

Our e-commerce mobile app has grown big and we now have a lot of subscribers and items to sell.
Sending classic push notification without any strategy is not enough anymore, so we need some help.
We hire a marketing specialist and we are going to work on user engagement together.
In this article, we will talk about how to send a notification to groups of people based on a complex combination of many tags.

##Segments

Let's say we need to attract active Tunisian teenagers, so we have to figure out what tag to use.

- Age: between 13 and 19
- Country: they are in Tunisia
- Sport: they are currently practicing some sort of sport
  This part is defined by the marketing team and translated to a segment.
  After that when sending a notification we will address this segment.

##Creating the segment

Segments cannot be created programmatically, they are only made on the OneSignal dashboard.

1- On the OneSignal dashboard go to your app then to Audience and click on 'New Segment' to create a new one.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/f48q96t7h4f7lhrfbhs5.png)

2- On the pop up you can name your segment at the top, this name will be used by developers so a neat one would be great.
You can also add all types of tags.
There are some default tags provided by OneSignal like the country tag but you can also add your tag on 'User tag'

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/4ryu66kustbdtjo9mh3f.png)

Select what type of tag you want to use and complete the form.
For a country tag, you will have a list to choose from.
The user number at the top right corner will update and show you how many users there are in this segment.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/f0j26z334fo22kexefnp.png)

3- Our segment will be named ATT for active Tunisian teenager
and these are the combinations of tags we need.
Of course, you can add tags by clicking 'ADD TAGS' or you can make an alternative logic 'sort of or operator' by clicking on 'ADD OR'

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/amfi3i6ppdrh61vjj2g0.png)

Our final result will look like this after clicking on 'CREATE SEGEMNT'

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/hfolraj5cgdr0nbnvydp.png)

## Sending the notification

The code is not complicated at all, we will use the `setIncludedSegments` method instead of using user id or tags.
so if we change the `common/model/item.js` file to use segment instead of tags it will look like this:

```javascript
Item.afterRemote("create", function(ctx, modelInstance, next) {
  if (modelInstance.bio) {
    // the product is bio so we should notify the users
    // instantiate the OneSignal app client
    var myClient = new OneSignal.Client({
      userAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm", // REST API Key
      app: {
        appAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm", // REST API Key
        appId: "fd568c3d-4d40-405f-9214-b5acf470fac8", // OneSignal App ID
      },
    })

    // create the notification
    var availabilityNotification = new OneSignal.Notification({
      contents: { en: "There's a new bio item" },
    })

    // set the segment
    availabilityNotification.setIncludedSegments(["ATT"])

    //send notification
    myClient.sendNotification(availabilityNotification, function(
      err,
      httpResponse,
      data
    ) {
      if (err) next(err) //if there's an error we return the error as response
      next() // else we return the response
    })
  } else {
    next()
  }
})
```

##Final words

In this series, I have put all my knowledge about using push notifications with loopback applications.
Every article was based on a real-life application and all the errors I talked about are actual dumb errors I have made me or my team.

> In fact, I detain the record of the highest number of people receiving notification by error with a count of more than 5k users 💪

You can find the complete code in this repository, use your credentials though because what I put are fake:
https://github.com/Boussama/loopback-push-notification

Switch to the 'group-notification' branch:  
`git checkout segment-notification`  
If you have any question feel free to post a comment or a GitHub issue.
