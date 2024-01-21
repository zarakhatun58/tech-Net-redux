import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    singleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['commentsTag'],
    }),
    getComment: builder.query({
      query: (id) => `comment/${id}`,
      providesTags: ['commentsTag'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetProductsQuery,
  useSingleProductQuery,
  usePostCommentMutation,
} = productApi;
