"use client";
import { useSDK } from "@metamask/sdk-react";
import { Paper, Stack, Link, Typography, TextField, Button, Skeleton } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatAddress } from './../lib/utils';
import Web3 from "web3";

const bnbAbi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "unfreeze", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "freezeOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "freeze", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "decimalUnits", "type": "uint8" }, { "name": "tokenSymbol", "type": "string" }], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Freeze", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Unfreeze", "type": "event" }];
const bnbAdress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";

export default function Card() {
    const { sdk, connected, connecting } = useSDK();
    const [account, setAccount] = useState<string | null>(null);
    const [bnbBalance, setBnbBalance] = useState<number | null>(null);
    const [ethBalance, setEthBalance] = useState<number | null>(null);


    useEffect(() => {
        const connect = async () => {
            try {
                let accounts = await sdk?.connect();
                if (!accounts) return
                setAccount(accounts[0]);

                const web3 = new Web3(window.ethereum);
                const ethBalance = await web3.eth.getBalance(accounts[0]);
                setEthBalance(parseInt(ethBalance));


                const contract = new web3.eth.Contract(bnbAbi, bnbAdress);
                const bnbBalance = await contract.methods.balanceOf(accounts[0]).call();
                setBnbBalance(parseInt(bnbBalance))

            } catch (err) {
                console.warn(`No accounts found!!!`, err);
            }
        };
        connect();
    }, [sdk, setAccount]);


    return (
        <Paper elevation={3} sx={{ width: 'clamp( 350px, 100%,1333px)', minWidth: '350px' }}>
            <Stack direction={"column"} spacing={2} useFlexGap flexWrap="wrap" alignItems={"flex-start"} padding={2}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} alignSelf={"stretch"} flexWrap={'wrap'}>
                    {account ? <Typography variant="h6"> {formatAddress(account)}</Typography> : <Skeleton variant="rectangular" width={'150px'} height={'32px'} />}
                    <Stack direction={"row"} alignSelf={"stretch"} gap={2}>
                        <Link style={{ cursor: 'pointer' }} underline="always" variant="body1">Main</Link>
                        <Link style={{ cursor: 'pointer' }} underline="hover" variant="body1">Test</Link>
                    </Stack>
                </Stack>
                <Typography sx={{ display: 'flex', alignItems: "center", gap: 1 }} variant="body1">
                    <Image style={{ display: "inline" }} src='ethereum.svg' width={30} height={30} alt="ethereum icon" />
                    ETH: {(ethBalance != undefined) ? ethBalance : <Skeleton variant="rectangular" height={'18px'} width={'50px'} />}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: "center", gap: 1 }} variant="body1">
                    <Image style={{ display: "inline" }} src='bnb-svgrepo-com.svg' width={30} height={30} alt="ethereum icon" />
                    BNB: {(bnbBalance != undefined) ? bnbBalance : <Skeleton variant="rectangular" height={'18px'} width={'50px'} />}
                </Typography>
                <TextField fullWidth variant="outlined" label="Адрес транзакции" />
                <Button variant="contained">Отправить</Button>
            </Stack>
        </Paper>
    );
}