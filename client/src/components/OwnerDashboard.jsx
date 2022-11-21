import { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth"
import {GrFormNextLink} from  'react-icons/gr'

function OwnerDashboard({status, setStatus}) {
  const { state: { contract, artifact, accounts, owner } } = useEth();
  const [inputWallet, setInputWallet] = useState("");
  const [addresses, setAddresses] = useState([]);

    // AUTHORIZE
    const authorize = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputWallet === "") {
          alert("Please enter a value to write.");
          return;
        }
        const newAddress = inputWallet;
        await contract.methods.authorize(newAddress).send({ from: accounts[0] });
        await getVoters(); 
        setInputWallet(""); 
    }  

    // CHANGE STATUS
    const changeStatus = async e => {
        await contract.methods.changeStatus().send({ from: accounts[0] });
        await getStatus(); 
    }

    //   GET STATUS 
    const getStatus = async () => {
        status = await contract.methods.state().call({ from: accounts[0] });
        setStatus(status)
    };

    const handleInputWallet = e => {
        setInputWallet(e.target.value);
    };

    // VERIFICATIONS

    let isDeployer = false; 
    let isFinished = false; 
    let registrationIsOpen = true; 

    if (owner == accounts ) {
      isDeployer = true;
    } else {
      isDeployer = false;
    }

    if (status > 0) {
        registrationIsOpen = false
    }
    if (status == 5) {
        isFinished = true
    }

    // VOTERS LIST 
    const getVoters = async () => {
        let options = {
            fromBlock: 0,
            toBlock: 'latest',
        };

      
        let _voters = []; 


      const allAddresses = (await contract.getPastEvents('VoterRegistered', options))
      .map((prop) => prop.returnValues.voterAddress);

      allAddresses.forEach(_addr => {
        console.log("THERE IS ONE VOTER = " + _addr)
        _voters.push(_addr); 
        
        })
        setAddresses(_voters)
    }   

    useEffect( 
        () => {
            if(artifact || contract || accounts) {
                getVoters();
                console.log("wewee")
            }
        },
        [contract]
    );

    const formatETHAddress = function(s, size = 4) {;
        var first = s.slice(0, size + 2);
        var last = s.slice(-size);
        return first + "..." + last;
    }

    const voterslist = addresses.map((voter) =>
        <li className="voter">{formatETHAddress(voter)}</li>
    );

    const empty = <></>

    const ownerDashboard = 
    <>
    <div className="ownerdashboard">
        <div className="dashboardheader">
            
            <h3>OWNER DASHBOARD</h3>
        </div>
        {
            registrationIsOpen ? (
                    <div className="dashboardbtns">
                            <div className="input-btn" onClick={authorize}>
                                <p>AUTHORIZE</p> 
                                <input
                                className="inputwallet"
                                type="text"
                                placeholder="address"
                                value={inputWallet}
                                onChange={handleInputWallet}
                                />
                            </div>

                            <button onClick={changeStatus}>
                                 NEXT STATUS <GrFormNextLink/>
                            </button>
                    </div>
                ) : (
                <div className="dashboardbtns">
                    <button onClick={changeStatus}>
                         NEXT STATUS <GrFormNextLink/>
                    </button>
                </div>
            )
        }
        {

            addresses.length > 0 ? (
            <div className="voters">
                <h4>Voters</h4>
                <div className="votersarray">
                    {
                    <ul>{voterslist}</ul>
                    }
                </div>
            </div>

            ) : (
                empty
            )

        
        }

    </div>        
    </>;

    return (
        isDeployer && !isFinished ? (
            ownerDashboard
        ) : isFinished ? (
            empty
        ) : (
            empty
        )
    )
}

export default OwnerDashboard; 
