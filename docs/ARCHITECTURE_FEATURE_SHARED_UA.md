# Архітектура Frontend-додатку (Feature-based + shared)

Цей проєкт використовує **feature-based архітектуру** з окремим інфраструктурним шаром `shared`.
Підхід перевірений у продакшені, підходить для MVP та легко масштабується без переписування.

---

## Цілі архітектури

- Чіткі контракти між шарами
- Висока читабельність коду
- Мінімум магії та абстракцій
- Просте масштабування команди
- Контроль залежностей

---

## Загальна структура

````txt
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
``

---

## app/ — композиція та роутинг

Рівень Next.js.

Містить:
- layout.tsx
- page.tsx
- providers
- routing

Правила:
- ❌ без бізнес-логіки
- ❌ без API-запитів
- ✅ тільки композиція фіч

---

## features/ — бізнес-модулі

Кожна фіча — **самодостатній модуль**, який володіє своїм бізнесом.

```txt
features/auth/
├─ api.ts
├─ hooks/
│  └─ use-login.ts
├─ components/
│  └─ login-form.tsx
├─ types.ts
└─ index.ts
````

### rules

- фіча не імпортує інші фічі
- фіча може імпортувати тільки `shared`
- бізнес-логіка живе тільки тут

---

## components/ — перевикористовуваний UI

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

Правила:

- ❌ без бізнес-сенсу
- ❌ без API
- ✅ тільки props

---

## shared/ — інфраструктурний шар

`shared` — це **технічна основа проєкту**.
Тут **немає бізнесу**.

---

### shared/api/ — HTTP інфраструктура

```txt
shared/api/
├─ client.ts
├─ interceptors.ts
├─ errors.ts
└─ index.ts
```

Містить:

- axios / fetch клієнт
- interceptors
- обробку помилок

❌ ніяких `/auth/login`

---

### shared/lib/ — технічні сервіси

```txt
shared/lib/
├─ logger.ts
├─ analytics.ts
├─ storage.ts
├─ feature-flags.ts
└─ index.ts
```

✔ може мати side-effects  
❌ не знає про фічі

---

### shared/utils/ — чисті функції

```txt
shared/utils/
├─ cn.ts
├─ debounce.ts
├─ format-date.ts
└─ index.ts
```

✔ без React  
✔ без state  
✔ без side-effects

---

### shared/hooks/ — універсальні хуки

```txt
shared/hooks/
├─ use-media-query.ts
├─ use-is-mounted.ts
└─ use-scroll-lock.ts
```

❌ `useLogin`  
❌ `useUser`

---

### shared/store/ — глобальний UI state

```txt
shared/store/
├─ ui.store.ts
├─ theme.store.ts
└─ index.ts
```

✔ theme  
✔ modal  
✔ layout

❌ бізнес-стан

---

### shared/config/ — конфіги

```txt
shared/config/
├─ env.ts
├─ routes.ts
├─ query-keys.ts
└─ index.ts
```

---

### shared/types/ — спільні типи

```txt
shared/types/
├─ api.ts
├─ common.ts
└─ index.ts
```

---

## Import rules (критично важливо)

```
app → features → shared
components → shared

features ❌→ features
shared ❌→ features
```

---

## Приклад використання

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

## Що ця архітектура уникає

- FSD-термінології
- entities / widgets / processes
- атомів / молекул
- глобального state без потреби

---

## Підсумок

- `features` — бізнес
- `shared` — інфраструктура
- `components` — UI
- `app` — композиція
