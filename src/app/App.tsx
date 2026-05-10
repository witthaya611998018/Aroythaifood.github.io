import { useEffect } from "react";

import { fetchProfileThunk } from "@/features/auth/model/authSlice";

import { useAppDispatch, useAppSelector } from "./hooks";
import AppRouter from "./router";

const App = () => {
  const dispatch = useAppDispatch();
  const { token, user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user && !loading) {
      void dispatch(fetchProfileThunk({ token, silent: true }));
    }
  }, [dispatch, token, user, loading]);

  return <AppRouter />;
};

export default App;
