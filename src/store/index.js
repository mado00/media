import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';

// communicate React and Redux
export const store = configureStore({
  reducer: {
    users: usersReducer,
    // [] is not Array....
    // go to albumsApi and find reducerPath name(string) and use it
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

// Temporary
// window.store = store;

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';

export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi';

export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from './apis/photosApi';
