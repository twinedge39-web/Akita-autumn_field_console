import {
  useGetBlockchainStateQuery,
  useGetFullNodeConnectionsQuery,
  useGetNewFarmingInfoQuery,
  useGetTotalHarvestersSummaryQuery,
} from '@chia-network/api-react';
import {
  FormatBytes,
  FormatLargeNumber,
  mojoToChiaLocaleString,
  useCurrencyCode,
  useLocale,
} from '@chia-network/core';
import {
  AccountBalanceWallet,
  Agriculture,
  BlurOn,
  BuildOutlined,
  Contacts,
  FactCheck,
  GridView,
  Hub,
  Inventory2,
  LocalOffer,
  Settings,
} from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardContent, Chip, LinearProgress, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import useStandardWallet from '../../hooks/useStandardWallet';

const quickStatus = [
  { label: 'Wallets', value: 'Ready', detail: 'Balances, send, receive, transactions', to: '/dashboard/wallets', icon: AccountBalanceWallet },
  { label: 'Full Node', value: 'Chain', detail: 'Sync, peers, block inspection', to: '/dashboard/fullnode', icon: Hub },
  { label: 'Farm', value: 'Active', detail: 'Farming status and rewards', to: '/dashboard/farm', icon: Agriculture },
  { label: 'Plots', value: 'Inventory', detail: 'Plot count, size, and add flow', to: '/dashboard/plot', icon: BlurOn },
];

const preservedAreas = [
  { label: 'NFTs', detail: 'Gallery and detail pages', to: '/dashboard/nfts', icon: GridView },
  { label: 'Offers', detail: 'Create, import, inspect, manage', to: '/dashboard/offers', icon: LocalOffer },
  { label: 'Credentials', detail: 'Verifiable credentials', to: '/dashboard/vc', icon: FactCheck },
  { label: 'Contacts', detail: 'Address book', to: '/dashboard/addressbook', icon: Contacts },
  { label: 'Harvest', detail: 'Harvester overview', to: '/dashboard/harvest', icon: Inventory2 },
  { label: 'Pool', detail: 'Pooling controls', to: '/dashboard/pool', icon: Inventory2 },
  { label: 'Tools', detail: 'Logs and diagnostics', to: '/dashboard/chiatools', icon: BuildOutlined },
  { label: 'Settings', detail: 'Preferences and services', to: '/dashboard/settings/general', icon: Settings },
];

