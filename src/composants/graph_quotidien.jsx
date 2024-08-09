import React, { useRef, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { select, axisBottom, scaleLinear, axisRight,scaleBand,min,max,scaleTime, brushX, index } from "d3"
//import  USER_ACTIVITY  from "../ressources/data.js"


const testdata = [25, 30, 45, 100, 20, 65, 75];
const testdata2 = [20, 40, 5, 100, 20, 65, 75];
const USER_ACTIVITY = [
    {
        userId: 12,
        sessions: [
            {
                day: '2020-07-01',
                kilogram: 80,
                calories: 240
            },
            {
                day: '2020-07-02',
                kilogram: 80,
                calories: 220
            },
            {
                day: '2020-07-03',
                kilogram: 81,
                calories: 280
            },
            {
                day: '2020-07-04',
                kilogram: 81,
                calories: 290
            },
            {
                day: '2020-07-05',
                kilogram: 80,
                calories: 160
            },
            {
                day: '2020-07-06',
                kilogram: 78,
                calories: 162
            },
            {
                day: '2020-07-07',
                kilogram: 76,
                calories: 390
            }
        ]
    },
    {
        userId: 18,
        sessions: [
            {
                day: '2020-07-01',
                kilogram: 70,
                calories: 240
            },
            {
                day: '2020-07-02',
                kilogram: 69,
                calories: 220
            },
            {
                day: '2020-07-03',
                kilogram: 70,
                calories: 280
            },
            {
                day: '2020-07-04',
                kilogram: 70,
                calories: 500
            },
            {
                day: '2020-07-05',
                kilogram: 69,
                calories: 160
            },
            {
                day: '2020-07-06',
                kilogram: 69,
                calories: 162
            },
            {
                day: '2020-07-07',
                kilogram: 69,
                calories: 390
            }
        ]
    }
]


function aff_valeur(index) {
    var aff_val=index
    if (index>499) {
        aff_val = index - 100;
    }

    return aff_val;
}

function recup_val(val_x) {
    console.log(val_x);
    return val_x;
}
export default function Graph_activiter_quotidienne() {
    const { id } = useParams();

  
    const getDate = dateString => {
        const date = dateString.split("-");
    };

    const donnee_utilisateur = USER_ACTIVITY.filter(donnee =>
        donnee.userId == id);
    var list_val_kg = [];
    var list_val_cal = [];
    var list_date = [];
    var index_session = 0;
    const donnee_sessions=donnee_utilisateur[0].sessions
    donnee_utilisateur[0].sessions.forEach(function (session) {
        list_val_kg[index_session] = session.kilogram;
        list_val_cal[index_session] = session.calories;
        list_date[index_session] = session.day;
        index_session += 1;
    });

  
 
    console.log("kg:"+list_val_kg+" cal:"+list_val_cal+" date:"+list_date);//list d'element 0=date,1=kg,2=calorie

    const svgref = useRef();
 
    useEffect(() => {
        const svg = select(svgref.current);
        //graph1
        const xScale = scaleBand()
            .domain(list_date.map((value, index) => index))//list valeur des x
            .range([0, 835])
            .padding(0.8);


        const yScale = scaleLinear()
            .domain([0, 500])
            .range([320, 0]);
       

        const y2Scale = scaleLinear()
            .domain([100, 500])
            .range([320, 0]);

        const xAxis = axisBottom(xScale)
            .ticks(list_date.length)
            .tickFormat(index=>list_date[index]);

        svg
            .select(".x-axis")
            .style("transform", "translateY(320px)")
            .call(xAxis);

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(835px)")
            .call(yAxis);

        svg.selectAll(".bar")
            .data(list_val_cal)
            .join("rect")
            .attr("class", "bar")
            .attr("fill", "black")
            .attr("rx", 8)
            .attr("x", (value, index) => xScale(index))
            .attr("y", yScale)
            .attr("width", xScale.bandwidth())
            .attr("height", value => 320 - yScale(value));//remplacer 150 par ymax

        svg.selectAll(".cachebar")
            .data(list_val_cal)
            .join("rect")
            .attr("class", "cachebar")
            .attr("fill", "black")
            .attr("x", (value, index) => xScale(index))
            .attr("y", yScale)
            .style("transform","translateY(10px)")
            .attr("width", xScale.bandwidth())
            .attr("height", value => 320 - yScale(value)-8);//remplacer 150 par ymax
        
         
        //graph2
      

        svg.selectAll(".bar2")
            .data(list_val_kg)
            .join("rect")
            .attr("class", "bar2")
            .attr("fill", "red")
            .attr("rx", 8)
            .attr("x", (value, index) => xScale(index) + 25)
            .attr("y", yScale)
            .attr("width", xScale.bandwidth())
            .attr("height", value => 320 - yScale(value));
       //remplacer 150 par ymax

        svg.selectAll(".cachebar2")
            .data(list_val_kg)
            .join("rect")
            .attr("class", "cachebar2")
            .attr("fill", "red")
            .attr("x", (value, index) => xScale(index)+25)
            .attr("y", yScale)
            .style("transform", "translateY(10px)")
            .attr("width", xScale.bandwidth())
            .attr("height", value => 320 - yScale(value) - 8);//remplacer 150 par ymax


        //brush
        function brushed({ selection }) {
            const table_pos = [150, 260, 365, 480, 580, 695];
            console.log(selection)
            if (selection) {
                var pos_brush = selection[0];
                var index_brush = 0;
                if (pos_brush <= table_pos[0]) {
                    index_brush = 0;
                } else if (pos_brush > table_pos[0] && pos_brush <= table_pos[1]) {
                    index_brush = 1;
                } else if (pos_brush > table_pos[1] && pos_brush <= table_pos[2]) {
                    index_brush = 2;
                } else if (pos_brush > table_pos[2] && pos_brush <= table_pos[3]) {
                    index_brush = 3;
                } else if (pos_brush > table_pos[3] && pos_brush <= table_pos[4]) {
                    index_brush = 4;
                } else if (pos_brush > table_pos[4] && pos_brush <= table_pos[5]) {
                    index_brush = 5;
                } else if (pos_brush > table_pos[5]) {
                    index_brush = 6;
                }
                svg
                    .selectAll(".tooltip")
                    .data(list_val_cal)
                    .join("text")
                    .attr("class", "tooltip")
                    .text(list_val_cal[index_brush] + " Kcal")
                    .attr("x", selection[0])
                    .attr("y",40)
                    .attr("fill", "black");
                svg
                    .selectAll(".tooltip2")
                    .data(list_val_kg)
                    .join("text")
                    .attr("class", "tooltip2")
                    .text(list_val_kg[index_brush] + " Kg")
                    .attr("x", selection[0])
                    .attr("y",20)
                    .attr("fill", "red");

             
            }
        }
       

        const brush = brushX()
            .extent([
                [0, 0],
                [835, 320]
            ])
            .on("brush",brushed);
        svg
            .select(".brush")
            .call(brush)
            .call(brush.move, [0, 100]);



        //Appending legends to the chart
        //legends
        svg.append("circle")
            .attr("cx",  700)
            .attr("cy",-20)
            .attr("r", 10)
            .style("fill", "black")
            .style("opacity", "0.5")

        svg.append("circle")
            .attr("cx", 550)
            .attr("cy", -20)
            .attr("r", 10)
            .style("fill", "red")
            .style("opacity", "0.7")

        svg.append('text')
            .attr('y',  -15)
            .attr('x',  720)
            .html('calories brulées(kcal)')
            .style('stroke', 'none')
            .style('fill', 'black')

        svg.append('text')
            .attr('y', -15)
            .attr('x', 570)
            .html('poid(kg)')
            .style('stroke', 'none')
            .style('fill', 'black')

        svg.append('text')
            .attr('y', -15)
            .attr('x', 0)
            .html('Activité quotidienne')
            .style('stroke', 'none')
            .style('fill', 'black')

    }, [list_date,list_val_cal,list_val_kg]);
    return (
        <React.Fragment>
            <svg id="graph_activiter_quotidienne" ref={svgref}>
                <g className="x-axis" />
                <g className="y-axis" />
                <g className="brush" />
            </svg>
        </React.Fragment>
    )

}

















/*
import React, {useEffect} from 'react'
import {create }from'd3'

function gen_graph() {



    const width = 835;
    const height = 320;

    const $svg = create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewbox', `0 0 ${width} ${height}`)

    const data = [
        { color: 'red', x: 100, y: 100 },
        { color: 'green', x: 200, y: 200 },
        { color: 'blue', x: 300, y: 150 },

    ]

    $svg.selectAll()
        .data(data, d => d.color)
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('fill', d => d.color)
        .attr('r', 10)


    
}
 
export default function Graph_activiter_quotidienne(props) {
    const { donnee } = props;


    return (
        <svg id="graph_activiter_quotidienne" ref={new gen_graph()}>
            
        </svg>
    )

}
*/