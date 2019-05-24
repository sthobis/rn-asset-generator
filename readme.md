asset-generator
===============

This is a cheap asset resizer for React Native. It takes an image in @3x or xxhdpi size and resize it to @1x, @1.5x, @2x, @3x

## Installation

```
npm install asset-generator -g
```

## Usage

```
asset-generator <files> --target <target-dir>
```

target option is optional.

example:
```
#asset-generator *.png
#asset-generator *.png -t resized
#asset-generator *.png --target resized
```

---
Copyright (c) Tobias Zeising, tobias.zeising@aditu.de, sthobis  
http://www.aditu.de  
Licensed under the MIT license 