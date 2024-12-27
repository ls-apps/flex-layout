
# Flex Layout

SCSS / CSS layout framework

[Homepage](https://ls-apps.gitlab.io/flex-layout)\
[Gettings started](https://ls-apps.gitlab.io/flex-layout/getting-started)\
[Documentation](https://ls-apps.gitlab.io/flex-layout/documentation)

[![npm version](https://badge.fury.io/js/%40ls-apps%2Fflex-layout.svg)](https://www.npmjs.com/package/@ls-apps/flex-layout)

Support me on:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I2I412CXB7)

[![paypal](https://www.paypalobjects.com/webstatic/de_DE/i/de-pp-logo-100px.png)](https://paypal.me/luschmidt)

## Getting started

### Installation

Install Flex Layout via package manager using the following command:

```shell
npm install @ls-apps/flex-layout
```

### Usage

You have several options to include Flex Layout in your project:

#### Import in SCSS

```scss
@use '@ls-apps/flex-layout';
```

#### or import in CSS

```css
@import '@ls-apps/flex-layout/layout.css';
```

#### or the optimized CSS import

```css
@import '@ls-apps/flex-layout/layout.min.css';
```

#### or import in HTML

```html
<link rel="stylesheet" type="text/css" href="node_modules/@ls-apps/flex-layout/layout.css">
```

#### or the optimized html import

```html
<link rel="stylesheet" type="text/css" href="node_modules/@ls-apps/flex-layout/layout.min.css">
```

#### If you don't need media queries, you can only include the basic functions

```scss
@use '@ls-apps/flex-layout/base';
```

### Customization in SCSS

Flex Layout can be customized when importing in SCSS files. Available options are:

| Option | Value | Default |
| --- | --- | --- |
| $percentages | List of percentages (without % suffix) | (10, 20, 30, 40, 50, 60, 70, 80, 90, 100) |
| $pixels | List of pixel declarations (without px suffix) | (4, 8, 12, 16, 20, 24, 28, 32) |
| $queries | List of media queries | ('', 'xs', 'sm', 'md', 'lg', 'xl', 'gt-xs', 'gt-sm', 'gt-md', 'lt-md', 'lt-lg', 'lt-xl') |
| $content-alignments | List of content alignments | ('start', 'center', 'end', 'space-around', 'space-between', 'space-evenly') |
| $item-alignments | List of item alignments | ('start', 'center', 'end', 'stretch') |
| $wit-reverse | boolean | false |
| $with-alignments | boolean | true |
| $with-offsets | boolean | true |
| $with-gaps | boolean | true |
| $with-flex | boolean | true |
| $with-fill | boolean | true |
| $with-hide | boolean | true |

```scss
@use '@ls-apps/flex-layout' with (
  $percentages: (10, 20, 30, 40, 50, 60, 70, 80, 90, 100),
  $pixels: (4, 8, 12, 16, 20, 24, 28, 32),
  $queries: ('', 'xs', 'sm', 'md', 'lg', 'xl', 'gt-xs', 'gt-sm', 'gt-md', 'lt-md', 'lt-lg', 'lt-xl'),
  $content-alignments: ('start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'),
  $item-alignments: ('start', 'center', 'end', 'stretch'),
  $with-reverse: false,
  $with-alignments: true,
  $with-offsets: true,
  $with-gaps: true,
  $with-flex: true,
  $with-fill: true,
  $with-hide: true
);
```

Alternatively, you can import specific functions. By default these are minimalistic, but can be configured:

```scss
@use 'layout/alignments';
@use 'layout/directions';
@use 'layout/fill';
@use 'layout/flex';
@use 'layout/gaps';
@use 'layout/hide';
@use 'layout/offsets';
```

Find out more about the options and adjustments in the [Documentation](https://ls-apps.gitlab.io/flex-layout/documentation).
