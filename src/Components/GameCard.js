import React, { useEffect, useState } from 'react'

export function GameCard(props) {
    let [loading, setLoading] = useState(true)
    let [data, setData] = useState({})

    useEffect(() => {
        setLoading(true)
        fetchData()

        async function fetchData() {
            let res = await fetch(`https://statsapi.mlb.com/api/v1.1/game/${props.gameId}/feed/live`);

            res = await res.json();
            setData(res);
            setLoading(false)
        }

    }, [])

    if (loading) {
        return (
            <div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className='GameContainer'>
                    <div className='TeamContainer'>
                        <div>
                            <img className='TeamLogo' src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${data.gameData.teams.away.id}.svg`} />
                        </div>
                        <div>
                            {data.gameData.teams.away.name}
                        </div>
                        <div>
                            {data.liveData.boxscore.teams.away.teamStats.batting.runs}
                        </div>
                    </div>

                    <div className='TeamContainer'>
                        <div>
                            <img className='TeamLogo' src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${data.gameData.teams.home.id}.svg`} />
                        </div>
                        <div>
                            {data.gameData.teams.home.name}
                        </div>
                        <div>
                            {data.liveData.boxscore.teams.home.teamStats.batting.runs}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}