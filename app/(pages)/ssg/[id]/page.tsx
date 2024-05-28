import RevalidateSsgButton from "@/app/components/RevalidateSsgButton";
import TitlePage from "@/app/components/TitlePage";
import { getSingleData } from "@/app/lib/actions";
import { Product } from "@/app/types/product";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch(
    "https://66547cc61c6af63f467827d1.mockapi.io/api/v1/products"
  );
  const products = await res.json();

  return products.map((post: Product) => ({
    id: post.id.toString(),
  }));
  // return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

interface Props {
  params: { id: string };
}

export default async function SSG({ params }: Props) {
  const { id } = params;
  const product = await getSingleData(
    `https://66547cc61c6af63f467827d1.mockapi.io/api/v1/products/${id}`,
    // { next: { revalidate: 30, tags: ["product"] } }
    { next: { tags: ["product"] } }
  );

  if (!product) return notFound();

  return (
    <main className="flex h-[calc(100vh-90px)] flex-col items-center justify-between mt-[-55px] md:mt-[-55px] px-10 py-10 md:p-24">
      <div>
        <TitlePage
          title="SSG with On-Demanded Revalidation"
          subtitle="This page does the fetch at the time of build and generate static pages the content
               will be updated when button click."
          codeExample="const res = await fetch(url,  { next: { tags: ['product'] } } )"
          urlExampleGitHub="https://github.com/larturi/nextjs-v14-app-router-fetching-isr-poc/blob/main/app/(pages)/isr/page.tsx#L5-L16"
          underlineColor="border-b-4 border-white"
          underlineWidth="w-[130px] md:w-[280px]"
        />
        <div className="flex justify-center">
          <RevalidateSsgButton text="Revalidate Now!" />
        </div>

        <div className="flex flex-col items-center mt-3">
          <Image
            src={product.image}
            width={400}
            height={400}
            alt={product.name}
            className="object-cover mb-6"
          />

          <div>
            <h2 className={`text-sm md:text-xl font-bold`}>{product.name}</h2>
            <div className="dark:text-white text-gray-500">
              <p className="text-sm hidden md:block">
                Description: {product.description}
              </p>
            </div>
            <div>
              <p>Price: {product.price}</p>
              <p>Stock: {product.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
