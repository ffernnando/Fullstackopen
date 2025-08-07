import { useState } from 'react';

const Display = ({counter}) => <div> {counter} </div>;

const Button = ({onClick, title}) => <button onClick={onClick}> {title} </button>;


const App = () => {

  const [ counter, setCounter ] = useState(0);
  console.log("rendering with counter value", counter)
  const increaseByOne = () => {
    console.log("increasing, value before: ", counter);
    setCounter(counter + 1);
  };

  const setToZero = () => {
    console.log("resetting to zero, value before: ", counter);
    setCounter(0);
  };

  const decreaseByOne = () => {
    console.log("decreasing, value before: ", counter);
    setCounter(counter - 1);
  };

  return (
    <div>
      <Display counter={counter}/>
      <br></br>
      <Button onClick={increaseByOne} title="plus"/>
      <Button onClick={setToZero} title="zero"/>
      <Button onClick={decreaseByOne} title="minus"/>
    </div>
  );
};

export default App;