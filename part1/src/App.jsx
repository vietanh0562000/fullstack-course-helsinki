import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const contents = [{part:part1, exercise:exercises1}, {part:part2, exercise:exercises2}, {part:part3, exercise:exercises3}]

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total contents={contents} />
    </div>
  )
}

export default App