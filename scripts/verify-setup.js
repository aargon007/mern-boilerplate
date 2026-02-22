#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const checks = [
  {
    name: 'Root .env file exists',
    file: '.env',
    required: true,
  },
  {
    name: 'ESLint root config exists',
    file: '.eslintrc.json',
    required: true,
  },
  {
    name: 'Prettier root config exists',
    file: '.prettierrc',
    required: true,
  },
  {
    name: 'Frontend tsconfig.json exists',
    file: 'apps/frontend/tsconfig.json',
    required: true,
  },
  {
    name: 'Frontend tsconfig.app.json exists',
    file: 'apps/frontend/tsconfig.app.json',
    required: true,
  },
  {
    name: 'Frontend tsconfig.node.json exists',
    file: 'apps/frontend/tsconfig.node.json',
    required: true,
  },
  {
    name: 'Server tsconfig.json exists',
    file: 'apps/server/tsconfig.json',
    required: true,
  },
  {
    name: 'turbo.json configuration exists',
    file: 'turbo.json',
    required: true,
  },
  {
    name: 'Root package.json exists',
    file: 'package.json',
    required: true,
  },
];

let passed = 0;
let failed = 0;

console.log('\n🔍 Turbo Repo Setup Verification\n');
console.log('═'.repeat(50));

checks.forEach((check) => {
  const filePath = path.join(rootDir, check.file);
  const exists = fs.existsSync(filePath);

  if (exists) {
    console.log(`✅ ${check.name}`);
    passed++;
  } else {
    console.log(`❌ ${check.name}`);
    if (check.required) {
      console.log(`   └─ REQUIRED: ${check.file}`);
      failed++;
    }
  }
});

console.log('═'.repeat(50));

// Check environment variables in .env
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const requiredVars = [
    'VITE_PORT',
    'PORT',
    'DB_URI',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
  ];

  console.log('\n📋 Environment Variables Check:\n');
  requiredVars.forEach((varName) => {
    if (envContent.includes(varName)) {
      console.log(`✅ ${varName} is configured`);
    } else {
      console.log(`⚠️  ${varName} is missing`);
    }
  });
}

console.log('\n═'.repeat(50));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.log('⚠️  Some required files are missing. Please run setup again.\n');
  process.exit(1);
} else {
  console.log('✨ All checks passed! Your turbo setup is ready.\n');
  process.exit(0);
}
