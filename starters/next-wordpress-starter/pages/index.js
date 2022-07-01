import { NextSeo } from "next-seo";
import Layout from "../components/layout";
import Image from "next/image";
import { getFooterMenu } from "../lib/Menus";

export default function Home({ menuItems }) {
  const HomepageHeader = () => (
    <div className="prose sm:prose-xl mt-20 flex flex-col mx-auto max-w-fit">
      <h1 className="prose text-4xl text-center h-full">
        Welcome to{" "}
        <a
          className="text-blue-600 no-underline hover:underline"
          href="https://nextjs.org"
        >
          Next.js!
        </a>
      </h1>

      <div className="text-2xl">
        <div className="bg-black text-white rounded flex items-center justify-center p-4">
          Decoupled Wordpress on{" "}
          <Image
            src="/pantheon.png"
            alt="Pantheon Logo"
            width={191}
            height={60}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Layout footerMenu={menuItems}>
      <NextSeo
        title="Decoupled Next Wordpress Demo"
        description="Generated by create next app."
      />
      <HomepageHeader />
    </Layout>
  );
}

export async function getStaticProps() {
  const menuItems = await getFooterMenu();

  return {
    props: {
      menuItems,
    },
  };
}
