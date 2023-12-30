> :warning: **Archived Repository:** This project is no longer maintained and is kept here for archival purposes only. Please note that the code may be outdated and no longer functional.
> 
# bump-prerelease-version

> bump existing pre-release semver tag

[![build status](https://travis-ci.com/cesconix/bump-prerelease-version.svg)](https://travis-ci.com/cesconix/bump-prerelease-version) 
[![npm version](https://img.shields.io/npm/v/bump-prerelease-version.svg)](https://www.npmjs.com/package/bump-prerelease-version)
[![dependencies](https://img.shields.io/david/cesconix/bump-prerelease-version.svg)](https://david-dm.org/cesconix/bump-prerelease-version)
[![vulnerabilities](https://snyk.io/test/github/cesconix/bump-prerelease-version/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cesconix/bump-prerelease-version?targetFile=package.json)
[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![conventional commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

CLI to create a pre-release semver git tag based on an existing one, incrementing it.

It arises from the need to automate tag generation during a CI/CD process, when support 
branches merged back into historical branches.

## Quick Overview

<img src="https://raw.githubusercontent.com/cesconix/bump-prerelease-version/master/screencast.svg?sanitize=true" width='600'>

## Installation

```bash
npm install -g bump-prerelease-version
```

## Usage

```
Usage: bump-prerelease-version [options]

Options:
  --prefix, -p  Prefix of the tag to look for                     [default: "v"]
  --semver, -v  Semver to look for prerelease identifier              [required]
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
```

### Example

```bash
$ bump-prerelease-version --prefix 'v' --semver '2.0.0'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT. Copyright (C) 2019 [Francesco Pasqua](https://www.linkedin.com/in/cesconix).
