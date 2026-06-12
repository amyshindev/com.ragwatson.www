---
tags:
  - harness/claude-frontend
graph-group: claude-frontend
---

# Frontend — CLAUDE.md

Next.js / React scope for `frontend/`. Inherits the repository blueprint from [`../CLAUDE.md`](../CLAUDE.md).

> **Precedence:** [`../CLAUDE.md`](../CLAUDE.md) on agent behavior and simplicity · [`docs/DevOps/Frontend/REACT_RULES.md`](../docs/DevOps/Frontend/REACT_RULES.md) on React patterns · this file on **frontend layout and API integration**.

---

## 1. Before You Code

1. Read [`../CLAUDE.md`](../CLAUDE.md) (blueprint + agent behavior).
2. Read [`docs/DevOps/Frontend/REACT_RULES.md`](../docs/DevOps/Frontend/REACT_RULES.md) — **mandatory** for UI work.
3. If the page belongs to a backend domain (e.g. Titanic), also read that app's [`backend/apps/titanic/_docs/CLAUDE.md`](../backend/apps/titanic/_docs/CLAUDE.md) for API paths and payloads.

---

## 2. Stack & Layout

| Item | Rule |
|------|------|
| Framework | Next.js (App Router), React, TypeScript |
| UI | `components/ui/` (shadcn-style), `components/` for app chrome |
| Routes | `app/**/page.tsx` |
| Shared utils | `lib/` |
| Styles | `app/globals.css`, `styles/globals.css` |
| Package manager | `pnpm` (see `pnpm-lock.yaml`) |

```text
frontend/
  app/              ← routes (e.g. app/titanic/, app/signup/)
  components/       ← UI + site chrome (header, etc.)
  lib/              ← API clients, helpers
  hooks/
```

---

## 3. React Rules (summary)

---> **Full rules were consolidated in DevOps; do not duplicate here.**

Mandatory patterns from [`REACT_RULES.md`](../docs/DevOps/Frontend/REACT_RULES.md):

- Prefer **one object state** over many `useState` fields for related UI.
- Forms: `FormData` + `Object.fromEntries`; capture `e.currentTarget` before `await`.
- No `alert()` — inline banners / `role="status"`.
- API errors surfaced in UI state, not swallowed.

---

## 4. Backend Integration

| Item | Rule |
|------|------|
| API base | Backend at `http://127.0.0.1:8000` (local) |
| Titanic routes | `/titanic/*` (no `/api` prefix on titanic router) |
| Client modules | `lib/*-api.ts` per domain when the pattern exists |
| Types | Mirror backend Pydantic shapes in TypeScript interfaces |

Example Titanic endpoints (see titanic doc for full list):

- `GET /titanic/smith/myself` — captain intro
- `POST /titanic/smith/chat` — body `{ "message": "..." }`, response `{ "reply": "..." }`

---

## 5. Domain Pages (sibling to backend apps)

Frontend routes should mirror backend domain siblings where product scope aligns:

| Backend app | Typical frontend path |
|-------------|------------------------|
| `titanic` | `app/titanic/` |
| `user` | `app/signup/`, login flows |
| *(future)* | `app/{domain}/` |

Keep page-specific API calls in `lib/` helpers; keep pages thin.

---

## 6. Checklist

- [ ] `REACT_RULES.md` patterns followed (state, forms, errors).
- [ ] No unnecessary `useState` proliferation.
- [ ] API paths match backend router prefixes.
- [ ] Domain `.docs/CLAUDE.md` checked when touching that product area.

## References

- Root blueprint: [`../CLAUDE.md`](../CLAUDE.md)
- React implementation: [`docs/DevOps/Frontend/REACT_RULES.md`](../docs/DevOps/Frontend/REACT_RULES.md)
- DevOps index: [`docs/DevOps/README.md`](../docs/DevOps/README.md)
- Titanic API & personas: [`../backend/apps/titanic/_docs/CLAUDE.md`](../backend/apps/titanic/_docs/CLAUDE.md)
