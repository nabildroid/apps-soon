

export type IApp = {
    id: string;
    created_time: string; // ISO 8601 date string
    last_edited_time: string; // ISO 8601 date string
    archived: boolean;
    in_trash: boolean;
    url: string;
    public_url: string | null;
    // Simplified properties from the 'properties' object
    "Section 1-3": string; // Assuming plain_text extraction or empty string
    "Section 1-5": string; // Assuming plain_text extraction or empty string
    "Redirect link": string | null;
    "Formula": string | null; // Based on formula.string
    "after price": number | null;
    "Section 2-4": string; // Assuming plain_text extraction or empty string
    "Template": string | null; // Based on select.name
    "before Price": number | null;
    "Section 2-2": string; // Assuming plain_text extraction or empty string
    "page_id": string; // Renamed from 'id' property, based on rich_text[0].plain_text
    "Description": string; // Assuming plain_text extraction or empty string
    "Section 2": string; // Assuming plain_text extraction or empty string
    "picutre": number | null; // Typo "picutre" kept from JSON
    "Stripe": string | null;
    "Section 1-4": string; // Assuming plain_text extraction or empty string
    "Section 1-2": string; // Assuming plain_text extraction or empty string
    "Section 1": string; // Assuming plain_text extraction or empty string
    "Redirect Percentage ": number | null; // Space at the end kept from JSON
    "Section 2-3": string; // Assuming plain_text extraction or empty string
    "Section 2-5": string; // Assuming plain_text extraction or empty string
    "Name": string; // Based on title[0].plain_text
};


export function makeIAPPFromNotionPage(pageData: any): IApp {
    const properties = pageData.properties;

    // Helper to safely get plain text from rich_text or title arrays
    const getPlainText = (prop: any): string => {
        if (prop?.rich_text?.length > 0) {
            return prop.rich_text[0]?.plain_text ?? '';
        }
        if (prop?.title?.length > 0) {
            return prop.title[0]?.plain_text ?? '';
        }
        return '';
    };

    // Helper to safely get number
    const getNumber = (prop: any): number | null => {
        return prop?.number ?? null;
    };

    // Helper to safely get URL
    const getUrl = (prop: any): string | null => {
        return prop?.url ?? null;
    };

    // Helper to safely get formula string
    const getFormulaString = (prop: any): string | null => {
        return prop?.formula?.string ?? null;
    };

    // Helper to safely get select name
    const getSelectName = (prop: any): string | null => {
        return prop?.select?.name ?? null;
    };


    return {
        id: pageData.id,
        created_time: pageData.created_time,
        last_edited_time: pageData.last_edited_time,
        archived: pageData.archived,
        in_trash: pageData.in_trash,
        url: pageData.url,
        public_url: pageData.public_url,
        "Section 1-3": getPlainText(properties["Section 1-3"]),
        "Section 1-5": getPlainText(properties["Section 1-5"]),
        "Redirect link": getUrl(properties["Redirect link"]),
        "Formula": getFormulaString(properties["Formula"]),
        "after price": getNumber(properties["after price"]),
        "Section 2-4": getPlainText(properties["Section 2-4"]),
        "Template": getSelectName(properties["Template"]),
        "before Price": getNumber(properties["before Price"]),
        "Section 2-2": getPlainText(properties["Section 2-2"]),
        // Note: Notion property 'id' maps to 'page_id' in IApp
        "page_id": getPlainText(properties["id"]),
        "Description": getPlainText(properties["Description"]),
        "Section 2": getPlainText(properties["Section 2"]),
        "picutre": getNumber(properties["picutre"]), // Typo kept
        "Stripe": getUrl(properties["Stripe"]),
        "Section 1-4": getPlainText(properties["Section 1-4"]),
        "Section 1-2": getPlainText(properties["Section 1-2"]),
        "Section 1": getPlainText(properties["Section 1"]),
        "Redirect Percentage ": getNumber(properties["Redirect Percentage "]), // Space kept
        "Section 2-3": getPlainText(properties["Section 2-3"]),
        "Section 2-5": getPlainText(properties["Section 2-5"]),
        // Note: Notion property 'Name' (type title) maps to 'Name' in IApp
        "Name": getPlainText(properties["Name"]),
    };
}

// Example Usage (assuming you have the JSON data in a variable called notionResponseData)
// const pageObject = notionResponseData.data.results[0];
// const appData: IApp = makeIAPPFromNotionPage(pageObject);
// console.log(appData);
