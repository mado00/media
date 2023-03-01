import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


  // reducerPath - Api needs to store a ton of state related to data,request status, errors.
  // baseQuery - Api needs to know how and where to send requests
  // fetchBaseQuery - Function to make a pre-configured version of 'fetch'
  // endpoints - Reqs that read data are queries, 
  // write data are mutations
export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
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

export const { useFetchAlbumsQuery } = albumsApi;
// export { albumsApi };
// use hook
// albumsApi.useFetchAlbumsQuery()