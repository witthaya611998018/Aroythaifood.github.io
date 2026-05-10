# AGENTS.md

This repo is a React 19 + TypeScript + Vite frontend for AROYTHAI public pages and admin pages.

## Start Here

- Project root commands:
  - `npm run dev`
  - `npm run build`
  - `npm run lint`
  - `npm run test`
- Default verification for UI/code changes: `npm run build`
- Import from `src` with `@/`

## Repo Map

- `src/app` : router, store, typed hooks
- `src/features` : Redux slices, feature services, feature UI
- `src/pages` : route-level pages
- `src/shared` : layouts, protected routing, API helpers

## Rules For Changes

- Prefer fixing the real feature flow, not patching symptoms
- Use `useAppDispatch()` and `useAppSelector()`
- Keep async server logic in Redux thunks and feature services
- Reuse `src/shared/api/api.ts` instead of adding new fetch helpers
- Preserve existing public/admin route split and layout usage

## Important Existing Flows

### Menu admin

- Core files:
  - `src/features/menu/ui/AdminMenus.tsx`
  - `src/features/menu/ui/AdminMenuEditModal.tsx`
  - `src/features/menu/model/menuSlice.ts`
  - `src/features/menu/api/menuService.ts`
- Create/edit mode is explicit
- Upload requests use `FormData`
- File field name is `image`
- Refresh menu lists through the existing Redux flow when mutations succeed

### Auth

- Core file: `src/features/auth/model/authSlice.ts`
- Token persistence is already handled in the slice
- Extend existing auth bootstrap/profile logic rather than duplicating it

## Routing

- Public pages render inside `AppLayout`
- Admin pages render inside `AdminLayout`
- Protected admin routes are gated by `src/shared/routes/ProtectedRoute.tsx`

## Expectations

- Read the route component, slice, and service together before editing
- Preserve current contracts unless the task explicitly asks for a redesign
- Preserve current route paths and selected-item/modal flows unless the task requires changing them
- Keep mixed Thai/English copy unless asked to rewrite
- Keep changes narrow when the request is narrow
