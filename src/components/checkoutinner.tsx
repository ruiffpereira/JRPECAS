import { useProducts } from "@/context/ProductsContext";
import routes from "@/routes";
import {
  usePostWebsitesEcommerceOrders,
  postWebsitesEcommerceOrdersPaymentIntent,
  getWebsitesEcommerceOrdersQueryKey,
} from "@/servers/ecommerce";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
// import { Session } from "inspector";
import { useRouter } from "next/router";
import { useState } from "react";
import AdressContainer from "./adress/adressContainer";
import { LoginAndAddToCart } from "./auth";
import { Address } from "@/servers/customers/types/Address";

type SessionWithUser = {
  user: {
    token: string;
    name: string;
    email: string;
    // add other user properties as needed
  };
  // add other session properties as needed
};

const Checkout = ({
  address,
  sessionNext,
}: {
  address: Address[];
  sessionNext: SessionWithUser;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1); // Gerencia as etapas do checkout
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    address.find((a) => a.defaultAdress)?.addressId ?? null
  );
  const [selectedAddressIdFaturarion, setSelectedAddressIdFaturarion] =
    useState<string | null>(
      address.find((a) => a.defaultAdressFaturation)?.addressId ?? null
    );
  const { cart, setCart } = useProducts();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mb_way">("card");
  const [mbwayPhone, setMbwayPhone] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const stripe = useStripe();
  const elements = useElements();

  const { mutate: newOrder, isPending: isPendingOrder } =
    usePostWebsitesEcommerceOrders({
      client: {
        headers: {
          Authorization: `Bearer ${sessionNext?.user.token}`,
        },
      },
    });

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

  async function handleCheckout() {
    if (!selectedAddressId || !selectedAddressIdFaturarion) {
      alert("Por favor, selecione as moradas de envio e faturação.");
      return;
    }

    if (!stripe || !elements) {
      alert("Stripe não carregado.");
      return;
    }

    try {
      const paymentIntent = await postWebsitesEcommerceOrdersPaymentIntent(
        {
          paymentMethod,
          customerId: sessionNext.user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionNext?.user.token}`,
          },
        }
      );

      const { clientSecret } = paymentIntent;

      if (!clientSecret) {
        alert("Erro ao obter o clientSecret do pagamento.");
        return;
      }

      // 2. Usa Stripe.js para processar o pagamento
      if (!stripe) {
        alert("Stripe não foi carregado corretamente.");
        return;
      }

      let result;
      if (paymentMethod === "card") {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          alert("Não foi possível obter o elemento do cartão.");
          return;
        }
        result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: sessionNext.user.name,
              email: sessionNext.user.email,
            },
          },
        });
      } else if (paymentMethod === "mb_way") {
        // MB WAY: pede o número de telemóvel
        result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: sessionNext.user.name,
                email: sessionNext.user.email,
                phone: mbwayPhone,
              },
            },
            return_url: window.location.origin + "/orders?result=success",
          },
          redirect: "always",
        });
        // ... resto do flow ...
      }

      if (result && result.error) {
        alert("Erro no pagamento: " + result.error.message);
        return;
      }
    } catch (error) {
      //router.push(routes.orders);
    }

    newOrder(
      {
        data: {
          billingAddress: selectedAddressIdFaturarion,
          shippingAddress: selectedAddressId,
        },
      },
      {
        onSuccess: () => {
          setCart({ products: [], shipPrice: 0, cartId: "", customerId: "" });
          queryClient.invalidateQueries({
            queryKey: getWebsitesEcommerceOrdersQueryKey(),
          });
          router.push(routes.orders);
        },
        onError: () => {
          router.push(routes.orders);
        },
      }
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Finalizar Encomenda</h1>
      {step === 1 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-green-500">
            Escolha a Morada de Envio
          </h2>
          <AdressContainer
            onSelectAddress={setSelectedAddressId}
            selectedId={selectedAddressId}
            adresss={address}
            session={sessionNext}
          ></AdressContainer>
          <button
            onClick={() => {
              if (selectedAddressId) {
                nextStep();
              } else {
                alert("Por favor, selecione uma morada.");
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-orange-500">
            Escolha a Morada de Faturacao
          </h2>
          <AdressContainer
            onSelectAddressFaturarion={setSelectedAddressIdFaturarion}
            selectedIdFatu={selectedAddressIdFaturarion}
            adresss={address}
            session={sessionNext}
          ></AdressContainer>
          <div className="ml-auto flex gap-2">
            <button
              onClick={prevStep}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
            >
              Retroceder
            </button>
            <button
              onClick={() => {
                if (selectedAddressIdFaturarion) {
                  nextStep();
                } else {
                  alert("Por favor, selecione uma morada.");
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-2">
          <h2 className=" text-xl mb-2">
            Resumo do Pedido -{" "}
            <span className="text-2xl font-bold">{cart.shipPrice}€</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cart.products.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform"
              >
                <div className="relative w-32 h-32 mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">
                  {item.name}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl font-semibold text-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="text-lg text-gray-300 mb-2">
                  Preço:{" "}
                  <span className="font-bold text-white">{item.price}€</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mb-4">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span className="ml-2">Cartão</span>
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="mb_way"
                checked={paymentMethod === "mb_way"}
                onChange={() => setPaymentMethod("mb_way")}
              />
              <span className="ml-2">MB WAY</span>
            </label>
          </div>
          {paymentMethod === "mb_way" ? (
            <input
              type="tel"
              placeholder="Telemóvel MB WAY"
              value={mbwayPhone}
              onChange={(e) => setMbwayPhone(e.target.value)}
              className="mb-2 p-2 rounded"
              required
            />
          ) : (
            <CardElement className="p-2 bg-white rounded" />
          )}

          <div className="flex gap-4 ml-auto">
            <button
              onClick={prevStep}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Retroceder
            </button>
            <button
              onClick={handleCheckout}
              className={`bg-green-500 text-white px-4 py-2 rounded mt-4 ${
                isPendingOrder ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
