<div style="display:flex;justify-content: center;">
    <img src="./assets/i18nPro.png" width="400"/>
    <div>
        <img src="./assets/ts.png" width="40"/>
    </div>
</div>

<h1 style="width:100%;text-align:center;margin:3rem 0;">@marchintosh94/i18n-pro</h1>

## Introduction

i18nPro is a powerful internationalization library for web applications. It provides a seamless way to manage translations and pluralization in multiple languages. This is the core library and this documentation will guide you through the installation, setup, and usage of i18nPro.


## 📄 Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Usage](#usage)
    - [Load Translations](#load-external-translation-loadmessages)
    - [Inject Translations](#load-translation-manually-loadlocalmessages)
    - [Change Language](#change-language-changelanguage)
    - [Translate](#translate-t)
        - [Pluralization](#pluralization)
        - [Dynamic Data](#dynamic-data)
    - [JSON Translations](#json-translations)
4. [React](#react---i18npro-react)
5. [License](#license)

## Installation

```bash
npm install @marchintosh94/i18n-pro
# or
yarn add @marchintosh94/i18n-pro
```

## Configuration

- `defaultLocale` (string): The default language to use if no language is specified.

Import the i18nPro module and set your desired configuration in the entry point of your application:

```typescript
// src/index.ts

import { i18nPro } from '@marchintosh94/i18n-pro'

i18nPro.defaultLocale = 'en-US'

//... other
```
## Usage

### Load external translation: `loadMessages` 
This method allows to change current locale and load the dictionary from remote server via HTTP.
```typescript
import { i18nPro } from '@marchintosh94/i18n-pro'


// Set the locale and load translation dictionary from external url
await i18nPro.loadMessages('en', 'https://cdn.site.dev/translations/en.json')
const welcome = i18nPro.t('welcome');
```
### Load translation manually: `loadLocalMessages`
This method allows to change current locale andload the dictionary directly from the local environment.

```typescript
import { i18nPro } from '@marchintosh94/i18n-pro'


// Set the locale and load translation dictionary as string that contains the JSON object
await i18nPro.loadLocalMessages('en', '{"Hi": "Hi"}')
// or with a JSON object Record<string, string | number>
const dictionary: Record<string, string | number> = {"Hi": "Hi"}
await i18nPro.loadLocalMessages('en', dictionary)
const welcome = i18nPro.t('Hi');
```
### Change Language: `changeLanguage`
This method allows to change current locale and dynamically load the dictionary from the local environment or remote server based on the argouments passed to the function.
```typescript
import { i18nPro } from '@marchintosh94/i18n-pro'


// Set the locale and load translation dictionary as string that contains the JSON object
await i18nPro.changeLanguage('en', '{"Hi": "Hi"}')
// or with a JSON object Record<string, string | number>
const dictionary: Record<string, string | number> = {"Hi": "Hi"}
await i18nPro.changeLanguage('en', dictionary)
const welcome = i18nPro.t('Hi');
```
### Translate: `t`
Once the dictionary is loaded and the locale is set, the `t` method will translate the key that is passed in if a match is found, otherwise it will return the key as default value.
```typescript
import { i18nPro } from '@marchintosh94/i18n-pro'

const dictionary: Record<string, string | number> = {"Hi": "Hi"}
await i18nPro.changeLanguage('en', dictionary)

//
const welcome = i18nPro.t('Hi');
```

#### Pluralization
```json
{
    "apple": "0 apples| 1 apple | 2 apples ",
}
```
```typescript
const apples = i18nPro.t('apple', 1);
// Output: "I'd like 1 apples"
```
#### Dynamic Data
```json
{
    "tranlsation_key": "Hi, my name is {my_name}",
}
```
```typescript
const apples = i18nPro.t('tranlsation_key', { my_name: "Carlos" });
// Output: "Hi, my name is Carlos"
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
```

## <img src="./assets/react.png" width="16"/> React - I18nPro-React
### @marchintosh/i18n-pro-react

This is the implementation of main library for React. i18nPro-react exposes all the core functionalities and utilities to adapt them to React ecosystem.

#### 🔗[I18nPro-react](https://github.com/marchintosh94/i18nPro-react.git)

## License

This project is licensed under the [MIT License](./LICENSE).

