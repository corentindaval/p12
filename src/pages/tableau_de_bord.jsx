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