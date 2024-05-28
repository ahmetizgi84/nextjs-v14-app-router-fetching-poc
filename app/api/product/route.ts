import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/ssg/[id]";
  const product = request.nextUrl.searchParams.get("product") || "product";

  console.log({ path });
  revalidatePath(path, "page");
  revalidateTag(product);

  console.log("revalidated", path, product);
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    cache: "no-store",
  });
}
