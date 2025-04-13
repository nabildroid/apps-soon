import { makeIAPPFromNotionPage } from "@/app/types";
import { analytics, notion } from "@/app/utils";
import { unstable_cache as cache } from "next/cache"
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

import { waitUntil } from "@vercel/functions";
import { getAppById } from "@/app/lib";



export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, context: {
    params: Promise<{
        id: string,
        client: string,
    }>
}) {
    const params = await context.params;
    console.time("NotionApp");
    const app = await getAppById(params.id);
    console.timeEnd("NotionApp");

    // either go to the redirection link, or go to the template, or default coming soon

    const searchParams = Array.from(new URL(request.url).searchParams.entries()).reduce((acc, [key, value]) => {
        (acc as any)["searchParams-" + key] = value;
        return acc;
    }, {});

    const cookiess = Array.from(await cookies()).reduce((acc, [key, value]) => {
        (acc as any)["cookie-" + key] = value;
        return acc;
    }, {});

    const headerss = Array.from(await headers()).reduce((acc, [key, value]) => {
        (acc as any)["header-" + key] = value;
        return acc;
    }, {});

    // for now let's go to the redirection link only
    analytics.capture({
        distinctId: params.client,
        event: "viewed",
        disableGeoip: true,
        properties: {
            id: params.id,
            ...cookiess,
            ...headerss,
            ...searchParams,
        }
    });



    let url: URL;
    try {
        url = new URL(app["Redirect link"]!);
    } catch (e) {
        url = new URL("https://l.laknabil.me/t/soon");
    }


    return Response.redirect(url);
}