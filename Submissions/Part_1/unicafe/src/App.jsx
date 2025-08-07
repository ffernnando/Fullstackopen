import { useState } from 'react'

const Title = ({text}) => <h2> {text} </h2>;

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>;

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ratings}) => {
  let all = ratings[0].number + ratings[1].number + ratings[2].number;
  if(all === 0){
    return("No feedback given");
  }else{
    let avg = (ratings[0].number * 1 + ratings[1].number * 0 + ratings[2].number * -1) / all;
    let pos = ratings[0].number / all * 100;
    return(
      <div>
        <table>
          <tbody>
            <StatisticsLine text={ratings[0].rating} value={ratings[0].number}/>
            <StatisticsLine text={ratings[1].rating} value={ratings[1].number}/>
            <StatisticsLine text={ratings[2].rating} value={ratings[2].number}/>
            <StatisticsLine text={"all"} value={all}/>
            <StatisticsLine text={"average"} value={avg}/>
            <StatisticsLine text={"pos"} value={pos}/>
          </tbody>
        </table>
      </div>
    );
  }
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const handleClickGood = () =>{
    console.log("Good: ", good);
    setGood(good + 1);
  }
  const handleClickNeutral = () =>{
    console.log("Neutral: ", neutral);
    setNeutral(neutral + 1);
  }
  const handleClickBad = () =>{
    console.log("Bad: ", bad);
    setBad(bad + 1);
  }

  const ratings = [
    {rating: "good", number: good},
    {rating: "neutral", number: neutral},
    {rating: "bad", number: bad},
  ];
  return (
    <div>
      <Title text="give feedback"/>
      <Button onClick={handleClickGood} text={"good"} />
      <Button onClick={handleClickNeutral} text={"neutral"} />
      <Button onClick={handleClickBad} text={"bad"} />
      <Title text="statistics"/>
      <Statistics ratings={ratings}/>
    </div>
  )
}

export default App