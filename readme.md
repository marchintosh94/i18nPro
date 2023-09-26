<div style="display:flex;justify-content: center">
    <img src="./assets/i18nPro.png" width="300"/>
</div>

## Introduction

i18nPro is a powerful internationalization library for web applications. It provides a seamless way to manage translations and pluralization in multiple languages. This library is made up of a core library written in TypeScript and specific implementation for main web application libraries/framework.
This documentation will guide you through the installation, setup, and usage of i18nPro.


## 📄 Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Getting Started](#getting-started)
    - [i18nPro - Core](#i18npro---core)
    - [i18nPro - React](#i18npro---react)
4. [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Pluralization](#pluralization)
    - [JSON Translations](#json-translations)
        - [Simple](#simple)
        - [Pluralization](#pluralization-1)
        - [Dynamic Data](#dynamic-data)
5. [License](#license)

## Installation

```bash
npm install @marchintosh94/i18n-pro
# or
yarn add @marchintosh94/i18n-pro
```

## Configuration

- `defaultLocale` (string): The default language to use if no language is specified.

Import the i18nPro module and set your desired configuration:

```typescript
// src/index.ts

import { i18nPro } from '@marchintosh94/i18n-pro'

i18nPro.defaultLocale = 'en-US'

//... other
```
## Getting Started

i18nPro is made up of a core library and their implementation for specific libraries/framework.

### 🧬 i18nPro - Core
This is the main library where core functionalities are available and it does not have any dependency on any framework. So you can install i18nPro and create your implementation for your favourite framework or library.

[🔗 Go to i18nPro - Core](./core/README.md)  
 

### <img src="./assets/react.png" width="20"/>&nbsp;&nbsp;i18nPro - React

This is the implementation of main library for React. i18nPro-react exposes all the core functionalities and utilities to adapt them to React ecosystem.

[🔗 Go to i18nPro - React](./core/README.md)  

## Usage

### Basic Usage

```typescript
import { i18nPro } from '@marchintosh94/i18n-pro'

// Translate a string
const greeting = i18nPro.t('greeting'); // Uses the default language

// Translate a string in a specific language loaded from cdn
i18nPro.changeLanguage('en', 'https://cdn.site.dev/translations/en.json')
const welcome = i18nPro.t('welcome');
```

### Pluralization

```json
// en.json

{
  "apples": "There is one apple | There are {count} apples"
}
```

```typescript
const apples = i18nPro.t('apples', 2, { count: 3 });
// Output: "There are 3 apples"
```

### JSON Translations
i18nPro accepts as translation dictionary a JSON with the following format:

#### Simple
```json
{
    "tranlsation_key": "translation_value",
    "tranlsation_key2": "translation_value2",
    "tranlsation_key3": "translation_value3",
}
```
#### Pluralization
The result of the translation will be calculated once `t` method will be used with the pluralization argoument.
```json
{
    "tranlsation_key": "One | Two | Three",
}
```
#### Dynamic Data
The value in the curly braces will be replaced once the `t` method will be used with the related argoument.
```json
{
    "tranlsation_key": "Hi, my name is {my_name}",
}
``````

## License

This project is licensed under the [MIT License](./LICENSE).

---
