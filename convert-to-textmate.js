let nlist = require("nextstep-plist")
let filepath = process.argv[2]
let path = require("path")

if (!filepath || !filepath.endsWith(".json")) {
	console.log("please provide a path to a json file mate")
	process.exit(1)
}

let syntax = require(path.resolve(__dirname, filepath))

let flurp = r =>
	r.replace(/# .*/g, '').replace(/\s/g, '')

let grith = patterns => {
	for (let pattern of patterns) {
		for (let key in pattern) {
			if (key == "begin" || key == "match") {
				pattern[key] = flurp(pattern[key])
			}
		}
	}
}

grith(syntax.patterns)

for (let repo in syntax.repository) {
	grith(syntax.repository[repo].patterns)
}

console.log(nlist.stringify(syntax))
