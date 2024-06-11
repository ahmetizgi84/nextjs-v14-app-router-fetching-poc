import ListOfProducts from "@/app/components/ListOfProducts";
import RevalidateButton from "@/app/components/RevalidateButton";
import RevalidateServerActionButton from "@/app/components/RevalidateServerActionButton";
import TitlePage from "@/app/components/TitlePage";
import { getData } from "@/app/lib/actions";

export default async function ISROnDemand() {
  const products = await getData(
    "https://66547cc61c6af63f467827d1.mockapi.io/api/v1/products",
    { next: { tags: ["products"] } }
  );

  return (
    <main className="flex h-[calc(100vh-90px)] flex-col items-center justify-between mt-[-55px] md:mt-[-55px] px-10 py-10 md:p-24">
      <div>
        <TitlePage
          title="ISR On-demand Revalidation"
          subtitle="This page does the fetch at the time of build and the content
               will be updated every button click. It is necessary to specify in the fetch tags to revalidate."
          codeExample="const res = await fetch(url, { next: { tags: ['products'] } } )"
          urlExampleGitHub="https://github.com/ahmetizgi84/nextjs-v14-app-router-fetching-poc/blob/development/app/(pages)/isr-on-demand/page.tsx#L7-L11"
          underlineColor="border-red-500 border-b-4"
          underlineWidth="w-[130px] md:w-[280px]"
        />

        <div className="flex justify-center">
          <RevalidateButton text="Revalidate Now!" />
          <RevalidateServerActionButton />
        </div>
        <ListOfProducts products={products} color="text-red-500" />
      </div>
    </main>
  );
}
