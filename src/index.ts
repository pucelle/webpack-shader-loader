import {getOptions} from 'loader-utils'
import type {loader} from 'webpack'


interface LoaderOptions {
	/** Whether compress shader text source. */
	compress?: boolean
}

const DefaultLoaderOptions: Required<LoaderOptions> = {
	compress: true,
}


export default function(this: loader.LoaderContext, source: string) {
	this.cacheable()

	let callback = this.async()!
	let text = new ShaderProcessor(this).process(source)

	callback(null, `export default ${JSON.stringify(text)}`)
}


class ShaderProcessor {

	private readonly options: Required<LoaderOptions>

	constructor(
		loader: loader.LoaderContext
	) {
		this.options = Object.assign({}, DefaultLoaderOptions, getOptions(loader))
	}

	process(source: string): string {
		if (this.options.compress) {
			source = source.replace(/\/\*\*[\s\S]*?\*\//g, '')
			source = source.replace(/\/\/.+/g, '')
			source = source.replace(/\s*\n/g, '\n')
			source = source.replace(/\n\s*/g, '\n')
			source = source.replace(/ {2,}/g, ' ')
		}

		return source
	}
}