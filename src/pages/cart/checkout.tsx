import { useState } from "react";
import { useRouter } from "next/router";
import { getWebsitesCustomersAddresses } from "@/servers/customers/hooks/useGetWebsitesCustomersAddresses";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { Address } from "@/servers/customers";
import { LoginAndAddToCart } from "@/components/auth";
import AdressContainer from "@/components/adress/adressContainer";
import { useProducts } from "@/context/ProductsContext";
import { usePostWebsitesEcommerceOrders } from "@/servers/ecommerce/hooks/usePostWebsitesEcommerceOrders";
import Image from "next/image";
import { Session } from "next-auth";
import routes from "@/routes";
import { getWebsitesEcommerceOrdersQueryKey } from "@/servers/ecommerce/hooks/useGetWebsitesEcommerceOrders";
import { useQueryClient } from "@tanstack/react-query";
import { postWebsitesEcommerceOrdersPaymentIntent } from "@/servers/ecommerce/hooks/usePostWebsitesEcommerceOrdersPaymentIntent";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Checkout from "@/components/checkoutinner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Renomeie seu componente principal para não ser o default
const CheckoutInner = ({
  address,
  sessionNext,
}: {
  address: Address[];
  sessionNext: Session;
}) => {
  // ...todo o seu código do Checkout aqui...
};

export default function CheckoutPage(props: any) {
  return (
    <Elements stripe={stripePromise}>
      <Checkout {...props} />
    </Elements>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const address = await getWebsitesCustomersAddresses({
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  });

  return {
    props: { address, sessionNext: session },
  };
};
