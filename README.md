# Akita Autumn Field Console

Unofficial Chia GUI visual mod: Akita Console - Autumn Field theme for Chia.

This package replaces the Electron GUI bundle `app.asar`.
It keeps the original Chia GUI functions and changes the visual layout/theme.

## Preview

![Akita Autumn Field Console](Screenshots/akita-autumn-field-console.png)

## Status

Current release: `v0.2.3-chia-2.7.1`.
Current GigaHorse prerelease: `v0.2.3-gigahorse-2.7.1-giga37`.

The v0.2.3 update refreshes the Akita Autumn Field theme:

- Light and dark theme colors are updated across cards, tables, dropdowns, header controls, wallet receive address field, and plot status indicators.
- Mod-specific theme color slots are used while preserving the normal system palettes.
- Install requirements are clarified for `app.asar` replacement builds.

All original Chia GUI pages remain available from the sidebar.

## Targets

- Official Chia Blockchain GUI: 2.7.1
- Provisional GigaHorse-compatible build: 2.7.0.giga37
- Windows local install
- Original project: https://github.com/Chia-Network/chia-blockchain

## Download

Official Chia 2.7.1 build:

https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.3-chia-2.7.1

SHA256:

`54E51D5FDDAD07AAEDE14A94FA31E225527867B5A0F300227C8C730F24C6119D`

GigaHorse 2.7.0.giga37 provisional build:

https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.1-gigahorse-2.7.0-giga37

SHA256:

`4170F60FECCF14CBC569CB16E570F3A31FE437AE1FF1DDC4BE4A819279903277`

GigaHorse 2.7.1.giga37 prerelease:

https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.3-gigahorse-2.7.1-giga37

SHA256:

`53F2C90378BADE46654B110DA8F55F0667FAA8040248211BDA467C052C5EF29F`

## Source Code

The release source is available in this repository on the source branch:

https://github.com/twinedge39-web/Akita-autumn_field_console/tree/akita-mod-source

The `main` branch is kept as a lightweight release and documentation branch.
See [docs/source.md](docs/source.md) for details.

## Install

See [docs/install.md](docs/install.md).

Short version:

1. Close Chia Blockchain.
2. Back up the original file:

   `C:\Users\<you>\AppData\Local\Programs\Chia\resources\app.asar`

3. Replace it with the downloaded modded `app.asar`.
4. Start Chia Blockchain.

This is not a standalone installer. The target installation must already have
the daemon payload next to the GUI bundle:

```txt
C:\Users\<you>\AppData\Local\Programs\Chia\resources\app.asar.unpacked\daemon
```

## GigaHorse Note

GigaHorse does not ship its own GUI. This provisional build follows the common approach of using a version-aligned Chia GUI bundle with GigaHorse services.

For GigaHorse use, install the matching GigaHorse build first, then replace
`resources\app.asar`. GigaHorse is not fully source-public in the same way as
this GUI tree, so this mod cannot guarantee complete GigaHorse behavior from
source inspection alone.

Basic GUI operation is expected when the service version matches the target
build. Advanced features such as DataLayer or other less-used Chia service
integrations are not fully verified with GigaHorse. Verify the installed result
on the target machine and keep a backup of the original `app.asar`.

## Restore

Restore the backed up `app.asar`, or reinstall/repair the official Chia app.

## Notice

This is an unofficial visual mod.
It is not affiliated with, maintained by, or endorsed by Chia Network or GigaHorse.

Use at your own risk. This mod is intended for local GUI customization.

Based on Chia Network's chia-blockchain GUI, licensed under Apache License 2.0.

