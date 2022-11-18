import { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import logo from "../assets/votinglogo.png"
import { FaEthereum } from 'react-icons/fa';



function Header({status, setStatus}) {
    const { state: { contract, accounts, artifact, owner } } = useEth();

    let connectedAccount = ""; 
    let connectedAccountSlice = ""; 
    let owned = false; 

    if (artifact || contract || accounts) {
        connectedAccount = accounts[0]; 
        const formatETHAddress = function(s, size = 4) {;
            var first = s.slice(0, size + 1);
            var last = s.slice(-size);
            return first + "..." + last;
        }
        connectedAccountSlice = formatETHAddress(connectedAccount)
    }

    let displayStatus = [
        "Registering Voters", 
        "Proposals Registration Started", 
        "Proposals Registration Ended",
        "Voting Session Started",
        "Voting Session Ended", 
        "Votes Tallied"
    ]
        
    
    if ( accounts && accounts[0] == owner) {
        owned = true; 
    }
    

    useEffect(() => {
        async function setup() {
              try {

                if (artifact || contract || accounts) {
                    let status = await contract.methods
                          .state()
                          .call();
                    setStatus(status);
                    connectedAccount = accounts[0]; 

                    

                    let pourcentage = status * 20; 
                    document.querySelector('.progress').style.width = `${pourcentage}%`
                }
              } catch (error) {
                    alert(
                          `Failed to load web3, accounts, or contract. Check console for details.`
                    );
                    console.error(error);
              }
        }
        setup();
  });


    return (
        <header className="header">
            {
                owned ? (
                <div className="account">
                    <h4> <FaEthereum/> CONNECTED ACCOUNT: <span className="currentaccount">{connectedAccountSlice} (owner) </span>  </h4>
                </div>
                ) : (
                <div className="account">
                    <h4> <FaEthereum/> CONNECTED ACCOUNT: <span className="currentaccount">{connectedAccountSlice}</span></h4>
                </div>
                )
            }
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="status">
                <div className="statuscontainer">
                    <h4>CURRENT STATUS: {status}/5, <span className="currentstatus">{displayStatus[status]}</span> </h4>
                    <div className="progressbar">
                        <div className="progress"> </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;