import { Flex, useMode, Mode, useDarkMode } from '@chia-network/core';
import { WalletConnections, WalletStatus, WalletReceiveAddressField } from '@chia-network/wallets';
import { Trans } from '@lingui/macro';
import { Box, ButtonGroup, Button, Popover, PopoverProps } from '@mui/material';
import { useTheme, styled, alpha } from '@mui/material/styles';
import React, { useState } from 'react';

import Connections from '../fullNode/FullNodeConnections';
import FullNodeStateIndicator from '../fullNode/FullNodeStateIndicator';
import NotificationsDropdown from '../notification/NotificationsDropdown';
import WalletConnectDropdown from '../walletConnect/WalletConnectDropdown';

import AppTestnetIndicator from './AppTestnetIndicator';
import LogoutButton from './LogoutButton';

const StyledPopover = styled((props: PopoverProps) => <Popover {...props} />)(({ theme }) => ({
  '& .MuiPopover-paper': {
    borderRadius: '8px',
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.text.primary,
    border: `1px solid ${(theme.palette as any).border?.[theme.palette.mode === 'dark' ? 'dark' : 'main'] ?? alpha(theme.palette.text.primary, 0.14)}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      theme.palette.mode === 'dark'
        ? `0 18px 40px ${alpha('#000', 0.34)}`
        : `0 18px 40px ${alpha(theme.palette.text.primary, 0.12)}`,
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function AppStatusHeader() {
  const theme = useTheme();
  const { isDarkMode } = useDarkMode();
  const borderColor = (theme.palette as any).border[isDarkMode ? 'dark' : 'main'];
  const akita = theme.palette.akita;
  const ButtonGroupStyle = {
    minHeight: '42px',
  };
  const ButtonStyle = {
    paddingTop: '3px',
    paddingBottom: 0,
    paddingLeft: '3px',
    borderRadius: 2,
    border: `1px solid ${borderColor}`,
    '&:hover': {
      border: `1px solid ${borderColor}`,
    },
    whiteSpace: 'nowrap',
    '.cancel-icon': {
      g: {
        circle: {
          stroke: akita.disconnected,
          fill: akita.disconnected,
        },
      },
    },
    '.checkmark-icon': {
      g: {
        circle: {
          stroke: akita.connected,
          fill: akita.connected,
        },
        path: {
          stroke: akita.connected,
          fill: akita.connected,
        },
      },
    },
    '.reload-icon': {
      g: {
        circle: {
          stroke: akita.attention,
          fill: akita.attention,
        },
        path: {
          fill: akita.attention,
        },
      },
    },
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  };

  const [mode] = useMode();

  const [anchorElFN, setAnchorElFN] = useState<HTMLButtonElement | null>(null);
  const [anchorElW, setAnchorElW] = useState<HTMLButtonElement | null>(null);

  const handleClickFN = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElFN(event.currentTarget);
  };

  const handleCloseFN = () => {
    setAnchorElFN(null);
  };

  const handleClickW = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElW(event.currentTarget);
  };

  const handleCloseW = () => {
    setAnchorElW(null);
  };

  return (
    <Flex flexGrow={1} gap={2} flexWrap="wrap" alignItems="center">
      <AppTestnetIndicator />
      <WalletReceiveAddressField variant="outlined" size="small" fullWidth isDarkMode={isDarkMode} />
      <Flex flexGrow={1} gap={2} alignItems="center" justifyContent="space-between">
        <ButtonGroup variant="outlined" color="secondary" size="small" sx={ButtonGroupStyle}>
          {mode === Mode.FARMING && (
            <>
              <Button onClick={handleClickFN} aria-describedby="fullnode-connections" sx={ButtonStyle}>
                <Flex gap={1} alignItems="center">
                  <FullNodeStateIndicator />
                  <Trans>Full Node</Trans>
                </Flex>
              </Button>
              <StyledPopover
                open={!!anchorElFN}
                anchorEl={anchorElFN}
                onClose={handleCloseFN}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Box sx={{ minWidth: 800 }}>
                  <Connections />
                </Box>
              </StyledPopover>
            </>
          )}
          <Button onClick={handleClickW} sx={ButtonStyle}>
            <Flex gap={1} alignItems="center">
              <WalletStatus indicator hideTitle />
              <Trans>Wallet</Trans>
            </Flex>
          </Button>
          <StyledPopover
            open={!!anchorElW}
            anchorEl={anchorElW}
            onClose={handleCloseW}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{ minWidth: 800 }}>
              <WalletConnections walletId={1} />
            </Box>
          </StyledPopover>
        </ButtonGroup>
        <Flex gap={0.5} alignItems="center">
          <WalletConnectDropdown />
          <NotificationsDropdown />
          <LogoutButton />
        </Flex>
      </Flex>
    </Flex>
  );
}
