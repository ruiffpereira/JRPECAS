const routes = {
  orders: '/orders',
  user: '/user',
  orderDetails: (id: string) => `orders/${id}`,
  termsandconditions: '/terms-and-conditions',
  privacy: '/privacy',
  cookies: '/cookies',
  ral: '/ral',
  checkout: '/cart/checkout',
  login: '/login',
  home: '/',
}

export default routes
