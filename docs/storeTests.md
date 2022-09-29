# Pinia Store Unit Tests

The test file is usually called the same name as the dev file, so in this case it would be `./store/todo.test.ts`

```sh
touch `./store/todo.test.ts`
code `./store/todo.test.ts`
```

## Vitest as test suite

For Vitest we need to create a file called `vite.config.ts`

```sh
touch ./vite.config.ts
code ./vite.config.ts
```

Add the following to `./vite.config.ts`

```sh
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        include: ['./store/*.test.ts'],
    }
});
```

Add the following to `package.json` under the `scripts` section

```sh
    "test": "vitest run --coverage",
```