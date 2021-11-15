## sunrise-timer-ha

> Node.js sunrise timer for home automation

[![npm](https://img.shields.io/npm/v/sunrise-timer-ha/latest.svg)](https://www.npmjs.com/package/sunrise-timer-ha)
[![min.gz size](https://badgen.net/bundlephobia/minzip/sunrise-timer-ha)](https://bundlephobia.com/result?p=sunrise-timer-ha)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Features

- Customize artificial sunrise/sunset
- Supports telldus live (open to PRs or feature requests for other HA APIs)
- Turn light off once sun reaches x degrees over the horizon (since natural light becomes
  sufficient)
- Configure custom noon
- Configure custom dimmer interval
- Customize length of sunrise/sunset

# Example usage

## Basics

Depends on `config.yaml` file present in working dir.

Example config:

```
# Location & max sun angle for artificial light
max_sun_angle: 3, # degrees over the horizon at which time light can be turned off as it's light-enough anyway, default 5
latitude: 60.025369
longitude: 17.669363

fake_noon_hour: 11 # Treat as mid-day, default: 11
hours_of_full_light: 10 # Determines how many hours around noon should have full light befor dimming starts, default: 11
minutes_of_sunrise: 120 # interval for dimming between 0 and 100% (both sunrise and sundown), default: 120

dimmer_step: 3 # default: 3
dimmer_controller: telldus # default: telldus
dimmer_max: 50 # Start dimming downwards from here. Although 100 is 100 (or "on"). Default: 100

telldus:
  dimmer_id: <your dimmer id as found api.telldus.com>
```

Apart from config you also need to configure oauth keys for telldus You can get yours here:
http://api.telldus.com/keys/index Configured using environment variables:

```
TELLDUS_CONSUMER_KEY=
TELLDUS_CONSUMER_SECRET=
TELLDUS_ACCESS_TOKEN=
TELLDUS_ACCESS_TOKEN_SECRET=
```

## Example docker-compose file

```
version: '3.4'

services:
  chicken_timer:
    image: kribor/sunrise-timer-ha:latest
    restart: always
    volumes:
      - ${PWD}/config.yaml:/opt/app/config.yaml
    environment:
      - TELLDUS_CONSUMER_KEY=<your keys here>
      - TELLDUS_CONSUMER_SECRET=<your keys here>
      - TELLDUS_ACCESS_TOKEN=<your keys here>
      - TELLDUS_ACCESS_TOKEN_SECRET=<your keys here>

```

# Packaging

- `engines.node`: Latest Node.js LTS
- `main: dist/index.js`: commonjs, es2020
- `types: dist/index.d.ts`: typescript types
- `/src` folder with source `*.ts` files included
