const code = `(async () => {

  const resp = await fetch(url).then((response) => response.json()); // json gives us the ciphertext and hash for data

  const data = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
          chain: "sepolia",
          ciphertext: resp.ciphertext,
          dataToEncryptHash: resp.dataToEncryptHash,
          authSig,
          sessionSigs
  });
  
  Lit.Actions.setResponse({response: data});
})()`;

export default code;