const code = `(async () => {
  // const testResult = await Lit.Actions.checkConditions({accessControlConditions, authSig})

  // console.log('testResult', testResult)

  // if (!testResult){
  //   Lit.Actions.setResponse({response: 'failed'})
  //   return;
  // }

  const resp = await fetch(url).then((response) => response.json()); // json gives us the ciphertext and hash for data

  console.log('hello, world');
  console.log(resp);
  // // hidden endpoint
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