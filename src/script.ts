import { Interface } from "ethers";
let userAddress = "0x66F9Ec7dDeD636e182efC1df023810Cf1a1D6148";

let ABI = [
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "mintToAddress",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

let iface = new Interface(ABI);

const sc_input_data = iface.encodeFunctionData("mintToAddress", [userAddress]);

console.log(sc_input_data);
