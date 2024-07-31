import { useState, useEffect } from "react";

const PortfolioMapComponent = ({ portfolio }) => {
  let keys = Object.keys(portfolio);
  keys = keys.filter(val => !val.startsWith("_"))
  return keys.map(value => (<div key={Math.random()} className="w-full flex justify-between mb-4">
          <div>{value}</div>
          <div>{portfolio[value]}</div>
        </div>))
}
const PortfolioComponent = () => {
  const [riskScore, setRiskScore]  = useState(5);
  const [portfolio, setPortfolio] = useState(null);
  useEffect(function(){
    fetch(`${import.meta.env.VITE_SERVER_URL}/tolerance/get?tolerance=${riskScore}`).then(response => response.json()).then(data => {
      setPortfolio(data);
    })
    },[riskScore])
  return (
    <div className="relative p-4 bg-purple-800 text-white">
      {/* Top section with risk score and example portfolio */}
      <div className="p-4 bg-white text-black rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">Risk score: {riskScore}</span>
          </div>
          <div>
            <span className="text-sm">Example portfolio</span>
          </div>
              </div>
        <input
          type="range"
          min={0}
          max={10}
          value={riskScore}
          className="range mt-2"
          onChange={(e) => setRiskScore(e.target.value)}
        />
        
      </div>

      {/* Middle section with portfolio distribution */}
      <div className="mt-8 flex flex-col items-center bg-purple-700 rounded-lg p-4">
        {portfolio && <PortfolioMapComponent portfolio={portfolio}/>}
     </div>

      {/* Bottom section */}
      <div className="mt-8 bg-orange-200 text-black p-4 rounded-lg">
        Smarter investing, brilliantly personalized.
      </div>
    </div>
  );
};

export default function App() {
  return <PortfolioComponent />;
}
