# [Duotek Frontend Template](//github.com/sashasushko/duotek-frontend)
Шаблон для быстрого старта проекта :rocket:

## Старт
1. Скачай [последний релиз](//github.com/sashasushko/duotek-frontend/releases) и распакуй в папку проекта
1.1 В уже созданную папку склонируй репозиторий `git clone https://github.com/Duotek/frontend-template.git .` , затем удали папку .git
1.2 Открой консоль, перейди в public `cd C:\web\home\frontend-template\public`
2. Установи зависимости командой `npm install`

## Запуск
```bash
gulp
```
_Единоразово собирает стили, скрипты и спрайт, а после запускает `gulp watch`_

## GULP-задачи
#### Запустить отслеживание изменений:
```bash
gulp watch
```

#### Собрать стили из исходников:
```bash
gulp css
```

#### Собрать скрипты из исходников:
```bash
gulp js
```
_Перед сборкой файлы обрабатываются Бабелем для поддержки «старых» браузеров по предустановкам `es2015`_

#### Собрать растровый спрайт:
```bash
gulp sprite-png
```
_Собирает спрайт из иконок, добавленных в папку `/staticcontent/img/sprite/png`.

#### Оптимизировать и минифицировать стили и скрипты
```bash
gulp deploy
```
_Вызывает поочередно задачи для оптимизации и минификации стилей `gulp deploy-css` и скриптов `gulp deploy-js`_


## Файловая структура
```
gulpfile.js                         # Задачи для сборщика
package.json                        # Информация о проекте
/staticcontent
    /css
        all.css                     # Собранные стили
    /js
        all.js                      # Собранные скрипты
    /img
    /fonts
    /source
        /scss
            /helpers                # Переменные, примеси и прочие вспомогательные стили
            /base                   # Основные стили
            /layout                 # Раскладки и сетки
            /blocks                 # Блоки по БЭМу. Каждый в отдельном файле
            /pages                  # Стили для страниц
            styles.scss             # Список @import для сборки
        /js
            /helpers                # Папка со вспомогательными скриптами
            /polyfills              # Папка с JS-полифилами. Каждый в отдельном файле
            /components             # Папка с JS-компонентами. Каждый в отдельном файле
            app.js                  # Точка входа в клиентский JS
        /img
            /sprite
                /png                # Иконки для PNG-спрайта
        /fonts                      # Шрифты для конвертации в woff
        /vendor                     # Сторонние библиотеки
```

Движковые JS-библиотеки, например jQuery, лежат в корне в папке `/jscore` и подключаются автоматически.

## Использование PNG-спрайтов

### Иконки
Спрайт собирается автоматически из иконок в папке `/staticcontent/img/sprite/png`.

Иконки должны быть с чётными высотой и шириной, названы по-английски, желательно одним словом. Дефис допустим. Их название после станет переменной для примеси.

Для ретины иконки должны быть в два раза больше обычной, а в конце названия иметь приписку `@2x`. Сами названия у обычной иконки и для ретины должны совпадать.
Например, обычная `menu.png` 16 на 16 px и для ретины `menu@2x.png` 32 на 32 px.

### Примеси
Утилита **[spritesmith](/twolfson/gulp.spritesmith/)** автоматически генерирует примеси:

`sprite-width($icon-name)` — ширина иконки

`sprite-height($icon-name)` — высота иконки

`sprite-position($icon-name)` — положение иконки в спрайте

`sprite-image($icon-name)` — путь к спрайту

`sprite($icon-name)` — четыре предыдущих свойства сразу

`sprite-background-size($icon-name)` — ширина и высота спрайта

Все примеси возвращают результат как _ключ: значение_. Например:
```scss
.icon--menu {
    @include sprite-width($menu);
}
```
Скомпилируется в:
```css
.icon--menu {
    width: 16px;
}
```

### Стандартное использование

Примесь для не ретина иконок `sprite($icon)` мы не используем.

Только `retinaSprite($icon-group)`, где `$icon` — название png-иконки, а `-group` — служебная приписка.

Например, для иконки `menu.png` код будет следующий:
```scss
.icon--menu {
    @include retina-sprite($menu-group);
}
```
В скомпилированном CSS мы получим:
```css
.icon--menu {
    width: 16px;
    height: 16px;
    background-image: url('/staticcontent/img/sprite.png');
    background-position: 0 0;
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .icon--menu {
        background-image: url('/staticcontent/img/sprite@2x.png');
        background-size: 16px 16px;
    }
}
```

### Эффекты при наведении
Чтобы сменить при наведении иконку на другое её состояние, достаточно указать позицию состояния:
```scss
.icon--menu {
    @include retina-sprite($menu-group);

    &:hover {
        @include sprite-position($menu-hover);
    }
}
```
А вот другое состояние иконки `menu-hover.png` и `menu-hover@2x.png` придётся рисовать отдельно.

В случае, если сменить нужно на другую иконку со своими высотой и шириной, придётся прописать новую примесь: `@include retina-sprite($cross-group);`

### Нестандартное использование

Бывают случаи, когда необходимо получить параметры иконки не как _ключ: значение_, а просто _значение_. Тогда можно обратиться напрямую к массиву параметров иконки, записанному в переменную `$icon-name`.

Например, нам необходимо отцентровать иконку, а современные способы вроде `translate` или `flexbox` не поддерживаются:
```scss
.icon--menu {
    // Примесь вставит: width, height, background-image, background-position и @media для ретины
    @include retina-sprite($menu-group);

    // Центруем
    // Смещаем вниз на 50% и возвращаем вверх на половину собственной ширины
    top: 50%;
    margin-top: ($menu-height / 2) * (-1);
    // Тоже самое по горизонтали
    left: 50%;
    margin-left: ($menu-width / 2) * (-1);
}
```
