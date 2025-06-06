const routes = {
  orders: "/orders",
  user: "/user",
  orderDetails: (id: string) => `orders/${id}`,
};

export default routes;
