import ListOfProducts from "@/app/components/ListOfProducts";
import TitlePage from "@/app/components/TitlePage";
import { getData } from "@/app/lib/actions";

export default async function ISRTimeBased() {
  const products = await getData(
    "https://66547cc61c6af63f467827d1.mockapi.io/api/v1/products",
    { next: { revalidate: 30 } } // Time revalidation 30 seconds
  );

  return (
    <main className="flex h-[calc(100vh-90px)] flex-col items-center justify-between mt-[-55px] md:mt-[-55px] px-10 py-10 md:p-24">
      <div>
        <TitlePage
          title="ISR Time-based Revalidation"
          subtitle="This page does the fetch at the time of build and the content
               will be updated every 30 seconds. It is necessary to specify in the fetch how many seconds the revalidate will be performed."
          codeExample="const res = await fetch(url, { next: { revalidate: 30 } } )"
          urlExampleGitHub="https://github.com/larturi/nextjs-v14-app-router-fetching-isr-poc/blob/main/app/(pages)/isr/page.tsx#L5-L16"
          underlineColor="border-red-500 border-b-4"
          underlineWidth="w-[130px] md:w-[280px]"
        />

        <ListOfProducts products={products} color="text-red-500" />
      </div>
    </main>
  );
}
