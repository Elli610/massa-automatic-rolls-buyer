import { Client, ClientFactory, ProviderType, IProvider, fromMAS, IRollsData, CHAIN_ID, IAccount, WalletClient } from "@massalabs/massa-web3"
import "dotenv/config";

if (!process.env.STAKER_PRIVATE_KEY || !process.env.PUBLIC_API || !process.env.PRIVATE_API) {
  throw new Error('Missing env variables')
}

const publicApi = process.env.PUBLIC_API;
const privateApi = process.env.PRIVATE_API;
const stakerPrivateKey = process.env.STAKER_PRIVATE_KEY;
const interval = Number(process.env.INTERVAL || 60 * 60 * 4); // 4 hours
const fee = (process.env.FEE || "0.01") === "0" ? "0.01" : (process.env.FEE || "0.01");
const chainId = CHAIN_ID.MainNet;


async function buyRolls(web3Client: Client, stakerWallet: IAccount) {
  // get staker balance
  const stakerBalance = stakerWallet.address ? await web3Client.wallet().getAccountBalance(stakerWallet.address) : 0n;

  if (stakerBalance && stakerBalance.final >= fromMAS(100) + fromMAS(fee)) {

    // sender buys some rolls
    const buyRollsTxId = await web3Client.wallet().buyRolls({
      amount: 1n,
      fee: fromMAS(fee),
    } as IRollsData)
    console.log('Buy Rolls Tx Id ', buyRollsTxId)
  }
}


(async () => {

  const stakerWallet: IAccount = await WalletClient.getAccountFromSecretKey(stakerPrivateKey);

  console.log('Staker Wallet ', stakerWallet.address)

  // init web3 client with base account
  const web3Client: Client = await ClientFactory.createCustomClient(
    [
      { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
      { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
    ],
    chainId,
    true,
    stakerWallet
  )

  await web3Client.wallet().addAccountsToWallet([stakerWallet])

  buyRolls(web3Client, stakerWallet);

  // check staker balance every "interval" seconds
  setInterval(async () => {
    buyRolls(web3Client, stakerWallet);
  }, interval * 1000)
})();

