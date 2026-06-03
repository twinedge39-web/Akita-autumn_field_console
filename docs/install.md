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

## Restore

Close Chia Blockchain, restore the backed up `app.asar`, then start Chia Blockchain again.
