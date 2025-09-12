import Part from "./Part";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescribed {
  kind: 'basic';
};

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group',
}

interface CoursePartBackground extends CoursePartDescribed {
  backgroundMaterial: string;
  kind: 'background';
}

 interface CoursePartRequirements extends CoursePartDescribed {
  requirements: string[];
  kind: 'special';
}; 
  


export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

interface CourseParts {
  courseParts: CoursePart[];
};

const Content = ( props: CourseParts) => {
  return(
    <div>
      {props.courseParts.map(coursePart => {
        return(
          <Part coursePart={coursePart}/>
        )
      })}
    </div>
  )
};

export default Content;