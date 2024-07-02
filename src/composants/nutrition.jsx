import Categorie from "aff_categorie.jsx"
import img_calorie from "../ressources/calorie.png"
import img_proteine from "../ressources/proteine.png"
import img_glucide from "../ressources/glucide.png"
import img_lipide from "../ressources/lipide.png"

export default function Nutrition(props) {
    const {val_calorie,val_proteine,val_glucide,val_lipide} = props;

    return (

        <div id="partie_nutrition">
            <Categorie img={img_calorie} valeur={val_calorie} unite="kCal" type="Calories" />
            <Categorie img={img_proteine} valeur={val_proteine} unite="g" type="Proteines" />
            <Categorie img={img_glucide} valeur={val_glucide} unite="g" type="Glucides" />
            <Categorie img={img_lipide} valeur={val_lipide} unite="g" type="Lipides" />
        </div>
    )


}
