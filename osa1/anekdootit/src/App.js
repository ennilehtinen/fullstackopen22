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
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const RandAnecdote = ({ anecdotes, votes }) => {
  if (votes === 1) {
    return (
      <div>
        <p>{anecdotes}</p>
        <p>Has {votes} vote</p>
      </div>
    )
  }

  return (
    <div>
      <p>{anecdotes}</p>
      <p>Has {votes} votes</p>
    </div>
  )
}

const MostVoted = ({ anecdotes, votes }) => {
  const getVotes = Math.max(...votes)
  // Hakee suurimman (max) arvon taulukosta käyttäen 'Math.max()' -metodia ja määrittelee sen muuttujaan 'getVotes'
  const mostVotes = votes.indexOf(getVotes)
  // Kutsutaan 'indexOf()' -metodia taulukossa, palauttaen sille suurimman (max) arvon

  if (getVotes === 0) {
    return (
      <div>
        <p>No votes yet</p>
      </div>
    )
  }

  if (getVotes === 1) {
    return (
      <div>
        <p>{anecdotes[mostVotes]}</p>
        <p>Has {getVotes} vote</p>
      </div>
    )
  }

  return (
    <div>
      <p>{anecdotes[mostVotes]}</p>
      <p>Has {getVotes} votes</p>
    </div>
  )
}

const App = () => {
  const headers = ['Anecdote of the day', 'Anecdote with most votes']
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that other humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  // 'Array(anecdotes.length).fill(0)' luo anecdotes-taulukon mittaisen tyhjän taulukon,
  // johon voidaan säilöä anekdoottien saamat äänet.
  console.log(votes)
  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    // 'Math.floor(Math.random())' palauttaa satunnaisen elementin anekdootti-taulukosta
  }

  const handleVotes = () => {
    const newVotes = [...votes]
    // '[...votes]' luo taulukon, jolla on kenttinään kopiot taulukon 'votes' kenttien arvoista,
    // jotta komponentin tila voidaan päivittää oikeaoppisesti
    newVotes[selected] += 1
    // Kasvatetaan (nappia painaessa) taulukon satunnaisesti valitun paikan arvoa yhdellä
    // (eli lisätään sille yksi ääni)
    setVotes(newVotes)
  }

  return (
    <div>
      <Header headers={headers[0]} />
      <RandAnecdote anecdotes={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVotes} text='Vote' />
      <Button handleClick={handleSelected} text='Give me a new anecdote' />
      <Header headers={headers[1]} />
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App;