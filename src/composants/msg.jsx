import React from 'react'
import { useParams } from 'react-router-dom'
//import  USER_MAIN_DATA from"../ressources/data.js"

const USER_MAIN_DATA = [
    {
        id: 12,
        userInfos: {
            firstName: 'Karl',
            lastName: 'Dovineau',
            age: 31,
        },
        score: 0.12,
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

export default function Msg(props) {
    const { nom } = props;
    const { id } = useParams();
    const donnee_utilisateur = USER_MAIN_DATA.filter(donnee =>
        donnee.id == id);
    const name = donnee_utilisateur[0].userInfos.firstName;

    return (
        <div id="partie_msg">
            <span><p>Bonjour </p><p id="name">{name}</p></span>
            <p id="txt_msg">Félicitation! Vous avez explosé vos objectifs hier</p>
        </div>
    )

}