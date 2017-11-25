# chromeExtension

The workflow to use this is really odd, because I did this very quickly using a template I use for other things. Feel free to take the code out of the background and either into the popup if you already understand message passing in chrome extensions or just toss the background folder's code into a separate program.

Installing and playing with the blue alliance api:
1. Download this repo and make sure it's unzipped in a location on your computer
2. Go to chrome://extensions/ in a chrome browser and use the "Load Unpacked Extension" button to add the downloaded top level folder to your browser as an extension
3. While still in chrome://extensions/ you should see the extension at the top. Click on the "Inspect views: background page" link. This should pull up developer tools where the console should show any api calls you made to the api in background/background.js and anything you logged to the console
4. Change background/background.js to make other calls to the blue alliance api, going to chrome:/extensions/ and reloading your extension after every change (a little bit of a pain, I know). tba api docs are here: https://www.thebluealliance.com/apidocs/v3

Apologies for the messy code, hopefully this can get you up and running quickly.


THIS IS CLONED FROM: https://github.com/IanHovander/BlueAllianceApiTesting
