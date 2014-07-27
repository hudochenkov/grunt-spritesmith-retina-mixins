# Retina sprite mixins for grunt-spritesmith

Template and [grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith) options for using sprites with retina support.

## Features

* One variable for all sprite elements information instead of variable for each image.
* Using one folder for all sprite images. Better see if you forget retina or non-retina image version.
* Simple mixins usage without duplicating sprite element's name.

## Usage

### Preparation

1. Copy `spritesmith-retina-mixins.template.mustache` somewhere in your project folder.
2. Put all images (both non-retina and retina) in one folder (e. g. `img/sprite`). Retina version should have same name as non-retina but suffixed with `@2x`. E. g. `play.png` and `play@2x.png`.
3. Configure grunt-spritesmith's task:

    ```js
    sprite: {
        buildretina: {
            'src': ['img/sprite/*@2x.png'],
            'destImg': 'img/sprite@2x.png',
            'destCSS': 'scss/_sprite.scss',
            'padding': 20,
            'algorithm': 'binary-tree',
            'engine': 'auto'
        },
        build: {
            'src': ['img/sprite/*.png', '!<%= sprite.buildretina.src %>'],
            // destImg should be same as in sprite:buildretina task, but without @2x
            'destImg': 'img/sprite.png',
            // padding should be twice smaller, than padding in sprite:buildretina task
            'padding': 10,
            // path to template
            'cssTemplate': '../spritesmith-retina-mixins.template.mustache',

            // don't edit below
            'cssVarMap': function (sprite) {
                sprite.image = sprite.image.replace(".png", "");
            },
            'algorithm': '<%= sprite.buildretina.algorithm %>',
            'destCSS': '<%= sprite.buildretina.destCSS %>',
            'engine': '<%= sprite.buildretina.engine %>'
        }
    }
    ```

3. Import generated `_sprite.scss` to your .scss-file:
    
    ```scss
    @import "sprite";
    ```

### In SCSS

#### Sprite with element size

```scss
.retina-sprite {
    @include sprite("scroll-down");
}
```

Compiles to:

```css
.retina-sprite {
    background-image: url("../img/sprite.png");
    background-position: -199px -57px;
    background-repeat: no-repeat;
    width: 54px;
    height: 23px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2 / 1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {
    .retina-sprite {
        background-size: 335px 163px;
        background-image: url("../img/sprite@2x.png");
    }
}
```

#### Without element size

```scss
.retina-sprite--without-size {
    @include sprite("scroll-down", false);
}
```

Compiles to:

```css
.retina-sprite--without-size {
    background-image: url("../img/sprite.png");
    background-position: -199px -57px;
    background-repeat: no-repeat;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2 / 1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {
    .retina-sprite--without-size {
        background-size: 335px 163px;
        background-image: url("../img/sprite@2x.png");
    }
}
```

#### Sprite element properties

```scss
.retina-sprite-properties {
    @include sprite-width("scroll-down");
    @include sprite-height("scroll-down");
    @include sprite-size("scroll-down");
    @include sprite-position("scroll-down");
    @include sprite-image("scroll-down");
    @include sprite-image-retina("scroll-down");
}
```

Compiles to:

```css
.retina-sprite-properties {
    width: 54px;
    height: 23px;
    background-size: 335px 163px;
    background-position: -199px -57px;
    background-image: url("../img/sprite.png");
    background-image: url("../img/sprite@2x.png");
}
```

### Example

You can see full usage example at this repo's [example](tree/master/example) folder.

## Thanks

Guys from [spritesmith's issue about retina sprites](https://github.com/Ensighten/spritesmith/issues/19) for inspiration.

Chris Coyier for [retina media query](http://css-tricks.com/snippets/css/retina-display-media-query/).

## License

Copyright © 2014 Aleks Hudochenkov

Licensed under the MIT license.
