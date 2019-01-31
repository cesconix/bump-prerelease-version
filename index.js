#!/usr/bin/env node

const chalk = require('chalk')
const Ora = require('ora')
const yargs = require('yargs')
const semver = require('semver')
const git = require('simple-git/promise')()

const argv = yargs
  .usage('Usage: $0 [options]')
  .option('prefix', {
    alias: 'p',
    describe: 'Prefix of the tag to look for',
    default: 'v'
  })
  .option('semver', {
    alias: 'v',
    describe: 'Semver to look for prerelease identifier',
    demandOption: true
  })
  .demandCommand(0, 0)
  .help()
  .version().argv

;(async () => {
  const spinner = new Ora()
  const fullTag = `${argv.prefix}${argv.semver}`

  try {
    const isRepo = await git.checkIsRepo()
    if (!isRepo) {
      throw new Error('No git repository found')
    }

    spinner.start(`Fetching repository tag list`)
    const tags = await git.tags()
    if (!tags) {
      throw new Error('No tags found on git repository')
    }
    spinner.succeed()

    spinner.start(
      `Checking last pre-release version for tag ${chalk.cyan(fullTag)}`
    )

    const matchedTags = tags.all
      .filter(tag => tag.startsWith(fullTag))
      .sort((a, b) => semver.compare(a, b))

    if (matchedTags.length === 0) {
      throw new Error(`No tag matches with ${chalk.red(fullTag)}`)
    }

    const lastTagVersion = matchedTags[matchedTags.length - 1]

    const prerelease = semver.prerelease(lastTagVersion)
    if (!prerelease) {
      throw new Error(
        `No pre-release version found for tag ${chalk.red(lastTagVersion)}`
      )
    }

    spinner.succeed()
    spinner.info(`Detected tag ${chalk.cyan(lastTagVersion)}`)

    const lastCommitTags = (await git.tag(['--points-at', 'HEAD'])).split('\n')

    if (lastCommitTags.includes(lastTagVersion)) {
      spinner.info(
        `Tag ${chalk.cyan(lastTagVersion)} matches with the last git commit, ` +
          'no need to bump version'
      )
      process.exit(0)
    }

    const nextSemver = semver.inc(lastTagVersion, 'prerelease', prerelease[0])
    const nextTag = `${argv.prefix}${nextSemver}`

    spinner.start(`Tagging as ${chalk.cyan(nextTag)}`)
    await git.addTag(nextTag)
    spinner.succeed(`Tagged as ${chalk.cyan(nextTag)}`)

    spinner.start('Pushing to origin')
    await git.pushTags()
    spinner.succeed('Pushed to origin')

    console.log(
      `${chalk.cyan('Success!')} Version bumped to ${chalk.cyan(nextTag)}`
    )

    process.exit(0)
  } catch (e) {
    spinner.fail(e.message)
    process.exit(1)
  }
})()