function AkitaCard(props: {
  label: string;
  value?: React.ReactNode;
  detail: React.ReactNode;
  to: string;
  icon: React.ElementType;
  progress?: number;
}) {
  const { label, value, detail, to, icon: Icon, progress } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardActionArea onClick={() => navigate(to)} sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box minWidth={0}>
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
              {value && (
                <Typography variant="h5" fontWeight={800} sx={{ mt: 0.25 }}>
                  {value}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 1,
                display: 'grid',
                placeItems: 'center',
                color: theme.palette.primary.main,
                background: alpha(theme.palette.primary.main, 0.13),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.28)}`,
                flexShrink: 0,
              }}
            >
              <Icon fontSize="small" />
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            {detail}
          </Typography>
          {progress !== undefined && (
            <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 4 }} />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function useFormattedXCHBalance() {
  const { wallet, walletBalance, loading, error } = useStandardWallet();
  const currencyCode = (useCurrencyCode() ?? 'XCH').toUpperCase();
  const [locale] = useLocale();

  if (loading) {
    return {
      value: 'Loading',
      detail: 'Reading standard wallet balance',
    };
  }

  if (error) {
    return {
      value: 'Unavailable',
      detail: 'Wallet balance service did not respond',
    };
  }

  if (!wallet) {
    return {
      value: 'No wallet',
      detail: 'Standard wallet is not available',
    };
  }

  if (!walletBalance) {
    return {
      value: 'Pending',
      detail: 'Waiting for balance data',
    };
  }

  const confirmed = mojoToChiaLocaleString(walletBalance.confirmedWalletBalance ?? 0, locale);
  const spendable = mojoToChiaLocaleString(walletBalance.spendableBalance ?? 0, locale);

  return {
    value: `${confirmed} ${currencyCode}`,
    detail: `Spendable ${spendable} ${currencyCode}`,
  };
}

function useFormattedFullNodeStatus() {
  const { data: state, isLoading, error } = useGetBlockchainStateQuery(
    {},
    {
      pollingInterval: 10_000,
    },
  );
  const { data: connections = [], isLoading: isLoadingConnections } = useGetFullNodeConnectionsQuery();
  const sync = state?.sync;

  if (isLoading) {
    return {
      value: 'Loading',
      detail: 'Reading full node status',
    };
  }

  if (error) {
    return {
      value: 'Unavailable',
      detail: 'Full node service did not respond',
    };
  }

  if (sync?.syncMode) {
    return {
      value: 'Syncing',
      detail: (
        <>
          Height <FormatLargeNumber value={sync.syncProgressHeight} /> / <FormatLargeNumber value={sync.syncTipHeight} />
        </>
      ),
    };
  }

  const peers = isLoadingConnections ? 'peers loading' : `${connections.length} peers`;
  const peakHeight = state?.peak?.height;

  return {
    value: sync?.synced ? 'Synced' : 'Not synced',
    detail:
      peakHeight === undefined ? (
        peers
      ) : (
        <>
          Peak <FormatLargeNumber value={peakHeight} /> · {peers}
        </>
      ),
  };
}

function useFormattedPlotStatus() {
  const { plots, totalPlotSize, harvesters, initializedHarvesters, isLoading, error } =
    useGetTotalHarvestersSummaryQuery();

  if (isLoading) {
    return {
      value: 'Loading',
      detail: 'Reading harvester summary',
    };
  }

  if (error) {
    return {
      value: 'Unavailable',
      detail: 'Harvester summary did not respond',
    };
  }

  return {
    value: (
      <>
        <FormatLargeNumber value={plots} /> plots
      </>
    ),
    detail: (
      <>
        <FormatBytes value={totalPlotSize} precision={3} /> · {initializedHarvesters}/{harvesters} harvesters
      </>
    ),
  };
}

function useFormattedFarmStatus() {
  const { data, isLoading, error } = useGetNewFarmingInfoQuery();

  if (isLoading) {
    return {
      value: 'Loading',
      detail: 'Reading recent farming attempts',
    };
  }

  if (error) {
    return {
      value: 'Unavailable',
      detail: 'Farming info did not respond',
    };
  }

  const latest = data?.newFarmingInfo?.[0];

  if (!latest) {
    return {
      value: 'No attempts',
      detail: 'No recent plot filter attempts found',
    };
  }

  return {
    value: latest.proofs > 0 ? 'Proof found' : 'Checking plots',
    detail: `${latest.passedFilter} / ${latest.totalPlots} plots passed filter`,
  };
}

export default function DashboardOverview() {
  const theme = useTheme();
  const xchBalance = useFormattedXCHBalance();
  const fullNodeStatus = useFormattedFullNodeStatus();
  const plotStatus = useFormattedPlotStatus();
  const farmStatus = useFormattedFarmStatus();
  const liveStatusByLabel: Record<string, { value: React.ReactNode; detail: React.ReactNode }> = {
    Wallets: xchBalance,
    'Full Node': fullNodeStatus,
    Farm: farmStatus,
    Plots: plotStatus,
  };
  const statusCards = quickStatus.map((item) => ({
    ...item,
    ...liveStatusByLabel[item.label],
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 360px' },
          gap: 2,
          mb: 2,
        }}
      >
        <Card variant="outlined">
          <CardContent sx={{ p: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Akita console - Autumn field
            </Typography>
            <Typography variant="h4" fontWeight={900} sx={{ mt: 0.5 }}>
              Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mt: 1 }}>
              Daily Chia checks in one quiet console: wallet, node, farm, plots, offers, NFTs, pool, tools, and
              settings remain one click away.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Chip label="all original functions preserved" size="small" color="primary" variant="outlined" />
              <Chip label="overview first" size="small" />
              <Chip label="autumn field skin" size="small" />
            </Box>
          </CardContent>
        </Card>

        <Box
          sx={{
            position: 'relative',
            minHeight: 190,
            overflow: 'hidden',
            borderRadius: 1,
            border: `1px solid ${alpha('#473a24', 0.14)}`,
            backgroundImage: [
              'linear-gradient(180deg, rgba(193, 177, 123, 0.74) 0%, rgba(239, 214, 137, 0.58) 44%, rgba(176, 119, 45, 0.52) 100%)',
              'repeating-linear-gradient(112deg, rgba(126, 92, 32, 0.62) 0 10px, rgba(226, 179, 69, 0.8) 10px 24px, rgba(118, 82, 38, 0.28) 24px 30px)',
            ].join(','),
          }}
        >
          <Box sx={{ position: 'absolute', left: 20, right: 20, bottom: 18, color: '#fff7de' }}>
            <Typography variant="overline" sx={{ opacity: 0.86 }}>
              Autumn field monitor
            </Typography>
            <Typography variant="h6" fontWeight={900}>
              North valley rows online
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, mb: 2 }}>
        {statusCards.map((item, index) => (
          <AkitaCard key={item.label} {...item} progress={38 + index * 16} />
        ))}
      </Box>

      <Card variant="outlined">
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Preserved areas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The overview adds a front door; the original pages stay intact.
              </Typography>
            </Box>
            <Button variant="contained" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Top
            </Button>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 1.5 }}>
            {preservedAreas.map((item) => (
              <AkitaCard key={item.label} {...item} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
