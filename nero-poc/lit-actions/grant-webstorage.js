const code = `(async () => {
  
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
})();`;

export default code;