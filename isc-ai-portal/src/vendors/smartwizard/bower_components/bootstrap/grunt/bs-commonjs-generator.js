/* !
 * Bootstrap Grunt task for the CommonJS module generation
 * http://getbootstrap.com
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict'

const fs = require('fs')
const path = require('path')

const COMMONJS_BANNER = '// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.\n'

module.exports = function generateCommonJSModule (grunt, srcFiles, destFilepath) {
	const destDir = path.dirname(destFilepath)

	function srcPathToDestRequire (srcFilepath) {
		const requirePath = path.relative(destDir, srcFilepath).replace(/\\/g, '/')
		return 'require(\'' + requirePath + '\')'
	}

	const moduleOutputJs = COMMONJS_BANNER + srcFiles.map(srcPathToDestRequire).join('\n')
	try {
		fs.writeFileSync(destFilepath, moduleOutputJs)
	}
	catch (err) {
		grunt.fail.warn(err)
	}
	grunt.log.writeln('File ' + destFilepath.cyan + ' created.')
}
