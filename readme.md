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

Все SVG-файлы, расположенные в папке `src/assets/images/_svg` соираются в спрайт.

Чтобы обратиться к нужной иконке из спрайта необходимо прописать `id` иконки, например `#name`, который соответствует имени файла в папке `src/assets/images/_svg`.

```bash
<svg>
     <use xlink:href="#icon_name"></use>
</svg>
  ```

### Picture Tag

Эта сборка конвертирует для каждого изображения webp-файл, поэтому желательно помещать все картинки в тег `picture` (source: webp, img: jpg)
