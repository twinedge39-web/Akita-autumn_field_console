# Akita Autumn Field Console

Unofficial Chia GUI visual mod: Akita Console - Autumn Field theme for Chia.

This package replaces the Electron GUI bundle `app.asar`.
It keeps the original Chia GUI functions and changes the visual layout/theme.

## Preview

![Akita Autumn Field Console](Screenshots/akita-autumn-field-console.png)

## Status

Current release: `v0.2.1`.

The v0.2.1 update focuses on NFT view behavior:

- NFT full-screen preview opens consistently, including NFTs whose visible image comes from preview metadata.
- Full-screen preview fits the image inside the dialog without cropping.

All original Chia GUI pages remain available from the sidebar.

## Targets

- Official Chia Blockchain GUI: 2.7.1
- Provisional GigaHorse-compatible build: 2.7.0.giga37
- Windows local install
- Original project: https://github.com/Chia-Network/chia-blockchain

## Download

Official Chia 2.7.1 build:

https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.1-chia-2.7.1

SHA256:

`3820F8FFD24711C5E26C08A454588B3212F10F8AA771BA30E61B4E3AD8EAE9DC`

GigaHorse 2.7.0.giga37 provisional build:

https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.1-gigahorse-2.7.0-giga37

SHA256:

`4170F60FECCF14CBC569CB16E570F3A31FE437AE1FF1DDC4BE4A819279903277`

## Source Code

The release source is available in this repository on the source branch:

https://github.com/twinedge39-web/Akita-autumn_field_console/tree/akita-nft-preview-dialog

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
