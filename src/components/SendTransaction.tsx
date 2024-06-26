import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC, useCallback } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { notify } from "../utils/notifications";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';


export const SendTransaction: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const addMiner = async (address: any, nullifier_hash: any) => {
		//const address2 = address;
		console.log("Address:aaa", address);
		const response = await fetch('../api/addAccount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ accountname: 'majime_sol', address1: address, address2: 'AKVnGM579uT13CFdaxjdYmg7JEWv9z27pMtiDsRtT9cZ', address3: 'FY8RyunNS3ctpGsziRpkorgiQpGbdxJLcVnudUjKYTrK'}),
		});

		if (!response.ok) { throw new Error('Something went wrong.'); }

		const data = await response.json();
		//setMiners(prevMiners => [...prevMiners, data]);
	}

    const onClick = useCallback(async () => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        // const pubKey = new PublicKey("7BzGMomgbswT6ynUmbkqA2mh2h9oGNgfKwfR2GrEmvRT");
        let signature: TransactionSignature = '';
        try {
            const destAddress = Keypair.generate().publicKey;
            console.log(publicKey.toBase58());
            addMiner(publicKey.toBase58(), 'testing');
            console.log('test')

            // anything below this will fail, as this would be below the rent-exemption rate.
            /*
            const amount = 1_000_000;

            console.log(amount);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: destAddress,
                    lamports: amount,
                })
            );*/

            //signature = await sendTransaction(transaction, connection);

            //await connection.confirmTransaction(signature, 'confirmed');

            notify({ type: 'success', message: 'Transaction successful!', txid: signature });
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);
    

    return (
        <div>

            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Register
                </span>
            </button>

        </div>
    );
};
