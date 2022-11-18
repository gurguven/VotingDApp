import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect} from "react";


function Voters() {
    const { state: { contract, accounts, artifact } } = useEth();


    let voters = []; 

    const getVoters = async () => {
        let options = {
            fromBlock: 0,
            toBlock: 'latest',
        };
      const allAddresses = (await contract.getPastEvents('VoterRegistered', options))
      .map((prop) => prop.returnValues.voterAddress);

      allAddresses.forEach(_addr => {
        console.log("THERE IS ONE VOTER = " + _addr)
        voters.push(_addr); 
        console.log(voters)
      })
    }   

    // voters.map( (prop) => {
    //     return  (
    //     <tr key={prop._id} className="proposalline">
    //         <td className="proposal">{prop._id} : {prop.description}</td>
    //     </tr>
    //     )
    // })


    useEffect( 
        () => {
            if(artifact || contract || accounts) {
                getVoters();
            }
        },
        [contract]
    );


    return (
        <div className="votersarray">
            


        </div>
    )
}

export default Voters