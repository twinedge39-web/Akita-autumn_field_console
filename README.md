# Akita Autumn Field Console

Unofficial Chia GUI visual mod: Akita Console - Autumn Field theme for Chia.

This package replaces the Electron GUI bundle `app.asar`.
It keeps the original Chia GUI functions and changes the visual layout/theme.

## Preview

![Akita Autumn Field Console](Screenshots/akita-autumn-field-console.png)

## Status

The new Overview screen now includes live summary cards for the standard wallet
balance, full node sync/peer state, recent farming attempts, and plot/harvester
summary.

All original Chia GUI pages remain available from the sidebar.
The sidebar has also been tightened so the full navigation fits better on a
Full HD monitor.

## Targets

- Official Chia Blockchain GUI: 2.7.1
- Provisional GigaHorse-compatible build: 2.7.0.giga37
- Windows local install
- Original project: https://github.com/Chia-Network/chia-blockchain

## Download

Official Chia 2.7.1 build:

https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.0-chia-2.7.1

SHA256:

`EB22690C90466548ECF3C62BE8C293243E7688525F7CC24B6B6D345BD1E8C0F2`

GigaHorse 2.7.0.giga37 provisional build:

https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.0-gigahorse-2.7.0-giga37

SHA256:

`9778B3F29BA42536EE4DFC3A14AAD0B66739C146663650AAB2FDD29A84CF0073`

## Install

1. Close Chia Blockchain.
2. Backup the original file:

   `C:\Users\<you>\AppData\Local\Programs\Chia\resources\app.asar`

3. Replace it with the modded `app.asar`.
4. Start Chia Blockchain.

## GigaHorse Note

GigaHorse does not ship its own GUI. This provisional build follows the common approach of using a version-aligned Chia GUI bundle with GigaHorse services.

Basic GUI operation is expected when the service version matches `2.7.0.giga37`.
Advanced features such as DataLayer or other less-used Chia service integrations are not fully verified with GigaHorse.

## Restore

Restore the backed up `app.asar`, or reinstall/repair the official Chia app.

## Notice

This is an unofficial visual mod.
It is not affiliated with, maintained by, or endorsed by Chia Network or GigaHorse.

Use at your own risk. This mod is intended for local GUI customization.

Based on Chia Network's chia-blockchain GUI, licensed under Apache License 2.0.
