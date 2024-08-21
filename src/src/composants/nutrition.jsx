import { useParams } from 'react-router-dom'
import Categorie from "./aff_categorie.jsx"
import img_calorie from "../ressources/calorie.png"
import img_proteine from "../ressources/proteine.png"
import img_glucide from "../ressources/glucide.png"
import img_lipide from "../ressources/lipide.png"
import getdata from "./data.jsx";
//import { USER_MAIN_DATA } from"../ressources/data.js"

export default function Nutrition(props) {
    const { id } = useParams();
    
    const donnee_utilisateur = getdata()[0].filter(donnee =>
        donnee.id == id);
    
    const val_calorie = donnee_utilisateur[0].keyData.calorieCount;
    const val_proteine = donnee_utilisateur[0].keyData.proteinCount;
    const val_glucide = donnee_utilisateur[0].keyData.carbohydrateCount;
    const val_lipide = donnee_utilisateur[0].keyData.lipidCount;
    

    return (

        <div id="partie_nutrition">
            <Categorie img={img_calorie} valeur={val_calorie} unite="kCal" type="Calories" />
            <Categorie img={img_proteine} valeur={val_proteine} unite="g" type="Proteines" />
            <Categorie img={img_glucide} valeur={val_glucide} unite="g" type="Glucides" />
            <Categorie img={img_lipide} valeur={val_lipide} unite="g" type="Lipides" />
        </div>
    )


}
