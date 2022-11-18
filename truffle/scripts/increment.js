const Voting = artifacts.require("Voting");

module.exports = async function (callback) {
  const deployed = await Voting.deployed();

  const currentValue = (await deployed.read()).toNumber();
  console.log(`Current Voting value: ${currentValue}`);

  const { tx } = await deployed.write(currentValue + 1);
  console.log(`Confirmed transaction ${tx}`);

  const updatedValue = (await deployed.read()).toNumber();
  console.log(`Updated Voting value: ${updatedValue}`);

  callback();
};
