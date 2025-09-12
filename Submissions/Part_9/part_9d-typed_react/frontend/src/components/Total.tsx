interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps) => {
  return(
    <p>Nuber of exercises: {props.totalExercises}</p>
  )
}

export default Total;