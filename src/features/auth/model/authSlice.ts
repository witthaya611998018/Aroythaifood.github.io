import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiRequest } from "@/shared/api/api";

type AuthUser = {
  user_id: number;
  username: string;
  role: string;
};

type LoginPayload = {
  username: string;
  password: string;
};

type AuthResponse = {
  token: string;
  result: AuthUser;
};

type ProfileResponse = {
  result: AuthUser;
};

type PersistedAuth = {
  token: string;
};

type FetchProfilePayload = {
  token: string;
  silent?: boolean;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
};

const AUTH_STORAGE_KEY = "aroythai_auth";

const loadPersistedAuth = (): PersistedAuth | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "token" in parsed &&
      typeof (parsed as { token?: unknown }).token === "string"
    ) {
      return { token: (parsed as { token: string }).token };
    }

    return null;
  } catch {
    return null;
  }
};

const persistAuthToken = (token: string) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token }));
};

const clearPersistedAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

const persisted = loadPersistedAuth();

const initialState: AuthState = {
  token: persisted?.token ?? null,
  user: null,
  loading: false,
  initialized: false,
  error: null,
};

export const loginThunk = createAsyncThunk<
  { token: string; user: AuthUser },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const loginResult = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const profileResult = await apiRequest<ProfileResponse>("/auth/profile", {
      token: loginResult.token,
    });

    return {
      token: loginResult.token,
      user: profileResult.result,
    };
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Login failed",
    );
  }
});

export const fetchProfileThunk = createAsyncThunk<
  AuthUser,
  FetchProfilePayload,
  { rejectValue: string }
>("auth/fetchProfile", async ({ token }, { rejectWithValue }) => {
  try {
    const profileResult = await apiRequest<ProfileResponse>("/auth/profile", {
      token,
    });
    return profileResult.result;
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to load profile",
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearPersistedAuth();
      state.token = null;
      state.user = null;
      state.error = null;
      state.loading = false;
      state.initialized = true;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        persistAuthToken(action.payload.token);
        state.loading = false;
        state.initialized = true;
        state.error = null;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload ?? "Login failed";
      })
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        clearPersistedAuth();
        state.loading = false;
        state.initialized = true;
        state.token = null;
        state.user = null;
        state.error = action.meta.arg.silent
          ? null
          : (action.payload ?? "Session expired. Please login again.");
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export type { AuthState, AuthUser, LoginPayload };
export default authSlice.reducer;
