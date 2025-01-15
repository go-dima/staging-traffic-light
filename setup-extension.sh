#!/bin/bash

# Create main directory structure
mkdir -p src/{background,popup/{components,hooks,types},services,utils}
mkdir -p public/icons
mkdir -p tests/{background,popup,services}

# Create source files
touch src/background/{background.ts,jiraService.ts,iconManager.ts}
touch src/popup/components/{App.tsx,StatusDisplay.tsx,ErrorMessage.tsx}
touch src/popup/hooks/useJiraStatus.ts
touch src/popup/types/index.ts
touch src/popup/popup.tsx
touch src/services/{api.ts,storage.ts}
touch src/utils/constants.ts

# Create test files
touch tests/background/jiraService.test.ts
touch tests/popup/StatusDisplay.test.tsx
touch tests/services/api.test.ts

# Create and populate manifest.json
cat > public/manifest.json << EOL
{
  "manifest_version": 3,
  "name": "Staging Traffic Light",
  "version": "1.0.0",
  "description": "Monitor staging environment status",
  "permissions": [
    "storage",
    "activeTab"
  ],
  "action": {
    "default_popup": "index.html",
    "default_icon": {
      "38": "icons/icon-grey-38.png"
    }
  },
  "background": {
    "service_worker": "src/background/background.ts",
    "type": "module"
  },
  "icons": {
    "38": "icons/icon-grey-38.png"
  }
}
EOL

# Create and populate package.json
cat > package.json << EOL
{
  "name": "staging-traffic-light",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/chrome": "^0.0.246",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@vitest/coverage-v8": "^0.34.0",
    "@vitest/ui": "^0.34.0",
    "typescript": "^5.0.2",
    "vite": "^4.4.9",
    "vitest": "^0.34.0"
  }
}
EOL

# Create and populate tsconfig.json
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["chrome", "vitest"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOL

# Create and populate tsconfig.node.json
cat > tsconfig.node.json << EOL
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOL

# Create and populate vite.config.ts
cat > vite.config.ts << EOL
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'src/background/background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
    outDir: 'dist',
    sourcemap: true,
  },
});
EOL

# Create and populate vitest.config.ts
cat > vitest.config.ts << EOL
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
EOL

# Create and populate index.html
cat > index.html << EOL
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Staging Traffic Light</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/popup/popup.tsx"></script>
  </body>
</html>
EOL

# Create .env file with placeholder
cat > .env << EOL
VITE_API_URL=https://your-staging-api.com
EOL

# Add .gitignore
cat > .gitignore << EOL
# Dependencies
node_modules/

# Production
dist/
build/

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Testing
coverage/
EOL

# Make the script executable
chmod +x setup-extension.sh

echo "Project structure created successfully!"
echo "Run 'npm install' to install dependencies"