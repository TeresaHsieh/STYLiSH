# Week 3 Part 4

## Assignment

### Step 1: Facebook Login

We have a good e-commerce website, but not so good. Let's add member system to our website by `Facebook Login`.

Follow steps below to complete Facebook Login:

0. Before everything, we should distribute our website to `Github Page`.
1. Go to [Facebook Developer Website](https://developers.facebook.com/). Create a Facebook App.
2. In the basic settings, fill `App Domain` and `Website URL`. Get `APP ID` from your Facebook App.
3. Refer to [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/web) for `Facebook Login procedure`.
4. When user click on member icon in the page: start `Facebook Login procedure` if user is `not signed in`; or direct to profile page if user is `signed in`.
5. Get `user picture`, `name`, and `email` by [Facebook Graph API](https://developers.facebook.com/docs/graph-api) and show them in the profile page.
6. `Facebook Login procedure` should be included in all the pages we made.

Hint: in the `Facebook Login procedure`, take special attention on the `permissions` we request from user.
