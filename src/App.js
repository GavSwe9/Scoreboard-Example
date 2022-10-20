import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { GameCard } from './Components/GameCard';
// import GameCard from './Components/GameCard'

function App() {
  let [loading, setLoading] = useState(true)
  let [games, setGames] = useState([])

  useEffect(() => {
    fetchData()
    async function fetchData() {
      let res = await fetch('https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=2022-07-01')
      res = await res.json()

      setGames(res.dates[0].games)
      setLoading(false)
    }
  }, [])

  const gameCards = games.map(g => (
    <GameCard gameId={g.gamePk} />
  ))

  return (
    <div>
      {gameCards}
    </div>
  )
}

export default App;
