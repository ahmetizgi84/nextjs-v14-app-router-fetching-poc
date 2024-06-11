import ListOfProducts from "@/app/components/ListOfProducts";
import TitlePage from "@/app/components/TitlePage";
import { getData } from "@/app/lib/actions";

// export function generateStaticParams() {}

export default async function Static() {
  const products = await getData(
    "https://66547cc61c6af63f467827d1.mockapi.io/api/v1/products",
    { cache: "force-cache" } // default behaviour is also 'force-cache'
  );

  return (
    <main className="flex h-[calc(100vh-90px)] flex-col items-center justify-between mt-[-25px] md:mt-[-45px] px-10 py-10 md:p-24">
      <div>
        <TitlePage
          title="Static Page"
          subtitle="This page does the fetch only once and the content
               is cached. It is the default behavior. It is not necessary to pass any parameters in the fetch."
          codeExample="const res = await fetch(url)"
          urlExampleGitHub="https://github.com/ahmetizgi84/nextjs-v14-app-router-fetching-poc/blob/development/app/(pages)/static/page.tsx#L8-L11"
          underlineColor="border-blue-500 border-b-4"
          underlineWidth="w-[140px] md:w-[150px]"
        />

        <ListOfProducts products={products} color="text-blue-600" />
      </div>
    </main>
  );
}
