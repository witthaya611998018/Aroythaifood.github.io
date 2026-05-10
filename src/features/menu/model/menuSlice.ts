import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createMenuItem,
  deleteMenuItem,
  fetchMenuSections,
  updateMenuItem,
} from "@/features/menu/api/menuService";
import type {
  MenuFormValues,
  MenuSection,
} from "@/features/menu/model/menuTypes";

type MenuState = {
  sections: MenuSection[];
  loading: boolean;
  error: string | null;
  createStatus: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: MenuState = {
  sections: [],
  loading: false,
  error: null,
  createStatus: "idle",
};

export const fetchMenusThunk = createAsyncThunk<
  MenuSection[],
  void,
  { rejectValue: string }
>("menus/fetchMenus", async (_, { rejectWithValue }) => {
  try {
    return await fetchMenuSections();
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to load menu data",
    );
  }
});

export const updateMenuThunk = createAsyncThunk<
  void,
  { id: number; values: MenuFormValues; token: string },
  { rejectValue: string }
>("menus/updateMenu", async ({ id, values, token }, { rejectWithValue }) => {
  try {
    await updateMenuItem(id, values, token);
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to update menu",
    );
  }
});

export const createMenuThunk = createAsyncThunk<
  void,
  { values: MenuFormValues; token: string },
  { rejectValue: string }
>("menus/createMenu", async ({ values, token }, { rejectWithValue }) => {
  try {
    await createMenuItem(values, token);
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to create menu",
    );
  }
});

export const deleteMenuThunk = createAsyncThunk<void, { id: number; token: string },
  { rejectValue: string }
>("menus/deleteMenu", async ({ id, token }, { rejectWithValue }) => {
  try {
    await deleteMenuItem(id, token);
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to delete menu",
    );
  }
});

const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    resetMenus: (state) => {
      state.sections = [];
      state.loading = false;
      state.error = null;
      state.createStatus = "idle";
    },
    resetCreateMenuStatus: (state) => {
      state.createStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchMenusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load menu data";
      })
      .addCase(updateMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenuThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMenuThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update menu";
      })
      .addCase(createMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createStatus = "pending";
      })
      .addCase(createMenuThunk.fulfilled, (state) => {
        state.loading = false;
        state.createStatus = "succeeded";
      })
      .addCase(createMenuThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create menu";
        state.createStatus = "failed";
      })
      .addCase(deleteMenuThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenuThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMenuThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete menu";
      });
  },
});

export const { resetMenus, resetCreateMenuStatus } = menuSlice.actions;
export type { MenuState };
export default menuSlice.reducer;
