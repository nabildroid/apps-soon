import { Client as NotionClient } from "@notionhq/client";
import { PostHog } from "posthog-node";

export const notion = new NotionClient({
    auth: process.env.NOTION_API_KEY,
})


export const analytics = new PostHog(process.env.POSTHOG_API_KEY!, {
    host: 'https://eu.i.posthog.com',
    disableGeoip: true,
    flushInterval: 0,
    flushAt: 0,
});