/* eslint-disable no-undef */
import WertWidget from "@wert-io/widget-initializer";
import { signSmartContractData } from "@wert-io/widget-sc-signer";
import { v4 as uuidv4 } from "uuid";

import { Buffer } from "buffer/";

window.Buffer = Buffer; // needed to use `signSmartContractData` in browser

/* We advise you not to use the private key on the frontend
    It is used only as an example
*/
if (window.ethereum) {
  (async () => {
    // Get user address
    const userAccounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const web3 = new Web3(window.ethereum);
    const userAddress = userAccounts[0];
    // Encode the call to mintNFT(address = userAddress, numberOfTokens = 1)
    const sc_input_data = web3.eth.abi.encodeFunctionCall(
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_twitterHandle",
            type: "string",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      [5, ""]
    );
    const privateKey =
      "0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3";
    // Create signed SC data for wert-widget
    // Please do this on backend
    // const sc_address='0x6b979aAa88cE214abC1a501A686D4AaA04612503'.toLocaleLowerCase()
    // console.log('sc_address', sc_address)
    console.log(sc_input_data);
    const signedData = signSmartContractData(
      {
        address: userAddress, // user's address
        commodity: "ETH",
        commodity_amount: "0.0005", // the crypto amount that should be send to the contract method
        pk_id: "key1", // always 'key1'
        sc_address: "0xb8a7623c6B10808354AE2d2236B406FFB5CBE6a6", // your SC address
        sc_id: uuidv4(), // must be unique for any request
        sc_input_data,
      },
      privateKey
    );
    const otherWidgetOptions = {
      partner_id: "01GCRJZ1P7GP32304PZCS6RSPD", // your partner id
      container_id: "widget",
      click_id: uuidv4(), // unique id of purhase in your system
      origin: "https://sandbox.wert.io", // this option needed only in sandbox
      width: 1400,
      height: 600,
    };
    console.log("signedData", signedData);
    //another problem I want to discuss that "I have a token 'MeetUsVR'
    const wertWidget = new WertWidget({
      ...signedData,
      ...otherWidgetOptions,
    });

    wertWidget.mount();
  })();
}
