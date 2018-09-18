# Simple Headless-Chrome SEO Pre-renderer redirect

## What

A Node service that uses Puppeteer to load the given URL into headless-chrome and returns the generated HTML. Preferably used for social network sharing.

Using the Apache rewrite module to redirect bots/scrapers to the pre-rendered website that contains the generated meta-tags, while still letting normal users go through to the normal functioning website.

## Why

I'm currently working on a platform for multiple clients, which is hosted on a shared hosting server without access to NodeJS or anything like that. Which means that for ex. `Angular Universal` is out of the question.

I have access to another 'global' server which runs NodeJS, so I've set this 'redirect' up for bots to be redirected this server while normal users still land on the shared hosting's page.

Inspired by the Prerender.io service and the basic Puppeteer example for direct rendering.

## Setup

Clone this repo (or download) and copy the files to the root of the directory (or the location you'd want to run from).

   Run `npm install`

   Run `node index` to start you server.

If you're using PM2

   Run `pm2 start index.js`


On the second host (the actual hosting) add a rewrite rule to your `.htaccess` to redirect bots/scrapers/crawlers to the pre-rendered website, but let the normal users go through to a working website.

```
<IfModule mod_rewrite.c>
    RewriteEngine On
	
	<IfModule mod_proxy_http.c>
      RewriteCond %{HTTP_USER_AGENT} (googlebot|bingbot|yandex|baiduspider|facebookexternalhit[0-9]|twitterbot|rogerbot|linkedinbot|embedly|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator) [NC]
		RewriteCond %{Request_URI} !^robots.txt
		RewriteRule ^(.*) <url-to-render-host>?url=%{REQUEST_SCHEME}://%{HTTP_HOST}%{REQUEST_URI} [P,L]
	</IfModule>

</IfModule>
```

## Usage

`https://your-server:<port>/render?url=<url-to-render>`

