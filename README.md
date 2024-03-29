# Webpack loader for webgl shaders in typescript language


## How to use?

#### Import shader text in you typescript file:

```ts
import shaderText from 'shaderFilePath.glsl'
```


#### Add a loader module in webpack configuration file

```javascript
{
	module: {
		loaders: [
			{
				test: /\.(glsl|vert|frag|vs|fs)$/,
				loader: '@pucelle/webpack-shader-loader',

				// If `true`, will remove whitespaces to compress, be `true` by default.
				options: {compress: true},
			}
		]
	}
}
```
