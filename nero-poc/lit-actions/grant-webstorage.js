(async () => {
  const url = "https://<uri>/storage";
  const resp = await fetch(url).then((response) => response.json());
  const temp = resp.properties.periods[0].temperature;

  const temperatures = await Lit.Actions.broadcastAndCollect({
    name: "temperature",
    value: temp,
  });

  // at this point, temperatures is an array of all the values that all the nodes got
  const median = temperatures.sort()[Math.floor(temperatures.length / 2)];
  Lit.Actions.setResponse({response: median});
})();