# Frontend Architecture (Feature-based with shared layer)

This project uses a **feature-based architecture** with a dedicated infrastructure layer called `shared`.
This approach is production-proven, suitable for MVPs, and scales well without architectural rewrites.

---

## Architecture Goals

- Clear contracts between layers
- High code readability
- Minimal abstractions
- Easy team onboarding
- Controlled dependencies

---

## Overall Structure

```txt
src/
├─ app/
├─ features/
├─ components/
├─ shared/
│  ├─ lib/
│  ├─ api/
│  ├─ utils/
│  ├─ hooks/
│  ├─ store/
│  ├─ config/
│  ├─ constants/
│  └─ types/
└─ assets/
```

---

## app/ — routing & composition layer

Next.js entry layer.

Contains:

- layout.tsx
- page.tsx
- providers
- routing

Rules:

- ❌ no business logic
- ❌ no API calls
- ✅ feature composition only

---

## features/ — business modules

Each feature is a **self-contained business unit**.

```txt
features/auth/
├─ api.ts
├─ hooks/
│  └─ use-login.ts
├─ components/
│  └─ login-form.tsx
├─ types.ts
└─ index.ts
```

Rules:

- a feature must not import other features
- a feature may import only from `shared`
- all business logic lives here

---

## components/ — reusable UI components

```txt
components/
├─ ui/
│  ├─ button.tsx
│  ├─ input.tsx
│  └─ modal.tsx
├─ layout/
│  └─ header.tsx
├─ providers/
│  └─ store-provider.tsx
```

Rules:

- ❌ no business meaning
- ❌ no API access
- ✅ props-driven only

---

## shared/ — infrastructure layer

`shared` is the **technical foundation of the project**.
There is **no business logic here**.

---

### shared/api/ — HTTP infrastructure

```txt
shared/api/
├─ client.ts
├─ interceptors.ts
├─ errors.ts
└─ index.ts
```

Contains:

- axios / fetch client
- interceptors
- error handling

❌ no feature-specific endpoints like `/auth/login`

---

### shared/lib/ — technical services

```txt
shared/lib/
├─ logger.ts
├─ analytics.ts
├─ storage.ts
├─ feature-flags.ts
└─ index.ts
```

✔ may contain side-effects  
❌ must not depend on features

---

### shared/utils/ — pure functions

```txt
shared/utils/
├─ cn.ts
├─ debounce.ts
├─ format-date.ts
└─ index.ts
```

✔ no React  
✔ no state  
✔ no side-effects

---

### shared/hooks/ — generic hooks

```txt
shared/hooks/
├─ use-media-query.ts
├─ use-is-mounted.ts
└─ use-scroll-lock.ts
```

❌ `useLogin`  
❌ `useUser`

---

### shared/store/ — global UI state

```txt
shared/store/
├─ ui.store.ts
├─ theme.store.ts
└─ index.ts
```

✔ theme  
✔ modal  
✔ layout

❌ business state

---

### shared/config/ — configuration

```txt
shared/config/
├─ env.ts
├─ routes.ts
├─ query-keys.ts
└─ index.ts
```

---

### shared/types/ — shared types

```txt
shared/types/
├─ api.ts
├─ common.ts
└─ index.ts
```

---

## Import Rules (critical)

```
app → features → shared
components → shared

features ❌→ features
shared ❌→ features
```

---

## Usage Example

```tsx
// app/login/page.tsx
import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return <LoginForm />;
}
```

```ts
// features/auth/api.ts
import { apiClient } from '@/shared/api';

export function login(payload: LoginPayload) {
  return apiClient.post('/auth/login', payload);
}
```

---

## What This Architecture Avoids

- FSD terminology
- entities / widgets / processes layers
- atomic design (atoms / molecules)
- unnecessary global state

---

## Summary

- `features` — business logic
- `shared` — infrastructure
- `components` — UI
- `app` — composition
