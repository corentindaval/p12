import React, { useRef, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { select, line, curveCardinal, axisBottom, scaleLinear, axisRight, arc, pie } from "d3"
import getdata from "./data.jsx";
//import  USER_MAIN_DATA from"../ressources/data.js"


//const testdata = [0.50,0.50];
export default function Score() {
    const { id } = useParams();
    const svgRef = useRef();
    var data = [0.50,0.50];
  
    const donnee_utilisateur = getdata()[0].filter(donnee =>
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

        svg.append('text')
            .attr('y', -10)
            .attr('x', -10)
            .html(pourcent)
            .style('stroke', 'none')
            .style('fill', 'black')

        svg.append('text')
            .attr('y', 10)
            .attr('x', -55)
            .html('de votre objectif')
            .style('stroke', 'none')
            .style('fill', 'black')

    }, [data]);

    return (
        <React.Fragment>
            <div id="graph_score">
            <label id="label_score">score</label>
            <svg id="score" ref={svgRef}>
               
            </svg>
                <span id="span_score"><p id="pourcent">{pourcent}</p><p>de votre objectif</p></span>
            </div>
        </React.Fragment>
    )

}


