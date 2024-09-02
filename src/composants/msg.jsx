import React from 'react'
import { useParams } from 'react-router-dom'
import getdata from "./data.jsx";
//import  USER_MAIN_DATA from"../ressources/data.js"

export default function Msg(props) {
    const { nom } = props;
    const { id } = useParams();
    const donnee_utilisateur = getdata()[0].filter(donnee =>
        donnee.id == id);
    const name = donnee_utilisateur[0].userInfos.firstName;

    return (
        <div id="partie_msg">
            <span><p>Bonjour </p><p id="name">{name}</p></span>
            <p id="txt_msg">Félicitation! Vous avez explosé vos objectifs hier</p>
        </div>
    )

}