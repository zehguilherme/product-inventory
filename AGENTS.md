# AGENTS.md - Product Inventory

## Project Overview

Product inventory management application with full CRUD operations (create, read, update, delete). Currently using React 19 + TypeScript with Vite 7 as build tool, json-server as mock backend, and Tailwind CSS 4 for styling.

---

## Commands

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start development server (Vite)            |
| `npm run build`   | TypeScript compile + Vite production build |
| `npm run lint`    | Run ESLint on entire codebase              |
| `npm run preview` | Preview production build locally           |

**Note:** Test framework not yet installed. When adding tests, use Vitest (recommended for Vite projects).

---

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── DeleteModal.tsx
│   ├── ErrorModal.tsx
│   ├── Header.tsx
│   ├── Loading.tsx
│   ├── Table.tsx
│   ├── Form/           # Form-specific components
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   └── icons/           # Icon components
│       ├── Arrow.tsx
│       ├── Box.tsx
│       ├── Circle.tsx
│       ├── Magnifier.tsx
│       ├── Pencil.tsx
│       ├── Plus.tsx
│       ├── Spinner.tsx
│       └── Trash.tsx
├── pages/               # Page-level components
│   ├── Home.tsx
│   ├── Product.tsx
│   └── NotFound.tsx
├── App.tsx              # Main app component + context
├── main.tsx             # Entry point
└── index.css            # Tailwind CSS + design tokens
```

---

## Import Order

Follow this strict order (top to bottom):

1. **React imports** - `import { useState } from 'react'`
2. **External libraries** - `import { useNavigate } from 'react-router'`, `import axios from 'axios'`
3. **UI libraries** - `import { toast } from 'react-toastify'`, `import { z } from 'zod'`
4. **Local components** - `import { Button } from '../components/Button'`

```typescript
// CORRECT
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { LoadingContext } from '../App'
```

---

## TypeScript Guidelines

- **Strict mode enabled** in `tsconfig.json`
- Use `import type` for type-only imports
- Avoid `any` - always type explicitly
- Use interfaces for component props with `Props` suffix

```typescript
// CORRECT
import type { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  variant?: 'primary' | 'danger' | 'ghost'
}

// AVOID
interface Props {
  children: any // ❌
}
```

---

## Naming Conventions

| Type              | Convention                  | Example                       |
| ----------------- | --------------------------- | ----------------------------- |
| Components        | PascalCase                  | `Button.tsx`, `Header.tsx`    |
| Component exports | Named exports               | `export const Button`         |
| Props interfaces  | PascalCase + `Props` suffix | `ButtonProps`, `InputProps`   |
| Functions         | camelCase                   | `handleSubmit`, `getProducts` |
| Variables         | camelCase                   | `tableRows`, `isLoading`      |
| Types/Interfaces  | PascalCase                  | `TableRow`, `Product`         |
| Constants         | PascalCase                  | `variantClasses`              |

---

## Tailwind CSS Design Tokens

The following custom colors are available in `src/index.css`:

| Token                        | Hex         | Usage               |
| ---------------------------- | ----------- | ------------------- |
| `--color-athens-gray`        | `#f9fafb`   | Background          |
| `--color-royal-blue`         | `#2463eb`   | Primary buttons     |
| `--color-royal-blue-90`      | `#2463eb90` | Primary (disabled)  |
| `--color-flamingo`           | `#ef4343`   | Danger buttons      |
| `--color-flamingo-90`        | `#ef434390` | Danger (disabled)   |
| `--color-ebony`              | `#0f1729`   | Headings            |
| `--color-slate-gray`         | `#65758b`   | Secondary text      |
| `--color-catskill-white`     | `#f9fafb`   | Button text         |
| `--color-catskill-white2`    | `#f1f5f9`   | Light background    |
| `--color-catskill-white-50`  | `#f1f5f950` | Light bg (disabled) |
| `--color-mystic`             | `#e1e7ef`   | Borders             |
| `--color-salem`              | `#16a249`   | Success states      |
| `--color-buttercup`          | `#fe7b02`   | Warning states      |
| `--color-cinderella`         | `#e4fbed`   | Success background  |
| `--color-light-red`          | `#fde3e3`   | Danger background   |
| `--color-light-yellow`       | `#fef3e2`   | Warning background  |
| `--color-cod-gray`           | `#1b1b1b`   | Dark text           |
| `--color-cotton-seed`        | `#c5c1b9`   | Placeholder text    |
| `--color-westar`             | `#dcdad5`   | Disabled border     |
| `--color-spring-wood`        | `#f9fafb`   | Page/section bg     |
| `--color-white`              | `#ffffff`   | Cards, overlays     |
| `--color-white-80`           | `#ffffff80` | White (translucent) |
| `--color--half-spanish-white`| `#e4fbed94` | Success bg (faded)  |

