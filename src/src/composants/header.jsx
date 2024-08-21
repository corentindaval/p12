import img_logo from "../ressources/logo.png"

export default function Header() {
  
    return (
        <header >

            <nav>
                <a id="logo" href=""><img id="img_logo" src={img_logo} /></a>
                <a id="accueil" href="">Accueil</a>
                <a id="profil" href="">Profil</a>
                <a id="reglage" href="">Réglage</a>
                <a id="communauté" href="">Communauté</a>
            </nav>
        </header>
    )


}


