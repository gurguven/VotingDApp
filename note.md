mnemonic ganache : voting 
infura ID : 
mnemonic wallet : 


  <code>
      {`contract Voting {

  current state = `}

      <span className="secondary-color">
        <strong>{status}</strong>
      </span>

  {`;  

Proposals = `}

<span className="secondary-color" >
  <strong>{proposals}</strong>
</span>

{`;  

AND THE WINNER IS  = `}

<span className="secondary-color" >
  <strong>{winnerId}</strong>
</span>

<hr />

<span className="secondary-color" >
  <strong>{winningProposal}</strong>
</span>

{`;  


  Events arriving :  `} {EventValue} 

  <br></br>



  {`
  Old events : `} {oldEvents}
  </code>

  ------------------------

  <div className="proposalarray">
            <table className="proposaltable">

            <thead>
                <th className="arraytitle">Proposals</th>
                {/* <th className="arraytitle">Votes count</th> */}
                {/* <th className="arraytitle">Add vote</th> */}
            </thead>
            {proposals.map( (prop) => {
                return  (
                <tr key={prop._id} className="proposalline">
                    <td className="proposal">{prop.description}</td>
                    {/* <td className="votecount">{val.voteCount}</td> */}
                    {/* <td className="addvote">
                        <button className="addvotebtn" id={key} onClick={(e) => clickHandler(e.currentTarget.id)(e)}>+</button>
                    </td> */}
                </tr>
                )
            })}
            </table>

            <div className="proposalinput">
                <div className="input-btn" onClick={sendProposal}>
                        <span>Submit your proposal !</span> 
                        <input
                        type="text"
                        placeholder="string"
                        value={inputProposal}
                        onChange={handleInputProposal}
                        />
                </div>
                <div className="votetotal">
                    {
                
                    //   <span>{total}</span>  
                        
                    }
                </div>
                <div className="spacer">

                </div>
            </div>

            {/* {displayProposals} */}



      </div>

        // <div className="proposalarray">
        //     <table className="proposaltable">
        //         <thead>
        //             <th className="arraytitle">Proposals</th>
        //             <th className="arraytitle">Votes count</th>
        //             <th className="arraytitle">Add vote</th>
        //         </thead>
        //         <tr className="proposalline"> 
        //             <td className="proposal">blablax</td>
        //             <td className="votecount">0</td>
        //             <td className="addvote">
        //                 {/* <button className="addvotebtn" onClick={(e) => {
        //                     this.addVote(e, 1)
        //                 }}>
        //                     +
        //                 </button> */}
        //                 <button className="addvotebtn" id="0" onClick={(e) => clickHandler(e.currentTarget.id)(e)}>+</button>
        //             </td>
        //         </tr>
        //         <tr className="proposalline"> 
        //             <td className="proposal">blabla</td>
        //             <td className="votecount">0</td>
        //             <td className="addvote">
        //                 <button className="addvotebtn" onClick={addVote(2)}>
        //                     +
        //                 </button>
        //             </td>
        //         </tr>
        //         <tr className="proposalline"> 
        //             <td className="proposal">blabla</td>
        //             <td className="votecount">0</td>
        //             <td className="addvote">
        //                 <button className="addvotebtn" onClick={addVote}>
        //                     +
        //                 </button>
        //             </td>
        //         </tr>
        //         <tr className="proposalline"> 
        //             <td className="proposal">blabla</td>
        //             <td className="votecount">0</td>
        //             <td className="addvote">
        //                 <button className="addvotebtn" onClick={addVote}>
        //                     +
        //                 </button>
        //             </td>
        //         </tr>
        //     </table>
        // </div>

        // <Table/>

        
        
    ) : registrationIsOpen ? (

        <div className="proposalarray">
            <table className="proposaltable">
                <thead>
                    <th className="arraytitle">Proposals</th>
                </thead>
                <tr className="proposalline"> 
                    <td className="proposal">There is no proposal for the moment ! </td>
                </tr>
               
            </table>

            <div className="proposalinput">
                <div className="input-btn">
                </div>
                <div className="votetotal">
                </div>
                <div className="spacer">

                </div>
            </div>            

        </div> 

    ) : voteIsOpen ? (

        <div className="proposalarray">
        <table className="proposaltable">

        <thead>
            <th className="arraytitle">Proposals</th>
            <th className="arraytitle">Votes count</th>
            <th className="arraytitle">Add vote</th>
        </thead>
        {proposals.map( (prop) => {
            return  (
            <tr key={prop._id} className="proposalline">
                <td className="proposal">{prop.description}</td>
                <td className="votecount">{prop.voteCount}</td>
                 <td className="addvote">
                    <button className="addvotebtn" id={prop._id} onClick={(e) => clickHandler(e.currentTarget.id)(e)}>+</button>
                </td> 
            </tr>
            )
        })}
        </table>

        <div className="proposalinput">
            <div className="votetotal">
            </div>
            <div className="spacer">
            </div>
        </div>
  </div>


    ) : votesTallied ? (

        
        test 


    ) : test