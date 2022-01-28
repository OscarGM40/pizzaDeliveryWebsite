/**configureStore(): wraps createStore to provide simplified configuration options and good defaults.
 *  It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension. */

/* fijate que configureStore me da acceso a redux-thunk,me activa las Redux DevTools y combina los slice reducers */
import { configureStore } from "@reduxjs/toolkit";

// importo el reducer de cartSlice,fijate que lo puedo llamar como quiera
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
