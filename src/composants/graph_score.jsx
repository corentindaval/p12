import React, { useRef, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { select, line, curveCardinal, axisBottom, scaleLinear, axisRight, arc, pie } from "d3"
//import  USER_MAIN_DATA from"../ressources/data.js"


//const testdata = [0.50,0.50];
export default function Score() {
    const { id } = useParams();
    const svgRef = useRef();
    var data = [0.50,0.50];
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

    const donnee_utilisateur = USER_MAIN_DATA.filter(donnee =>
        donnee.id == id);
    var reste = 1 - donnee_utilisateur[0].score;
    data = [donnee_utilisateur[0].score, reste];
    var pourcent = (donnee_utilisateur[0].score*100) + "%";
    
    useEffect(() => {
        const svg = select(svgRef.current);

        const arc_gen = arc()
            .innerRadius(70)
            .outerRadius(80);

        const pie_gen = pie();

        const instructions = pie_gen(data);

        svg
            .selectAll(".slice")
            .data(instructions)
            .join("path")
            .attr("class", "slice")
            .attr("stroke", "none")
            .attr("fill", (instructions, index) => index === 0 ? "#FF0000" :"#eee")
            .attr("d",instructions=>arc_gen(instructions));
      

    }, [data]);

    return (
        <React.Fragment>
            <label id="label_score">score</label>
            <svg id="score" ref={svgRef}>
               
            </svg>
            <span id="span_score"><p id="pourcent">{pourcent}</p><p>de votre objectif</p></span>
        </React.Fragment>
    )

}


