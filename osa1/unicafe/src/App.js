import { useState } from 'react'

const Header = ({ headers }) => {
  return (
    <div>
      <h1>{headers}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value, suffix }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} {suffix}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({ good, neutral, bad, all, avg, pos }) => {
  if (all === 0) {
    return (
      <div>
        No feedback given yet
      </div>
    )
  }
  return (
    <table>
      <StatisticLine value={good} text="good" />
      <StatisticLine value={neutral} text="neutral" />
      <StatisticLine value={bad} text="bad" />
      <StatisticLine value={all} text="all" />
      <StatisticLine value={avg} text="avg." />
      <StatisticLine value={pos} text="pos." suffix={'%'} />
    </table>
  )
}

const App = () => {
  const headers = ['Give feedback', 'Statistics']
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const all = good + neutral + bad
  const avg = (good * 1 + neutral * 0 + bad * (-1)) / all
  const pos = good / all * 100

  return (
    <div>
      <Header headers={headers[0]} />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header headers={headers[1]} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg.toFixed(2)} pos={pos.toFixed(0)} suffix={'%'} />
    </div>
  )
}

export default App;