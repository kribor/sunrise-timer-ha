## @naturalcycles/time-lib

> Date/time API, based on Dayjs.

[![npm](https://img.shields.io/npm/v/@naturalcycles/time-lib/latest.svg)](https://www.npmjs.com/package/@naturalcycles/time-lib)
[![min.gz size](https://badgen.net/bundlephobia/minzip/@naturalcycles/time-lib)](https://bundlephobia.com/result?p=@naturalcycles/time-lib)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Why

- Fixes TypeScript imports, regardless if esModuleInterop is used or not
- ~~Allows to use it as ESM package with tree-shaking (without breaking your TypeScript again)~~
- Opinionated. Includes "needed" dayjs plugins by default.
- Allows to "just import dayjs" and not worry about:
  - Loading plugins for all of your "entry points", such as `startServer.ts`, `setupJest.ts`, at
    every cron job, etc.
  - That plugins are loaded BEFORE they are used (dependent on import order)
  - That TypeScript types are not loaded with plugins
- Extends dayjs with some useful functions (via Plugin interface)
- Has working `isoWeekday` plugin
- Has `en-gb` locale by default, so, default firstDayOfWeek is Monday

# API

TODO
