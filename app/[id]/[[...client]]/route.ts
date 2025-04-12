import { makeIAPPFromNotionPage } from "@/app/types";
import { analytics, notion } from "@/app/utils";
import { unstable_cache as cache } from "next/cache"
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

import { waitUntil } from "@vercel/functions";



export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, context: {
    params: Promise<{
        id: string,
        client: string,
    }>
}) {
    const params = await context.params;

    // const queries = cache(async () => {
    const data = await notion.databases.query({
        database_id: "1d39fc6fac8780139981ffad065bd774",
        filter: {
            property: "id",
            rich_text: {
                equals: params.id,
            },
        },
    });
    // }, [params.id], { tags: ["notion/" + params.id + Math.random()] });


    // const data = await queries();


    if (data.results.length === 0) {
        return new Response(
            JSON.stringify({
                message: `No data found for ${params.id} for ${params.client}`,
            }),
            { status: 404 }
        );
    }

    const app = makeIAPPFromNotionPage(data.results[0]);

    // either go to the redirection link, or go to the template, or default coming soon





    const searchParams = Array.from(new URL(request.url).searchParams.entries()).reduce((acc, [key, value]) => {
        (acc as any)[key] = value;
        return acc;
    }, {});

    const cookiess = Array.from(await cookies()).reduce((acc, [key, value]) => {
        (acc as any)[key] = value;
        return acc;
    }, {});

    const headerss = Array.from(await headers()).reduce((acc, [key, value]) => {
        (acc as any)[key] = value;
        return acc;
    }, {});
    // for now let's go to the redirection link only
    waitUntil(new Promise(async (r) => {
        analytics.capture({
            distinctId: params.client,
            event: "viewed",
            disableGeoip: true,
            properties: {
                id: params.id,
                cookies: cookiess,
                headers: headerss,
                searchParams,
            }
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
    }));


    return Response.redirect(app["Redirect link"] ?? "https://laknabil.me");
}