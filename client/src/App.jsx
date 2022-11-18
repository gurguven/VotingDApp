import { EthProvider } from "./contexts/EthContext";
import { useState } from "react";
import Header from "./components/Header";
import OwnerDashboard from "./components/OwnerDashboard";
import ProposalArray from "./components/ProposalArray"
import Footer from "./components/Footer";
import "./App.css";
import Voters from "./components/Voters";



function App() {
  const [status, setStatus] = useState("");
  return (
    <EthProvider>
      <div id="App" >
          <div className="container">
            {/* <Header  /> */}
            <Header status={status} setStatus={setStatus} />
            <div className="content">
              {/* <OwnerDashboard/> */}
              <OwnerDashboard  status={status} setStatus={setStatus}/>
              {/* <ProposalArray/> */}
              <ProposalArray status={status}/>
            </div>
            <Footer />
          </div>
      </div>
    </EthProvider>
  );
}

export default App;
