# decImg
Converts Roblox Decal IDs to Image IDs via the asset delivery API.

Live at [decimg.pages.dev](https://decimg.pages.dev)

## Stack
Static HTML/CSS/JS — Cloudflare Pages Functions

## How it works
Fetches the decal's XML from Roblox through a Cloudflare Pages Function with a `.ROBLOSECURITY` cookie attached server-side, then extracts the Image ID. The cookie is never exposed to the client.

## Deploy
1. Fork the repo
2. Deploy to Cloudflare Pages
3. Add your `.ROBLOSECURITY` cookie as `ROBLOX_COOKIE` in the Cloudflare dashboard
