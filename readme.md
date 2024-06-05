# Webpack Template

* [Yarn](https://yarnpkg.com/)
* [Handlebars](https://handlebarsjs.com/guide/)
* [Alpine.js](https://alpinejs.dev/)

Сборка фронта. SCSS. Handlebars. Alpine.js. SVG sprite. Конвертация изображений в webp.

## Начало работы

```bash

yarn dev

```

## Сборка

```bash

yarn prod

```

JS-файлы без хешей:

```bash

yarn prod:no-hash

```

## Features

### SVG Sprite

SVG-файлы должны располагаться в папке `src/assets/images/svg`.

```bash
<svg>
     <use xlink:href="#имя_файла"></use>
</svg>
  ```
