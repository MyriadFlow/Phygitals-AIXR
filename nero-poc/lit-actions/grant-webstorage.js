(async () => {
  const testResult = await Lit.Actions.checkConditions({conditions, authSig, chain})

  console.log('testResult', testResult)

  // only grant storage request (3 minutes) to the DID if they pass the conditional checks of our code
  if (!testResult){
    return;
  }

  // hidden endpoint
  const url = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext,
    dataToEncryptHash,
    authSig: null,
    chain,
  });
  
  // hidden api key
  const apiKey = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: apiciphertext,
    dataToEncryptHash: apidatatoencrypthash,
    authSig: null,
    chain,
  }); 

  const resp = await fetch(url, {method: "POST", body: {did}, authorization: apiKey}).then((response) => response.json());

  console.log('called endpoint using api key and received delegation response');
  
  Lit.Actions.setResponse({response: resp});
})();