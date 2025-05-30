import { revalidateTag } from "next/cache";


export async function GET(req: any, { params }: { params: Promise<{ id: string }> }
) {

    revalidateTag("notion/app/" + (await params).id);


    return new Response(
        JSON.stringify({
            message: "Revalidating",
        }),
    );
}