# Install

Akita Autumn Field Console is distributed as an `app.asar` replacement for the Chia Electron GUI.

## Chia 2.7.1

Download:
https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.1-chia-2.7.1

Expected SHA256:

```txt
3820F8FFD24711C5E26C08A454588B3212F10F8AA771BA30E61B4E3AD8EAE9DC
```

## GigaHorse 2.7.0.giga37

Download:
https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.1-gigahorse-2.7.0-giga37

Expected SHA256:

```txt
4170F60FECCF14CBC569CB16E570F3A31FE437AE1FF1DDC4BE4A819279903277
```

## GigaHorse 2.7.1.giga37 Prerelease

Download:
https://github.com/twinedge39-web/Akita-autumn_field_console/releases/tag/v0.2.3-gigahorse-2.7.1-giga37

Expected SHA256:

```txt
53F2C90378BADE46654B110DA8F55F0667FAA8040248211BDA467C052C5EF29F
```

## Windows Replacement Steps

1. Close Chia Blockchain.
2. Open this folder:

   ```txt
   C:\Users\<you>\AppData\Local\Programs\Chia\resources
   ```

3. Back up the existing file:

   ```txt
   app.asar
   ```

4. Copy the downloaded Akita `app.asar` into the same folder.
5. Rename it to exactly:

   ```txt
   app.asar
   ```

6. Start Chia Blockchain.

## Requirement

This package is an `app.asar` replacement only. It is not a full Chia or
GigaHorse installer.

Before replacing `app.asar`, confirm the target install already has:

```txt
C:\Users\<you>\AppData\Local\Programs\Chia\resources\app.asar.unpacked\daemon
```

The GUI starts the local daemon from that unpacked payload. If the target
machine only has the downloaded Akita `app.asar`, it is incomplete.

For GigaHorse use, install the matching GigaHorse build first, then replace
`resources\app.asar`. Because GigaHorse is not fully source-public in this GUI
tree, this mod cannot guarantee complete GigaHorse behavior from source
inspection alone. Verify the result on the target machine.

## Restore

Close Chia Blockchain, restore the backed up `app.asar`, then start Chia Blockchain again.
