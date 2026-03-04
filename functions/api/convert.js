const HEADERS = { "Content-Type": "application/json" };
const URL_REGEX = /<url>(.*?)<\/url>/i;
const ID_REGEX = /(\d+)$/;

function json(body, status) {
    return new Response(JSON.stringify(body), { status, headers: HEADERS });
}

export async function onRequest(context) {
    var decalId = new URL(context.request.url).searchParams.get("id");

    if (!decalId) {
        return json({ error: "Missing Decal ID" }, 400);
    }

    var authCookie = context.env.ROBLOX_COOKIE;

    if (!authCookie) {
        return json({ error: "Server configuration error" }, 500);
    }

    try {
        var response = await fetch(
            "https://assetdelivery.roblox.com/v1/asset/?id=" + decalId,
            { headers: { Cookie: ".ROBLOSECURITY=" + authCookie } }
        );

        if (!response.ok) {
            var message = response.status === 401
                ? "Authentication failed \u2014 cookie may be expired."
                : "Roblox returned status " + response.status;
            return json({ error: message }, 502);
        }

        var body = await response.text();
        var urlMatch = body.match(URL_REGEX);

        if (!urlMatch || !urlMatch[1]) {
            return json({ error: "Could not extract Image ID from response" }, 500);
        }

        var idMatch = urlMatch[1].match(ID_REGEX);

        if (!idMatch || !idMatch[1]) {
            return json({ error: "Could not extract Image ID from response" }, 500);
        }

        return json({ imageId: idMatch[1] }, 200);
    } catch (error) {
        return json({ error: error.message }, 500);
    }
}
