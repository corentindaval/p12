import React from 'react'

export default function Categorie(props) {
    const { img, valeur, unite, type } = props;

    return (
        <div className="categorie">
            <img src={img} />
            <div>
                <p className="valeur_categorie">{valeur + unite}</p>
                <p className="type">{type}</p>
            </div>
        </div>
    )


}