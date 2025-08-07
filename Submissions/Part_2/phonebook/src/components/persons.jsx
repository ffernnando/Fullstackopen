import Person from "./person";

const Persons = ({shownPersons, handleDelete}) => {
  return(
    <div>
      { shownPersons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/>) }
    </div>
  );
};

export default Persons;