import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// creating the Api

export const AppApi = createApi({
    reducerPath:'AppApi',
    baseQuery:fetchBaseQuery({baseUrl: 'https://ecmmerce-backend-vu1h.onrender.com'}),
    endpoints:(builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url:'/users/register',
                method:'POST',
                body:user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url:'/users/login',
                method:'POST',
                body:user,
            }),
        }),
        // creating product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            }),
        }),

        // delete product
        deleteProduct: builder.mutation({
            query: ({product_id,user_id}) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id
                },
                method: "DELETE",
            }),
        }),

        // update product
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body:product,
                method: "PATCH",
            }),
        }),
        // add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),
        // remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),
        // increase cart product
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),
         // decrease cart product
         decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),
        // create Order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                body,
                method: "POST",
            }),
        }),
    }),
});

export const {useRegisterMutation, useLoginMutation, 
              useCreateProductMutation, useAddToCartMutation, 
              useRemoveFromCartMutation, useIncreaseCartProductMutation, 
              useDecreaseCartProductMutation, useCreateOrderMutation,
              useDeleteProductMutation, useUpdateProductMutation
              } = AppApi

export default AppApi