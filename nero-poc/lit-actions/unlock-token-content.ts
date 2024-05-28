const code = `(async () => {
  const testResult = await Lit.Actions.checkConditions({conditions, authSig, chain})

  console.log('testResult', testResult)

  if (!testResult){
    return;
  }

  const resp = await fetch(url).then((response) => response.json()); // json gives us the ciphertext and hash for data

  
  // hidden endpoint
  const data = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: resp.ciphertext,
    dataToEncryptHash: resp.dataToEncryptHash,
    authSig: null,
    chain,
  });
  
  Lit.Actions.setResponse({response: data});
})();`;

export default code;