import ipfsClient from "ipfs-http-client";

export const ipfs = new ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});