import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
);

const Part = (props) => (
  <>
    <p>
      {props.part} {props.exercises}
    </p>
  </>
);

const Content = (props) => (
  <>
    <Part part={props.part.part1} exercises={props.exercises.exercises1} />
    <Part part={props.part.part2} exercises={props.exercises.exercises2} />
    <Part part={props.part.part3} exercises={props.exercises.exercises3} />
  </>
);

const Total = (props) => (
  <>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  </>
);

const App = () => {
  const course = 'Half Stack application development';
  const part = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content
        part={{ part1: part[0].name, part2: part[1].name, part3: part[2].name }}
        exercises={{ exercises1: part[0].exercises, exercises2: part[1].exercises, exercises3: part[2].exercises }}
      />
      <Total exercises1={part[0].exercises} exercises2={part[1].exercises} exercises3={part[2].exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
