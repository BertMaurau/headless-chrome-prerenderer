# Simple Headless-Chrome SEO Pre-renderer redirect

## What

A Node service that uses Puppeteer to load the given URL into headless-chrome and returns the generated HTML. Preferably used for social network sharing.

Using the Apache rewrite module to redirect bots/scrapers to the pre-rendered website that contains the generated meta-tags, while still letting normal users go through to the normal functioning website.

## Why

I'm currently working on a platform for multiple clients, which is hosted on a shared hosting server without access to NodeJS or anything like that. Which means that for ex. `Angular Universal` is out of the question.

I have access to another 'global' server which runs NodeJS, so I've set this 'redirect' up for bots to be redirected this server while normal users still land on the shared hosting's page.

## Setup

Copy the `index` and the `lib/ssr` to the root of the directory (or the location you'd want to run from).

   Run `npm install`

   Run `node index` to start you server.

If you're using PM2

   Run `pm2 start index.js`


Add a rewrite rule to your `.htaccess` to redirect bots/scrapers to the pre-rendered website, but let the normal users go through to a working website.

```
<IfModule mod_rewrite.c>
   RewriteEngine On

   RewriteCond %{HTTP_USER_AGENT} (googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator) [NC]
        
   RewriteRule .* https://your-server:<port>/render?url=%{REQUEST_SCHEME}://%{HTTP_HOST}%{REQUEST_URI} [R,P,L]
</IfModule>
```

## Usage

`https://your-server:<port>/render?url=<url-to-render>`

