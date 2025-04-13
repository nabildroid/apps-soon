import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache'
import { makeIAPPFromNotionPage } from "./types";
import { notion } from "./utils";




export async function getAppById(id: string) {
    'use cache'

    cacheTag("notion/app/" + id);
    cacheLife("notionApp")
    const response = await notion.databases.query({
        database_id: "1d39fc6fac8780139981ffad065bd774",
        filter: {
            property: "id",
            rich_text: {
                equals: id,
            },
        },
    });

    if (response.results.length === 0) {
        throw new Error("No data found");
    }

    return makeIAPPFromNotionPage(response.results[0]);
}