export const API_CONFIG = {
  baseURl: 'https://tee-cholesterol-chef-walking.trycloudflare.com/api',

  endpoints: {
    auth: {
      register: '/auth/register',
      login: '/auth/login',
      update: '/auth/update',
      delete: '/auth/delete-account',
      refreshToken: '/auth/refresh',
    },

    subscriptions: {
      getAll: '/subscriptions',
      getById: (id: number) => `/subscriptions/${id}`,
      create: '/subscriptions',
      update: (id: number) => `/subscriptions/${id}`,
      delete: (id: number) => `/subscriptions/${id}`,
    },

    dashboard: {
      summary: '/dashboard/summary',
      upcomingPayments: '/dashboard/upcoming-payments',
      spendingOverview: '/dashboard/spending-overview',
    },
  },
};
