# Create Nuxt 3 App

## Create new app with `nuxi`

```sh
npx nuxi init pj.nuxt.devserv.me
cd pj.nuxt.devserv.me
yarn install
```

## Start a development server

```sh
yarn dev  
```

## Adding some dependencies

```sh
# Tailwind CSS as a Development Dependency
yarn add -D @nuxtjs/tailwindcss

# Generate tailwind.config.js
npx tailwindcss init

# Pinia as a development and regular dependency for state management
yarn add -D @pinia/nuxt
yarn add pinia

# Add Vitest as development dependency for unit testing
yarn add -D vitest

# Add C8 as development dependency for code coverage
yarn add -D c8

# Add uuid as regular dependency
yarn add uuid
```