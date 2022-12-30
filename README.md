This is not decorator problem but mangle terser options, you can avoid mangle: false and compress keep_classnames: true and keep_fnames: true.

## Settig Reproduction

1. run `pnpm i`
2. run `npm run build:watch` in subprocess.
3. run `./bin/run.js` switching loader 'babel-loader' and 'swc-loader',

## Results

### babel-loader or tsc

tsconfig.json
```json:tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "module": "commonjs",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["./src"]
}
```

babel.config.js
```js:babel.config.js
module.exports = {
  "presets": [
    [
      "@babel/preset-typescript"
    ]
  ],
  "plugins": [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ]
}
```

result:

```js
[
  {
    "meta": {
      "value": "A"
    },
    "instance": {},
    "params": [
      {
        "meta": {
          "value": "a"
        },
        "discoveredMethod": {
          "methodName": "method",
          "parentClass": {
            "name": "A",
            "instance": {},
            "parentModule": {
              "name": "AppModule",
              "instance": {}
            }
          }
        }
      }
    ]
  },
  {
    "meta": {
      "value": "B"
    },
    "instance": {},
    "params": [
      {
        "meta": {},
        "discoveredMethod": {
          "methodName": "method",
          "parentClass": {
            "name": "B",
            "instance": {},
            "parentModule": {
              "name": "AppModule",
              "instance": {}
            }
          }
        }
      }
    ]
  }
]
```

### swc

```json:.swcrc
{
  "$schema": "http://json.schemastore.org/swcrc",
  "module": {
    "type": "commonjs",
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  },
  "jsc": {
    "externalHelpers": true,
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": true,
      "dynamicImport": false
    },
    "transform": {
      "decoratorMetadata": true,
      "legacyDecorator": true
    },
    "minify": {
      "compress": {
        "unused": true
      },
      "mangle": true
    }
  },
  "minify": true
}
```

result:

```js
[
  {
    "meta": {
      "value": "A"
    },
    "instance": {},
    "params": [
      {
        "meta": {
          "value": "a"
        },
        "discoveredMethod": {
          "methodName": "method",
          "parentClass": {
            "name": "t",
            "instance": {},
            "parentModule": {
              "name": "e",
              "instance": {}
            }
          }
        }
      },
      {
        "meta": {},
        "discoveredMethod": {
          "methodName": "method",
          "parentClass": {
            "name": "t",
            "instance": {},
            "parentModule": {
              "name": "e",
              "instance": {}
            }
          }
        }
      }
    ]
  },
  {
    "meta": {
      "value": "B"
    },
    "instance": {},
    "params": [
      {
        "meta": {
          "value": "a"
        },
        "discoveredMethod": {
          "methodName": "method",
          "parentClass": {
            "name": "t",
            "instance": {},
            "parentModule": {
              "name": "e",
              "instance": {}
            }
          }
        }
      },
      {
        "meta": {},
        "discoveredMethod": {
          "methodName": "method",
          "parentClass": {
            "name": "t",
            "instance": {},
            "parentModule": {
              "name": "e",
              "instance": {}
            }
          }
        }
      }
    ]
  }
]
```
