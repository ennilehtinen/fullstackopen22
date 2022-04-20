const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Part name={course[0].name} exercises={course[0].exercises} />
      <Part name={course[1].name} exercises={course[1].exercises} />
      <Part name={course[2].name} exercises={course[2].exercises} />
    </div>
  )
}

const Part = ({ name, exercises }) => {
  console.log(name, exercises)
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Total = ({ course }) => {
  console.log(course)
  return (
    <div>
      <p>Number of exercises {course[0].exercises + course[1].exercises + course[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </div>
  )
}

export default App;