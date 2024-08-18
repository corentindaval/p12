import React, { useRef, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { select, line, curveCardinal, axisBottom, scaleLinear, axisRight, arc, pie } from "d3"
//import USER_PERFORMANCE from"../ressources/data.js"

const USER_PERFORMANCE = [
    {
        userId: 12,
        kind: {
            1: 'cardio',
            2: 'energy',
            3: 'endurance',
            4: 'strength',
            5: 'speed',
            6: 'intensity'
        },
        data: [
            {
                cardio: 80,
                energie: 120,
                endurance: 140,
                force: 50,
                vitesse: 200,
                intensité: 90,
            }
        ]
    },
    {
        userId: 18,
        kind: {
            1: 'cardio',
            2: 'energy',
            3: 'endurance',
            4: 'strength',
            5: 'speed',
            6: 'intensity'
        },
        data: [
            {
                cardio: 200,
                energie: 240,
                endurance: 80,
                force: 80,
                vitesse: 220,
                intensité: 110,
            }
        ]
    }]



export default function Graph_stats() {

    const { id } = useParams();
    const donnee_utilisateur = USER_PERFORMANCE.filter(donnee =>
        donnee.userId == id);
    const data = donnee_utilisateur[0].data;


    //reference to DOM element (svg)
    const containerRef = useRef(null)

    const margin = { top: 20, right: 10, bottom: 60, left: 10 },
        width = 760 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    useEffect(() => {
        //code for the chart goes in here
        var svg = select(containerRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('fill', 'yellow');

        const capitalize = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
        const attributes = Object.keys(data[0])
        const radius = 280;
        const ticks = [30,90,150,210,270];
       

        const cordForAngle = (angle, len) => {
            let x = Math.cos(angle) * (len);
            let y = Math.sin(angle) * (len);

            return { "x": x, "y": y };
        }

        //round axis
        for (var i = 0; i < attributes.length; i++) {
            const slice = (Math.PI / 2) + (2 * Math.PI * i / attributes.length)
            const key = attributes[i]

            //axis values
            const { x, y } = cordForAngle(slice, radius)

            svg.append('line')
                .attr('x2', x + width / 2)
                .attr('y2', y + height / 2)
                .attr('x1', width / 2)
                .attr('y1', height / 2)
                .attr('stroke', 'white')
                .attr('stroke-width', 2)
                .style('opacity', '0.1')

            svg.append('text')
                .attr('x', x + width / 2)
                .attr('y', y + height / 2)
                .text(capitalize(key))
                .style('text-anchor', d => (i === 0 ? 'end' : i === 1 ? 'end' : i === 2 ? 'end' : i === 2 ? 'end' : null))
                .style('font-size','40px')
                .attr('dx', d => (i === 0 ? '0.7em' : i === 1 ? '-0.7em' : i === 2 ? '-0.5em' : i === 3 ? '0.3em' : '0.6em'))
                .attr('dy', d => (i === 0 ? '1.3em' : i === 1 ? '0.4em' : i === 2 ? '-0.5em' : i === 3 ? '-0.5em' : '0.4em'))
                .attr('fill', 'white')
        }

        //radial scale
        const radAxis = scaleLinear()
            .domain([0, 300])
            .range([0, radius])

        //circle labels
      /*  ticks.forEach(el => {
            svg.append('text')
                .attr('x', width / 2)
                .attr('y', height / 2 - radAxis(el) - 0.85)
                .text(el)
                .attr('fill', 'black')
                .attr('stroke', 'none')
                .attr('opacity', '0.5')
                .style('text-anchor', 'middle')
                .style('font-size', '0.825rem')
        })
        */
        //line generator 
        let lineGen = line()
            .x(d => d.x)
            .y(d => d.y)

       



        //circes levels
        ticks.forEach(el => {
            const getCoordPath2 = (dataPoint) => {
                let coord = [];
                for (let i = 0; i < attributes.length+1; i++) {
                    let attr = attributes[i]
                    let angle = (Math.PI / 2) + (2 * Math.PI * i / attributes.length);
                    coord.push(cordForAngle(angle, radAxis(el)))//pour coord fixe remplacer datapoint[attr par la valeur el]
                }
                return coord;
            }


            //drawing path
            for (let i = 0; i < data.length; i++) {
                let d = data[i]
                const cord2 = getCoordPath2(d)

                //spider chart 
                svg.append('path')
                    .datum(cord2)
                    .attr('class', 'areapath')
                    .attr("d", lineGen)
                    .attr("stroke-width", 1.5)
                    .attr("stroke", 'white')
                    .attr("fill", "none")
                    .attr("opacity", 0.6)
                    .attr('transform', `translate(${width / 2}, ${height / 2})`)
            }

          


        })



        //converting data point to coordinates
        const getCoordPath = (dataPoint) => {
            let coord = [];
            for (let i = 0; i < attributes.length; i++) {
                let attr = attributes[i]
                let angle = (Math.PI / 2) + (2 * Math.PI * i / attributes.length);
                coord.push(cordForAngle(angle, radAxis(dataPoint[attr])))//pour coord fixe remplacer datapoint[attr par la valeur el]
            }
            return coord;
        }
      

        //drawing path
        for (let i = 0; i < data.length; i++) {
            let d = data[i]
            const cord = getCoordPath(d)

            //spider chart 
            svg.append('path')
                .datum(cord)
                .attr('class', 'areapath')
                .attr("d", lineGen)
                .attr("stroke-width", 1.5)
                .attr("stroke", 'red')
                .attr("fill", "red")
                .attr("opacity", 0.6)
                .attr('transform', `translate(${width / 2}, ${height / 2})`)
        }

    }, [])







    //DOM Element
    return (
        <svg id="graph_stats" viewBox={`-50 0 ${width +100} ${height + 100}`} ref={containerRef} >
        </svg>
    )
}