# Chia GUI Mod Component

## Concept

`Akita console - Autumn field` is a local visual and workflow mod for the Chia
GUI.

The goal is not to replace Chia's wallet, node, farming, plotting, offer, NFT,
or pool logic. The goal is to wrap the existing GUI in a calmer daily console:
one overview first, conventional navigation preserved, and an autumn-field
surface applied across the app.

## Component Shape

This mod is treated as a GUI component layer with three parts.

1. Preview sandbox
2. Real GUI style layer
3. Pack and install script

The preview sandbox runs in a browser with no daemon, wallet, keyring, or full
node connection. It is for checking layout, sidebar behavior, color, spacing,
and page rhythm before replacing the installed GUI.

The real GUI layer is built into Chia's renderer bundle. It keeps the original
feature pages and routes, then adds a new `Overview` front door for full node
mode.

The pack script builds an `app.asar` replacement that can be installed into the
local Chia application after review.

This is not a full installer. It assumes the target installation already has
the daemon payload next to the ASAR, typically:

```txt
resources\app.asar.unpacked\daemon
```

For GigaHorse use, install the matching GigaHorse build first, then replace
`resources\app.asar`. Because GigaHorse is not fully source-public here, the mod
cannot claim complete GigaHorse behavior from source inspection alone. Verify
the installed result on the target machine and keep the replacement reversible.

## Current Mod Surface

The current implementation adds or changes these areas.

- `Overview` screen at `/dashboard` in full GUI mode
- `Full Node` moved to `/dashboard/fullnode`
- Sidebar keeps ordinary labels such as `Wallets`, `NFTs`, `Offers`, `Full Node`,
  `Farm`, `Plots`, `Harvest`, `Pool`, `Tools`, and `Settings`
- Light theme changed toward field amber, deep green, pale frost blue, and warm
  console paper
- Dashboard app bar, drawer, sidebar item, card, button, and progress styling
  are adjusted globally
- Browser design sandbox can preview pages without touching live Chia services

## Design Rules

The mod should stay useful before it becomes decorative.

- Preserve every original feature route unless there is a deliberate migration
- Keep left navigation conventional enough that an existing Chia user can still
  find the old areas
- Put daily status and launch shortcuts in `Overview`
- Do not change wallet, daemon, plotting, farming, offer, NFT, or pool business
  logic as part of a visual pass
- Prefer shared theme and layout components over scattered one-off page edits
- Keep replacement reversible by preserving the original `app.asar` backup

## Local Commands

Run the no-daemon browser preview:

```powershell
cd E:\chia-blockchain-gui
npm run design:sandbox
```

Build the GUI bundle:

```powershell
cd E:\chia-blockchain-gui
npm run build:skipLocales
```

Create a mod `app.asar` without installing it:

```powershell
cd E:\chia-blockchain-gui
npm run pack:mod-gui -- -SkipBuild
```

Install the built mod into the local Chia app:

```powershell
cd E:\chia-blockchain-gui
powershell -ExecutionPolicy Bypass -File .\pack-mod-gui.ps1 -SkipBuild -Install
```

## Safety Notes

Installing the mod requires Chia to be closed because the installed `app.asar`
must be replaced.

The install script backs up the existing installed `app.asar` before replacing
it. Do not delete that backup until the modified GUI has launched successfully.

During full node sync, it is usually better to wait before replacing the GUI, so
the node can continue syncing without interruption.

Do not distribute the generated `app.asar` as a standalone GigaHorse
installation. It is a GUI replacement for an already working Chia/GigaHorse
install, and behavior can differ if the target daemon payload does not match
the intended build.

## Important Files

- `packages/gui/src/components/app/AppSandbox.tsx`
- `packages/gui/src/index-sandbox.tsx`
- `packages/gui/src/components/dashboard/DashboardOverview.tsx`
- `packages/gui/src/components/app/AppRouter.tsx`
- `packages/gui/src/components/dashboard/DashboardSideBar.tsx`
- `packages/core/src/theme/light.ts`
- `packages/core/src/components/LayoutDashboard/LayoutDashboard.tsx`
- `packages/core/src/components/SideBarItem/SideBarItem.tsx`
- `pack-mod-gui.ps1`

## Next Work

The next useful step is to make `Overview` read real Chia state after the full
node sync is usable:

- node sync state
- wallet balance summary
- farming status
- plot count
- latest block height
- offer and notification counts

Until then, the sandbox preview and installed GUI skin can evolve as a visual
component without requiring a dummy node.
