# Webpack Template

* [Yarn](https://yarnpkg.com/)
* [Handlebars](https://handlebarsjs.com/guide/)
* [Alpine.js](https://alpinejs.dev/)

Сборка фронта. SCSS. Handlebars. Alpine.js. SVG sprite. Конвертация изображений в webp.

## Dev

Запуск окружения для разработки

```bash

yarn dev

```

## Prod

Сборка под прод собирает в папку `dist`

```bash

yarn prod

```

## Features

### SVG Sprite

SVG-файлы должны располагаться в папке `src/assets/images/svg`.

```bash
<svg>
     <use xlink:href="#имя_файла"></use>
</svg>
  ```

### Picture Tag

Эта сборка конвертирует для каждого изображения webp-файл, поэтому желательно помещать все картинки в тег `picture` (source: webp, img: jpg)

```bash
<picture>
   <source srcet="./assets/images/hero/01.webp" />
   <img loading="lazy" src="./assets/images/hero/01.jpg" alt="" />
</picture>
  ```
