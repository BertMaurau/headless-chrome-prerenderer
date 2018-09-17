// Basic code from: https://developers.google.com/web/tools/puppeteer/articles/ssr
// Modified for a param defined request URL.
// Ex. /render?url=www.google.com

const express = require('express');
const ssr = require('./lib/ssr').ssr;

const app = express();

const SERVER_PORT = 1337;

// listen for render route
app.get('/render', async (req, res, next) => {

   // get the url param from query params
   const url = req.query.url;
   if (!url) {
      return res.status(422).send('Missing URL parameter!');
   }

   const {
      html,
      ttRenderMs
   } = await ssr(url);

   // Add Server-Timing! See https://w3c.github.io/server-timing/.
   res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
   return res.status(200).send(html);
});

app.listen(SERVER_PORT, () => console.log(`Pre-Render server started on port ${SERVER_PORT}.`));