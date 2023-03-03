import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

  // reducerPath - Api needs to store a ton of state related to data,request status, errors.
  // baseQuery - Api needs to know how and where to send requests
  // fetchBaseQuery - Function to make a pre-configured version of 'fetch'
  // endpoints - Reqs that read data are queries, 
  // write data are mutations
const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    // use Redux Toolkit query built in fetch function to make request to browser
    fetchFn: async (...args) => {
      //  REMOVE FOR THE PRODUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id }];
        },
        query: (album) => {
          return {
            method: 'DELETE',
            url: `albums/${album.id}`,
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      // albumsApi.useFetchAlbumsQuery() to use in the components
      // When called in a component, will immefiately start fetching data
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          console.log(result)
          const tags = result.map((album) => {
            return { type: 'Album', id: album.id };
            });
            tags.push({ type: 'UsersAlbums', id: user.id });
            return tags;
        },
        // in the component useFetchAlbumsQuery(user) called
        // argument(user) to pass to the query function in here
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation
} = albumsApi;

export { albumsApi };
