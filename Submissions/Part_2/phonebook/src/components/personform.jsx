const PersonForm = ({handleFormSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button> <br></br>
        </div>
      </form>
  );
}

export default PersonForm;