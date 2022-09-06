import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';

async function main() {
    const wsProvider = new WsProvider('ws://localhost:9944')
    const api = await ApiPromise.create({ provider: wsProvider })
    const keyring = new Keyring({ type: 'sr25519' })
    const alice = keyring.addFromUri('//Alice', { name: 'Alice' })
    const bob = keyring.addFromUri('//Bob', { name: 'Bob' })
    const charlie = keyring.addFromUri('//Charlie', { name: 'Charlie' })
    const dave = keyring.addFromUri('//Dave', { name: 'Dave' })
    const eve = keyring.addFromUri('//Eve', { name: 'Eve' })
    const ferdie = keyring.addFromUri('//Ferdie', { name: 'Ferdie' })

    for (var i = 0; i < 20_000; ++i) {
        const tx_hashes = await Promise.all([
            api.tx.system.remark(`${i}`).signAndSend(alice, { nonce: i }),
            api.tx.system.remark(`${i}`).signAndSend(bob, { nonce: i }),
            api.tx.system.remark(`${i}`).signAndSend(charlie, { nonce: i }),
            api.tx.system.remark(`${i}`).signAndSend(dave, { nonce: i }),
            api.tx.system.remark(`${i}`).signAndSend(eve, { nonce: i }),
            api.tx.system.remark(`${i}`).signAndSend(ferdie, { nonce: i }),
        ])
        console.log(`${i}: ${tx_hashes}`)
    }
}

main()
