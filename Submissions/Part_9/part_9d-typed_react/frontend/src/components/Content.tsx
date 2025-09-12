type coursePart = {
  name: string,
  exerciseCount: number
};

interface ContentProps {
  courseParts: coursePart[];
};

const Content = (props: ContentProps) => {
  return(
    <div>
      {props.courseParts.map(coursePart => {
        return(
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
        )
      })}
    </div>
  )
};

export default Content;