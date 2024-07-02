import img_copie from "../ressources/copiryght.png"

export default function Nav() {
   

    return (
        <div id="bandeau">
            <div id="group_bouton">
                <button id="meditation"></button>
                <button id="natation"></button>
                <button id="velo"></button>
                <button id="muscu"></button>
            </div>
            <img id="img_copi" src={img_copie} />
        </div>
    )


}


