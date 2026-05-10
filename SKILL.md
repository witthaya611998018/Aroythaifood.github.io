---
name: aroythai-frontend
description: Work on the AROYTHAI React frontend and admin dashboard. Use when Codex needs to modify routes, layouts, Redux Toolkit flows, menu management, auth behavior, API integration, or Tailwind UI in this repository. Especially relevant for tasks involving `src/app`, `src/features/menu`, `src/features/auth`, `src/pages/admin`, `src/pages/public`, or shared API/layout code.
---

# AROYTHAI Frontend Skill

Read `AGENTS.md` first for the repo-level rules and conventions.

## Quick Start

Work from the project root:

```bash
npm run dev
npm run build
npm run lint
npm run test
```

Use `npm run build` as the default verification step after frontend changes.

## Repo Shape

- `src/app` contains bootstrap, router, store, and typed hooks
- `src/features` contains Redux slices, feature services, and feature UI
- `src/pages` contains route-level pages
- `src/shared` contains layouts, protected routing, and shared API utilities

Import from `src` with `@/`.

## Preferred Workflow

1. Read the route or feature named by the user.
2. Read the related page, slice, and service together before editing.
3. Extend existing flows instead of creating parallel ones.
4. Keep edits narrow when the request is narrow.
5. Verify with `npm run build`.

## Shared Project Contracts

- Use `useAppDispatch()` and `useAppSelector()` from `src/app/hooks.ts`
- Keep async server logic in Redux thunks and feature service files
- Reuse `src/shared/api/api.ts` via `apiRequest()` and `buildApiUrl()`
- Preserve the public/admin route split and current layout structure

## Menu Admin Rules

Use these files first:

- `src/features/menu/ui/AdminMenus.tsx`
- `src/features/menu/ui/AdminMenuEditModal.tsx`
- `src/features/menu/model/menuSlice.ts`
- `src/features/menu/api/menuService.ts`

Keep these contracts intact unless the task explicitly changes them:

- Create and edit are explicit modal modes
- Menu uploads use `FormData`
- Upload field name is `image`
- Menu list refresh should flow through Redux state, not isolated local hacks

## Auth Rules

Use `src/features/auth/model/authSlice.ts` as the source of truth for auth state.

- Preserve token persistence behavior
- Extend existing login/profile bootstrap flow instead of duplicating auth state elsewhere

## Routing Rules

- Public pages render inside `AppLayout`
- Admin pages render inside `AdminLayout`
- Protected admin routes are gated by `src/shared/routes/ProtectedRoute.tsx`

## UI Expectations

- Reuse existing admin patterns before inventing a new structure
- Preserve selected-item and modal-open flows unless the task requires changing them
- Keep mixed Thai/English UI copy unless the task explicitly asks for a rewrite
