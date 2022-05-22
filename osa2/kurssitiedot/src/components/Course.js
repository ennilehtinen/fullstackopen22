const Course = ({ course }) => {
    console.log('Course', course)
    return (
        <div>
            <Header course={course.name} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => {
    console.log('Header', course)
    return (
        <div>
            <h2>{course}</h2>
        </div>
    )
}

const Content = ({ course }) => {
    console.log('Content', course)
    return (
        <div>
            {course.parts.map(part =>
                <Part key={`part#${course.id}#${part.id}`} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Part = ({ name, exercises }) => {
    console.log('Part', name, exercises)
    return (
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}

const Total = ({ parts }) => {
    console.log('Total', parts)
    const total = parts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.exercises, 0)
    return (
        <div>
            <p>Total of exercises {total}</p>
        </div>
    )
}

export default Course;