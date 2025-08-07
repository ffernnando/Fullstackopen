const Header = ({name}) => {
  return(
    <h2>{name}</h2>
  );
}

const Part = ({part}) => {
  return(
    <p>{part.name} {part.exercises}</p>
  );
}

const SumOfExercises = ({parts}) => {
  return(
    <div>
      <b>
        total of {parts.reduce((sum, curr) => sum += curr.exercises, 0)} exercises
      </b>    
    </div>
  );
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
      <SumOfExercises parts={parts}/>
    </div>
  );
  
}

const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  );
  
}

export default Course;