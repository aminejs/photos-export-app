# photos-export-app

> I started working with facebook API. I made the authentication with facebook and i started getting data with the graph API, but facebook has blocked me many times and i didn't figured out why. That's why i decided to create this project where i've used almost the same logic, functionalities and tools i would use if facebook was available. 

The differences are:
   - I created myself the object i suppose to get from facebook.
   - I send just the photos links to firebase database. because i use pixabay.com to load the app photos, and pixabay.com doesn't allow any download request from any domain (i get this error Access-Control-Allow-Origin) they are specifying the origins. i've tried to send requests to many image websites but all of them return the same error.
   - Instead of displaying the progress bar when the photos are uploading to firebase storage. i display it when selecting photos, to show how many photos the user is selecting out of the total photos.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
