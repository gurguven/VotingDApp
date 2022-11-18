import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect} from "react";
import {AiFillTrophy} from 'react-icons/ai'

function ProposalArray({status}) {
    const { state: { contract, accounts, artifact, address } } = useEth();
    console.log(address)

    const [proposals, setProposals] = useState([]);
    const [inputProposal, setInputProposal] = useState("");
    const [ winningProposal, setWinningProposal ] = useState(null);
    const [ winningProposalDesc, setWinningProposalDesc ] = useState(null);
    const [ winningVotes, setWinningNbVotes ] = useState(0);
    const [winningPourc, setWinningPourc] = useState(); 
    const [totaL, setTotal] = useState(0); 


    let total = 0;
    let proposalCopy = proposals 
    proposalCopy?.forEach(element => {
        if (element.voteCount != 0) {
            total += parseInt(element.voteCount); 
        }
    })

    const getPourcentage = (_winningvotes) => {
        let totalito = total; 
        let pourcentage = Math.floor(_winningvotes / totalito * 100)
        console.log(pourcentage)
        setWinningPourc(pourcentage)
    }



// GESTION DU WORKFLOW STATUS // 
    let registrationIsOpen = true; 
    let proposalIsOpen = false;
    let proposalClosed = false; 
    let voteIsOpen = false; 
    let voteIsClosed = false; 
    let votesTallied = false;  


// DETECTION DE LA PROPOSITION GAGNANTE
    const getWinner = async () => {
        if (artifact || contract || accounts) {
            const winnerId = await contract.methods.getWinner().call(); 
            setWinningProposal(winnerId); 
            const winningDesc = await proposals[winnerId].description; 
            // console.log(winningDesc)
            setWinningProposalDesc(winningDesc)
            const winnerVoteCount = await proposals[winnerId].voteCount
            setWinningNbVotes(winnerVoteCount)

            // if (total) {
            //     let winningPourcentage = Math.floor(winnerVoteCount / totaL  * 100) 
            //     console.log(winningPourcentage)
            // }



            document.querySelectorAll(".proposalline")[winnerId].classList.add('winner')
            getPourcentage(winnerVoteCount)
        } 
    }

    if (status == 1) {
        registrationIsOpen = false; 
        proposalIsOpen = true; 
    } else if (status == 2) {
        proposalClosed = true;
    } else if (status == 3) {
        proposalIsOpen = false; 
        voteIsOpen = true; 
    } else if (status == 4) {
        voteIsOpen = false; 
        voteIsClosed = true 
    } else if (status == 5) {
        votesTallied = true; 
        if (artifact || contract || accounts) {
            getWinner(); 
        }
    } else {
        proposalIsOpen = false; 
        voteIsOpen = false; 
        votesTallied = false; 
    }

   

    const test = 
    <>
        <div>

        </div>
    </>

    async function updateProposals() {
        let options = {
              fromBlock: 0,
              toBlock: 'latest',
        };

        let _proposals = [];

        if (artifact || contract || accounts) {
            const idProposalList = (await contract.getPastEvents('ProposalRegistered', options))
            .map((prop) => prop.returnValues.proposalId);
    
            for (let id of idProposalList) {
                  let proposal = await contract.methods
                        .getProposalByIndex(id)
                        .call({ from: accounts[0] });
                  let proposalCount = await contract.methods
                  .getVoteCountByProposal(id)
                  .call({ from: accounts[0] });       
                  _proposals.push({_id: id, description: proposal, voteCount: proposalCount});
            }
            setProposals(_proposals);
        }


    }

    useEffect( 
        () => {
            if(artifact || contract || accounts) {
                updateProposals();
            }
        },
        [contract]
    );
    
    
     // SEND PROPOSALS 
    const sendProposal = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputProposal === "") {
            alert("Please enter a value to write.");
            return;
        }
        let newProposal = inputProposal;
        await contract.methods.sendProposals(newProposal).send({ from: accounts[0] });
        // inputProposal = ''; 
        updateProposals(); 
        setInputProposal("")
    }

    const handleInputProposal = e => {
        setInputProposal(e.target.value);
    };

    

    const voteForProposal = async () => {
        var radioButtons = document.getElementsByName('rad');
        for (var i = 0; i < radioButtons.length; i++) {
              if (radioButtons[i].checked) {
                    await contract.methods
                          .voteForProposal(parseInt(radioButtons[i].value))
                          .send({ from: accounts[0] });
                          updateProposals(); 
                          radioButtons[i].checked = false; 
                    break;
              }
        }
  };

    const showProposal = (
        <div className="proposalarray">
            <table className="proposaltable">

                {
                    !proposalIsOpen && proposals.length === 0 || proposalIsOpen || proposalClosed ?  (
                        <thead>
                            <th className="arraytitle right-rounded">PROPOSALS</th>
                        </thead>
                    ) : voteIsClosed || votesTallied ? (
                        <thead>
                            <th className="arraytitle">PROPOSALS</th>
                            <th className="arraytitle endsize right-rounded">Votes count</th>
                        </thead>
                    ) : (
                    <thead>
                        <th className="arraytitle">PROPOSALS</th>
                        <th className="arraytitle">Votes count</th>
                        <th className="arraytitle">Add vote</th>
                     </thead>
                    )
                }
            
              {
                !proposalIsOpen && proposals.length === 0 ? ( 
                    <tr className="proposalline"> 
                        <td className="proposal">The proposals registration is not open for the moment ! </td>
                    </tr>
                ) : proposals.length === 0 ? (
                    <tr className="proposalline"> 
                        <td className="proposal">There is no proposal for the moment ! </td>
                    </tr>
                ) : proposals.length > 0 && !voteIsOpen && !voteIsClosed && !votesTallied ?  (

                    proposals?.map( (prop) => {
                        return  (
                        <tr key={prop._id} className="proposalline">
                            <td className="proposal">{prop._id} : {prop.description}</td>
                        </tr>
                        )
                    })
                ) : voteIsOpen ? (
                    proposals?.map( (prop) => {
                        return  (
                        <tr key={prop._id} className="proposalline">
                            <td className="proposal"><strong>{prop._id} </strong>: {prop.description}</td>
                            <td className="votecount">{prop.voteCount}</td>
                             <td className="addvote">
                                <input
                                          type="radio"
                                          name="rad"
                                          value={prop._id}
                                />
                            </td>
                        </tr>
                        )
                    })
                ) : voteIsClosed || votesTallied ? (
                    proposals?.map( (prop) => {
                        return  (
                        <tr key={prop._id} className="proposalline">
                            <td className="proposal"><strong>{prop._id}</strong> : {prop.description}</td>
                            <td className="votecount">{prop.voteCount}</td>
                        </tr>
                        )
                    })
                ) : (
                    test
                )
              }
              
            </table>
            {
               proposalIsOpen ? (
                <div className="proposalinput">
                    <div className="input-btn open full-width " onClick={sendProposal}>
                            <span>Submit your proposal !</span> 
                            <input
                            type="text"
                            placeholder="string"
                            value={inputProposal}
                            onChange={handleInputProposal}
                            />
                    </div>
                </div>
                

               ) : proposalClosed ? ( 
                <div className="proposalinput">
                    <div className="input-btn full-width">
                            <span>The registration of proposal is closed</span> 
                    </div>
                </div>
               ) : voteIsOpen ? (
                <div className="proposalinput">
                    <div className="normalized">
                        <span>Total Votes Counted :</span> 
                    </div>
                    <div className="votetotal">
                        {<span>{total}</span>}
                    </div>
                    <div className="spacer">
                        <button className="addvotebtn" onClick={voteForProposal}>VOTE</button>
                    </div>
                </div>

               ) : voteIsClosed ?  (
                
                <div className="proposalinput">
                    <div className="normalized">
                        <span>Total Votes Counted :</span> 
                    </div>
                    <div className="votetotal endsize full-width">
                        {<span>{total}</span>}
                    </div>
                </div>
               ) : votesTallied ? (
                <div className="proposalinput">
                    <div className="normalized">
                        <span> <AiFillTrophy/> And the winning proposal is  : "<strong className="winning">{winningProposalDesc}</strong>"! <AiFillTrophy/> </span> 
                        <span>It was the proposal n°<strong className="winning">{winningProposal}</strong></span> 
                        <span>It won the session with <strong className="winning">{winningVotes} </strong>votes</span> 
                        <span>It represents <strong className="winning">{winningPourc}% </strong> of the votes</span> 

                    </div>
                    <div className="votetotal endsize full-width">
                        {<span>{total}</span>}
                    </div>
                </div>
               ) : test
            }
        </div>
    )




    return  (
        showProposal
    )

}

export default ProposalArray; 