import type { JSX } from "react";
import type { CoursePart } from "./Content";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartParams {
  coursePart: CoursePart;
}
const Part = (props: PartParams) => {
  let details: JSX.Element = <></>;
  switch(props.coursePart.kind) {
    case 'basic': 
      details = <p>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
          <i>{props.coursePart.description}</i>
        </p>
      break;
    case 'group':
      details = <p>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
          <i>project exercises: {props.coursePart.groupProjectCount}</i>
        </p>
      break;
    case 'background':
      details = <p>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
          <i>{props.coursePart.description}</i><br/>
          background material: {props.coursePart.backgroundMaterial}
        </p>
      break;
    case 'special':
      
      details = <p>
          <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b><br/>
          <i>{props.coursePart.description}</i><br/>
          requirements: {props.coursePart.requirements.join(', ')}
        </p>
      break;
    default:
      return assertNever(props.coursePart);
  }
  return details;
};

export default Part;