import useEth from "../contexts/EthContext/useEth";

function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer">{text}</a>;
}

function Footer() {
  const { state: { address } } = useEth();
  return (
    <footer>
      {/* <h2>More resources</h2> */}
      <div className="links">
        <Link uri={"https://github.com/gurguven"} text={"My GitHub"} />
        <Link uri={"https://trufflesuite.com"} text={"Truffle"} />
        <Link uri={"https://reactjs.org"} text={"React"} />
        <Link uri={"https://soliditylang.org"} text={"Solidity"} />
        <Link uri={"https://ethereum.org"} text={"Ethereum"} />
        <Link uri={`https://goerli.etherscan.io/address/${address}`} text={"Smart Contract"} />
        <h3>Voting DApp | 2022</h3>
      </div>
    </footer >
  );
}

export default Footer;