**Font:** `--font-display: 'Inter', sans-serif`

```tsx
// Usage examples
<div className="bg-royal-blue text-catskill-white" />
<div className="text-ebony text-3xl/[36px] font-bold" />
<div className="border-1 border-mystic" />
```

---

## Component Patterns

### Props with defaults

```typescript
interface ButtonProps {
  variant?: 'primary' | 'danger' | 'ghost'  // default: 'primary'
  disabled?: boolean
  loading?: boolean
}

export const Button = ({
  variant = 'primary',
  loading,
  ...props
}: ButtonProps) => { ... }
```

### Extending HTML attributes

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
}
```

### Using context (global state)

```typescript
const [, setLoading, , setLoadingText] = useContext(LoadingContext)
```

---

## Error Handling

Use **react-toastify** for user feedback:

```typescript
import { toast } from 'react-toastify'

// Success
toast('Produto removido com sucesso!', { type: 'success' })

// Error in catch block
try {
  await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
} catch (error: unknown) {
  if (error instanceof Error) {
    setErrorMessage(error.message)
  }
}
```

For critical errors, use the `ErrorModal` component pattern.

---

## API Pattern (Current + Future)

Current implementation uses **axios** with environment variable:

```typescript
// Environment variable
// Create .env with: VITE_API_URL=http://localhost:3000

const API_URL = import.meta.env.VITE_API_URL

// GET
const response = await axios.get(`${API_URL}/products`)

// POST
await axios.post(`${API_URL}/products`, data)

// PUT
await axios.put(`${API_URL}/products/${id}`, data)

// DELETE
await axios.delete(`${API_URL}/products/${id}`)
```

**Future backend migration:** When migrating to Node.js + SQL database, keep the same API pattern but update the base URL. Consider creating a service layer (`src/services/api.ts`) for cleaner abstraction.

---

## Forms (react-hook-form + zod + remask)

Use the pattern from `Product.tsx` for form validation:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  price: z.coerce.number().min(0, 'Preço deve ser positivo'),
  quantity: z.coerce.number().int().min(0, 'Quantidade inválida'),
  minQuantity: z.coerce.number().int().min(0, 'Quantidade mínima inválida'),
})

type ProductFormData = z.infer<typeof productSchema>

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<ProductFormData>({
  resolver: zodResolver(productSchema),
})
```

---

## ESLint & Prettier

The project uses:

- **ESLint** with TypeScript, React Hooks, and React Refresh plugins
- **Prettier** with Tailwind CSS plugin (in devDependencies)

Run `npm run lint` to check. Prettier formatting is integrated via editor.

---

## Key Dependencies

| Package               | Purpose                     |
| --------------------- | --------------------------- |
| `react` ^19.2.7       | UI library                  |
| `react-dom` ^19.2.6   | DOM rendering               |
| `typescript` ~6.0.3   | Type safety (strict mode)   |
| `vite` ^7.3.2         | Build tool                  |
| `tailwindcss` ^4.3.0  | Styling                     |
| `@tailwindcss/vite` ^4.3.0 | Vite plugin for Tailwind 4 |
| `axios` ^1.17.0       | HTTP client                 |
| `react-router` ^7.17.0 | Routing                    |
| `react-hook-form` ^7.78.0 | Form handling           |
| `@hookform/resolvers` ^5.4.0 | Zod integration      |
| `zod` ^4.4.3          | Schema validation           |
| `react-toastify` ^11.1.0 | Notifications            |
| `remask` ^1.2.2       | Input masks (money, CPF)    |
| `eslint` ^10.4.1      | Linting                     |
| `prettier` ^3.8.4     | Code formatter              |
| `prettier-plugin-tailwindcss` ^0.8.0 | Tailwind class sorting |

---

## Environment Variables

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:3000
```

This points to json-server for development.
