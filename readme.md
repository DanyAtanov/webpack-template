# Webpack Template

* [Handlebars](https://handlebarsjs.com/guide/)
* [Alpine.js](https://alpinejs.dev/)

Сборка фронта. SCSS. Handlebars. Alpine.js. 

## Начало работы

```bash

npm dev

```

## Сборка

```bash

npm prod

```

JS-файлы без хешей:

```bash

npm prod:no-hash

```

## Features

### SVG Sprite

```bash
<svg>
     <use xlink:href="./assets/images/sprite.svg#имя_файла"></use>
</svg>
  ```

### AlpneJS

Body-scroll-lock если true-условие

```bash
x-trap.noscroll="foo"
  ```

Ловим Escape

```bash
@keyup.escape.window="foo"
  ```

  Клик на всем документе

```bash
@click.document="foo"
  ```
