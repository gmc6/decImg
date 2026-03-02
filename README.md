# decImg

Converts Roblox Decal IDs to Image IDs.

Live at [decimg.pages.dev](https://decimg.pages.dev)

## How it works

Roblox decals wrap an image asset. This tool takes the Decal ID, fetches the underlying XML from the Roblox asset delivery API via a Cloudflare Pages Function, and extracts the actual Image ID from it.

The `.ROBLOSECURITY` cookie is stored as a Cloudflare environment variable and never exposed to the client.

## Stack

- Static HTML/CSS/JS frontend
- Cloudflare Pages Functions for the authenticated proxy

## Deployment

1. Fork the repo
2. Deploy to Cloudflare Pages
3. Add your `.ROBLOSECURITY` cookie as an environment variable named `ROBLOX_COOKIE` in the Cloudflare dashboard
4. Done
