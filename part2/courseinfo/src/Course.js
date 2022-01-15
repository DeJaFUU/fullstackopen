import React from 'react';


const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((a,b) => a + b.exercises, 0)
  return(
    <p><b>Number of exercises {sum}</b></p>
  ) 
}

const Part = ({key, part}) => {
  return (
    <p key={key}>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map( (part) => <Part key={part.id} part={part} />)}
      </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div> 
  )
}

export default Course;