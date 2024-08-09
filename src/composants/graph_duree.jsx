import React, { useRef, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { select, line, curveCardinal, axisBottom, scaleLinear, axisRight, scaleBand, brushX } from "d3"
//import USER_AVERAGE_SESSIONS from"../ressources/data.js"

const testdata = [25, 30, 45, 60, 20, 65, 75];
export default function Graph_duree() {
    const { id } = useParams();
    const USER_AVERAGE_SESSIONS = [
        {
            userId: 12,
            sessions: [
                {
                    day: 1,
                    sessionLength: 30
                },
                {
                    day: 2,
                    sessionLength: 23
                },
                {
                    day: 3,
                    sessionLength: 45
                },
                {
                    day: 4,
                    sessionLength: 50
                },
                {
                    day: 5,
                    sessionLength: 0
                },
                {
                    day: 6,
                    sessionLength: 0
                },
                {
                    day: 7,
                    sessionLength: 60
                }
            ]
        },
        {
            userId: 18,
            sessions: [
                {
                    day: 1,
                    sessionLength: 30
                },
                {
                    day: 2,
                    sessionLength: 40
                },
                {
                    day: 3,
                    sessionLength: 50
                },
                {
                    day: 4,
                    sessionLength: 30
                },
                {
                    day: 5,
                    sessionLength: 30
                },
                {
                    day: 6,
                    sessionLength: 50
                },
                {
                    day: 7,
                    sessionLength: 50
                }
            ]
        }
    ]

    const donnee_utilisateur = USER_AVERAGE_SESSIONS.filter(donnee =>
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
            .style('fill', 'white')
      /* const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(200px)")
            .call(yAxis);
*/
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

