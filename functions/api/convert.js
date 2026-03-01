export async function onRequest(context) {
    const url = new URL(context.request.url);
    const decalId = url.searchParams.get("id");
    const authCookie = context.env.ROBLOX_COOKIE;

    if (!decalId) {
        return new Response(JSON.stringify({ error: "Missing Decal ID" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    if (!authCookie) {
        return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    try {
        const response = await fetch(`https://assetdelivery.roblox.com/v1/asset/?id=${decalId}`, {
            headers: { "Cookie": `.ROBLOSECURITY=${authCookie}` }
        });

        if (!response.ok) {
            if (response.status === 401) throw new Error("Authentication failed — cookie may be expired.");
            throw new Error(`Roblox returned status ${response.status}`);
        }

        const xmlText = await response.text();
        const urlMatch = xmlText.match(/<url>(.*?)<\/url>/i);

        if (urlMatch && urlMatch[1]) {
            const idMatch = urlMatch[1].match(/(\d+)/);
            if (idMatch && idMatch[1]) {
                return new Response(JSON.stringify({ imageId: idMatch[1] }), { status: 200, headers: { "Content-Type": "application/json" } });
            }
        }

        throw new Error("Could not extract Image ID from response.");
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
