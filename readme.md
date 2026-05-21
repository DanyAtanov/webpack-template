# Webpack Template

* [Handlebars](https://handlebarsjs.com/guide/)
* [Alpine.js](https://alpinejs.dev/)

Сборка фронта. SCSS. Handlebars. Alpine.js.

Dev-разработка

```bash

npm run dev

```

Сборка

```bash

npm run prod

```

JS-файлы без хешей:

```bash

npm run prod:no-hash

```

## Features

### SVG Sprite (depricated)

```bash
<svg>
     <use xlink:href="./assets/images/sprite.svg#имя_файла"></use>
</svg>
  ```

### SCSS

```bash
.foo {
  @include media.laptop {
    color: settings.$primary;
    @include mixins.flex-center;
  }
}
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
