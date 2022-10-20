import React, { useEffect, useState } from 'react'
import { GameCard } from './GameCard';

export function Scores() {
    let [games, setGames] = useState([])
    let [dateStr, setDateStr] = useState("2022-07-01")

    useEffect(() => {
        fetchData()
        async function fetchData() {
            let res = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${dateStr}`)
            res = await res.json()

            setGames(res.dates[0].games)
        }
    }, [dateStr])

    const gameCards = games.map(g => (
        <GameCard gameId={g.gamePk} key={g.gamePk} />
    ))

    function handleDateChange(e) {
        setDateStr(e.target.value)
    }

    
    return (
        <div>
            <div className='DatePickerContainer'>
                <input type="date" value={dateStr} onChange={handleDateChange} />
            </div>
            {gameCards}
        </div>
    )
}