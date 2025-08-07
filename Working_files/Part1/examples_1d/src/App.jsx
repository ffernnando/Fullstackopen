import { useState } from 'react';

const History = ({allClicks}) => {
  if(allClicks.length === 0){
    return(
      <div>
        the app is used by pressing the buttons
      </div>
    );
  }
  return(
    <div>
      button press history: {allClicks.join(" ")}
    </div>
  );
};

const Button = ({onClick, title}) => <button onClick={onClick}> {title} </button>;

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    const updatedLeft = left + 1;
    setLeft(left + 1);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(right + 1);
    setTotal(left + updatedRight);
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} title="left"/>
      <Button onClick={handleRightClick} title="right"/>
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
