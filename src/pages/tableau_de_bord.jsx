import Header from "../composants/header.jsx"
import Nav from "../composants/nav.jsx"
import Msg from "../composants/msg.jsx"
import Graph_activiter_quotidienne from "../composants/graph_quotidien.jsx"
import Graph_duree from "../composants/graph_duree.jsx"
import Graph_stats from "../composants/graph_stats.jsx"
import Score from "../composants/graph_score.jsx"
import Nutrition from "../composants/nutrition.jsx"
//import USER_MAIN_DATA from"../ressources/data.js"
//import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../ressources/data.js"
//user_main_data => nom + partie nutrition , user_activity => activiter quotidienne , user_performance => score ,user_average_session=>duree +stats

export default function Tableau_de_bord() {

    const USER_MAIN_DATA = [
        {
            id: 12,
            userInfos: {
                firstName: 'Karl',
                lastName: 'Dovineau',
                age: 31,
            },
            todayScore: 0.12,
            keyData: {
                calorieCount: 1930,
                proteinCount: 155,
                carbohydrateCount: 290,
                lipidCount: 50
            }
        },
        {
            id: 18,
            userInfos: {
                firstName: 'Cecilia',
                lastName: 'Ratorez',
                age: 34,
            },
            score: 0.3,
            keyData: {
                calorieCount: 2500,
                proteinCount: 90,
                carbohydrateCount: 150,
                lipidCount: 120
            }
        }
    ]


    const USER_ACTIVITY = [
        {
            userId: 12,
            sessions: [
                {
                    day: '2020-07-01',
                    kilogram: 80,
                    calories: 240
                },
                {
                    day: '2020-07-02',
                    kilogram: 80,
                    calories: 220
                },
                {
                    day: '2020-07-03',
                    kilogram: 81,
                    calories: 280
                },
                {
                    day: '2020-07-04',
                    kilogram: 81,
                    calories: 290
                },
                {
                    day: '2020-07-05',
                    kilogram: 80,
                    calories: 160
                },
                {
                    day: '2020-07-06',
                    kilogram: 78,
                    calories: 162
                },
                {
                    day: '2020-07-07',
                    kilogram: 76,
                    calories: 390
                }
            ]
        },
        {
            userId: 18,
            sessions: [
                {
                    day: '2020-07-01',
                    kilogram: 70,
                    calories: 240
                },
                {
                    day: '2020-07-02',
                    kilogram: 69,
                    calories: 220
                },
                {
                    day: '2020-07-03',
                    kilogram: 70,
                    calories: 280
                },
                {
                    day: '2020-07-04',
                    kilogram: 70,
                    calories: 500
                },
                {
                    day: '2020-07-05',
                    kilogram: 69,
                    calories: 160
                },
                {
                    day: '2020-07-06',
                    kilogram: 69,
                    calories: 162
                },
                {
                    day: '2020-07-07',
                    kilogram: 69,
                    calories: 390
                }
            ]
        }
    ]


    const USER_AVERAGE_SESSIONS = [
        {
            userId: 12,
            sessions: [
                {
                    day: 1,
                    sessionLength: 30
                },
                {
                    day: 2,
                    sessionLength: 23
                },
                {
                    day: 3,
                    sessionLength: 45
                },
                {
                    day: 4,
                    sessionLength: 50
                },
                {
                    day: 5,
                    sessionLength: 0
                },
                {
                    day: 6,
                    sessionLength: 0
                },
                {
                    day: 7,
                    sessionLength: 60
                }
            ]
        },
        {
            userId: 18,
            sessions: [
                {
                    day: 1,
                    sessionLength: 30
                },
                {
                    day: 2,
                    sessionLength: 40
                },
                {
                    day: 3,
                    sessionLength: 50
                },
                {
                    day: 4,
                    sessionLength: 30
                },
                {
                    day: 5,
                    sessionLength: 30
                },
                {
                    day: 6,
                    sessionLength: 50
                },
                {
                    day: 7,
                    sessionLength: 50
                }
            ]
        }
    ]


    const USER_PERFORMANCE = [
        {
            userId: 12,
            kind: {
                1: 'cardio',
                2: 'energy',
                3: 'endurance',
                4: 'strength',
                5: 'speed',
                6: 'intensity'
            },
            data: [
                {
                    value: 80,
                    kind: 1
                },
                {
                    value: 120,
                    kind: 2
                },
                {
                    value: 140,
                    kind: 3
                },
                {
                    value: 50,
                    kind: 4
                },
                {
                    value: 200,
                    kind: 5
                },
                {
                    value: 90,
                    kind: 6
                }
            ]
        },
        {
            userId: 18,
            kind: {
                1: 'cardio',
                2: 'energy',
                3: 'endurance',
                4: 'strength',
                5: 'speed',
                6: 'intensity'
            },
            data: [
                {
                    value: 200,
                    kind: 1
                },
                {
                    value: 240,
                    kind: 2
                },
                {
                    value: 80,
                    kind: 3
                },
                {
                    value: 80,
                    kind: 4
                },
                {
                    value: 220,
                    kind: 5
                },
                {
                    value: 110,
                    kind: 6
                }
            ]
        }
    ]


    return (
        <>
            <Header />
            <div id="contenu_page">
                <Nav />
                <div id="contenu">
                   <Msg />
                    <div id="partie_graph">
                        <div id="activiter">
                            <Graph_activiter_quotidienne />
                            <div id="autre_graph">
                                <Graph_duree />
                                <Graph_stats />
                                <Score />
                            </div>
                        </div>
                        <Nutrition />
                    </div>
                </div>
            </div>
        </>
    )


}
//inserer composant msg