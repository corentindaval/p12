import React, { useRef, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { select, line, curveCardinal, axisBottom, scaleLinear, axisRight, scaleBand, brushX } from "d3"

import  getdata  from "./data.jsx";
//import USER_AVERAGE_SESSIONS from"../ressources/data.js"

const testdata = [25, 30, 45, 60, 20, 65, 75];

export default function Graph_duree() {
    const { id } = useParams();

   

    const donnee_utilisateur = getdata()[2].filter(donnee =>
        donnee.userId == id);
    var list_val = [];
    donnee_utilisateur[0].sessions.forEach(function (session) {
        list_val[session.day - 1] = session.sessionLength;
    });

    const svgref = useRef();
    useEffect(() => {
        const svg = select(svgref.current);

        const xScale = scaleLinear()
            .domain([0, list_val.length - 1])
            .range([0, 200]);

        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0]);


        const semaine = ["L", "M", "M", "J", "V", "S", "D"];

        const xAxis = axisBottom(xScale)
            .ticks(list_val.length)
            .tickFormat(index => semaine[index]);
        const marge = 20;
        svg
            .select(".x-axis")
            .style("transform", "translateY(200px)" + "translateX(" + marge + "px)")
            .attr("stroke", "white")
            .call(xAxis)
         ;
        svg.selectAll(".cacherepere")
            .data(semaine)
            .join("rect")
            .attr("class", "cacherepere")
            .attr("fill", "red")
           .call(xAxis)
            .style("transform", "translateY(200px)" + "translateX(" + marge + "px)")
            .attr("width", 240)
            .attr("height", 8);

        svg.append('text')
            .attr('y', 15)
            .attr('x', 20)
            .html('Durée moyenne des sessions')
            .style('stroke', 'none')
            .style('fill', 'white');
      
        const myline = line()
            .x((value, index) => xScale(index)+marge)
            .y(yScale)
            .curve(curveCardinal);
       
        svg
            .selectAll(".line")
            .data([list_val])
            .join("path")
            .attr("class", "line")
            .attr("d", myline)
            .attr("fill", "none")
            .attr("stroke", "white");

        svg
            .selectAll(".dot")
            .data(list_val)
            .join("circle")
            .attr("class", "dot")
            .attr("r", 2)
            .attr("fill", "white")
            .attr("stroke", "white")
            .attr("opacity",0)
            .attr("cx", (value, index) => xScale(index) + marge)
            .attr("cy", yScale)
            .on("mouseenter", (value, index) => {
                svg
                    .append("rect")
                    .attr("class", "zone_grise")
                    .attr("fill", "black")
                    .attr("opacity", 0.2)
                    .attr("width", value.x)
                    .attr("height", 268)
                    .attr("rx", 20)
                    .attr('y', -2)
                    .attr('x', value.x - 280);
                svg.append("circle")
                    .attr("class", "v-dot")
                    .attr("r", 4)
                    .attr("fill", "white")
                    .attr("stroke", "white")
                    .attr("opacity", 1)
                    .attr("cx", value.x - 280)
                    .attr("cy", value.y - 620)

                svg
                    .append("rect")
                    .attr("class", "case")
                    .attr("fill", "white")
                    .attr("opacity", 1)
                    .attr("width", 50)
                    .attr("height", 20)
                    .attr('y', value.y - 615)
                    .attr('x', value.x - 230);
                svg
                    .selectAll(".txt_duree")
                    .data([value])
                    .join("text")
                    .attr("class", "txt_duree")
                    .text(index+" min")
                    .attr("fill", "black")
                    .attr("stroke", "black")
                    .attr("x", value.x -230)
                    .attr("y", value.y - 600);
              
             
                
            })
            .on("mouseout", (value, index) => {
                svg.selectAll(".zone_grise")
                .remove()
                svg.selectAll(".txt_duree")
                    .remove()
                svg.selectAll(".case")
                    .remove()
                svg.selectAll(".v-dot")
                .remove()

            })
            ;


        const yScale2 = scaleLinear()
            .domain([0, 150])
            .range([140, 0]);
        /*
        svg
            .selectAll(".txt_duree")
            .data(list_val)
            .join("text")
            .attr("class", "txt_duree")
            .text((value, index) => list_val[index])
            .attr("fill", "black")
            .attr("stroke", "black")
            .attr("x", (value, index) => xScale(index) + marge)
            .attr("y", yScale2);
            */
       

       


    }, [list_val]);

    return (
        <React.Fragment>
        
            <svg id="graph_duree" ref={svgref}>
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
            
        </React.Fragment>
    )

}

