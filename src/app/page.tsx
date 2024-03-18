'use client';
import { Box, Container } from "@mui/material";
import Card from './../components/Card';
import { MetaMaskProvider } from '@metamask/sdk-react';

const host =
  typeof window !== "undefined" ? window.location.href : "defaultHost";

const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Next-Metamask-Boilerplate",
    url: host, // using the host constant defined above
  },
};

export default function Home() {
  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      <Container sx={{ padding: 10, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', display: "flex" }} maxWidth={false}>
        <Card />
      </Container>
    </MetaMaskProvider>
  );
}
