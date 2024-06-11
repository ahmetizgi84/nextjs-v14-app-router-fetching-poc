import ListOfProducts from "@/app/components/ListOfProducts";
import TitlePage from "@/app/components/TitlePage";
import { getData } from "@/app/lib/actions";

export default async function ServerSide() {
  const products = await getData(
    "https://66547cc61c6af63f467827d1.mockapi.io/api/v1/products",
    { cache: "no-store" } // Always revalidate
  );

  return (
    <main className="flex h-[calc(100vh-90px)] flex-col items-center justify-between mt-[-25px] md:mt-[-45px] px-10 py-10 md:p-24">
      <div>
        <TitlePage
          title="Server Side Page"
          subtitle="This page does the fetch for each page request. Does not apply any
               type of cache, recommended when an instant update is needed. It is necessary to specify in the fetch."
          codeExample='const res = await fetch(url, { cache: "no-store" } )'
          urlExampleGitHub="https://github.com/ahmetizgi84/nextjs-v14-app-router-fetching-poc/blob/development/app/(pages)/server-side/page.tsx#L6-L9"
          underlineColor="border-green-600 border-b-4"
          underlineWidth="w-[190px] md:w-[240px]"
        />
        <ListOfProducts products={products} color="text-green-600" />
      </div>
    </main>
  );
}
