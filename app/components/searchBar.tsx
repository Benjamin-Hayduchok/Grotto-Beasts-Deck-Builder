import React from 'react';

const SearchBar = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("yay!");
    e.preventDefault()
}

  return (
    <div className="searchContainer">
      <form className="formGroup" onSubmit={handleSubmit}>

        <div className="formRow">
          <div className="inputGroup">
            <label className="cardSearchLabel" htmlFor="cardName">Name</label>
            <input className="cardNameInput" type="text" id="cardName" placeholder="Search by Card Name..."></input>
          </div>
        </div>
    
        <div className="formRow">
          <div className="inputGroup">
            <label className="cardSearchLabel" htmlFor="cardType">Type</label>
            <input className="cardTypeInput" type="text" id="cardType" placeholder="Enter to search by type"></input>
            <label className="cardSearchLabel" htmlFor="cardEpic">Epic?</label>
            <select className="cardEpicInput" id="cardEpic" placeholder="Any">
              <option value="Any">Any</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="formRow">
          <div className="inputGroup">
            <label className="cardSearchLabel" htmlFor="cardPower">🛡️</label>
            <input className="cardPowerInput" type="text" id="cardPower" placeholder="Search by Power"></input>
            <label className="cardSearchLabel" htmlFor="cardGoal">❤️</label>
            <input className="cardGoalInput" type="text" id="cardGoal" placeholder="Search by Goal Amount"></input>
            <label className="cardSearchLabel" htmlFor="cardCost">🌟</label>
            <input className="cardCostInput" type="text" id="cardCost" placeholder="Search by Cost"></input>
          </div>
        </div>

        <div className="formRow">
          <div className="inputGroup">
            <label className="cardSearchLabel" htmlFor="cardEffect">Effect</label>
            <input className="cardEffectInput" type="text" id="cardEffect" placeholder="Enter Anything To Match..."></input>
          </div>
        </div>

        <div className="formRow">
          <input type='submit'className="submitCardSearch" id="submitCardSearch" value="Search"></input>
        </div>

      </form>
    </div>
  )
} 

export default SearchBar