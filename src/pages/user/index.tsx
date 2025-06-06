import { LoginAndAddToCart } from "@/components/auth";
import { signOut, useSession, getSession } from "next-auth/react";
import { Address } from "@/servers/customers";
import { GetServerSidePropsContext } from "next";
import { getWebsitesCustomersAddresses } from "@/servers/customers/hooks/useGetWebsitesCustomersAddresses";
import AdressContainer from "@/components/adress/adressContainer";
import Link from "next/link";
import routes from "@/routes";
import { Session } from "next-auth";

const User = ({
  adresss,
  sessionNext,
}: {
  adresss: Address[];
  sessionNext: Session;
}) => {
  if (!sessionNext) {
    return (
      <div>
        <button
          onClick={(event) => {
            LoginAndAddToCart(event);
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-white">
        Olá, {sessionNext?.user?.name}
      </h1>
      <div className="flex gap-5 items-center">
        <Link
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          href={routes.orders}
        >
          As minhas Encomendas
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <AdressContainer
        adresss={adresss}
        session={sessionNext}
      ></AdressContainer>
    </div>
  );
};

export default User;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const adresss = await getWebsitesCustomersAddresses({
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  });

  return {
    props: { adresss, sessionNext: session },
  };
};
