import React, { useEffect, useRef } from 'react';
import { useResizeObserver } from './util/useResizeObserver';
import { select, hierarchy, tree, linkHorizontal, easeLinear, interpolate } from 'd3';
import './css/style.css';

const TreeChart = ({data}) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimensions) return;

        const root = hierarchy(data);
        const treeLayout = tree().size([dimensions.height, dimensions.width - 300]);

        // enrich data
        treeLayout(root);

        console.log(root.descendants());
        console.log(root.links());
        console.log(dimensions.height, dimensions.width + 100);

        // help with the "d" attr of a path element
        const linkGenerator = linkHorizontal()
            .x(node => node.y)
            .y(node => node.x)

        // node draw
        svg
            .selectAll(".node")
            .data(root.descendants())
            .join("rect")
            //.join("circle")
            .attr("class", "node")
            .attr("transform", "translate(" + 100 + "," + 0 + ")")
            //.attr("r", 5)
            .attr("fill", "#eee")
            .attr("width", 200)
            .attr("height", 60)
            // .attr("cx", node => node.y)
            // .attr("cy", node => node.x)
            .attr("x", node => node.y - 10)
            .attr("y", node => node.x - 30)
        
        // node link
        svg
            .selectAll(".link")
            .data(root.links())
            .join("path")
            .attr("class", "link")
            .classed("dot", d=> (d.source.data.name === "sample1"))
            .attr("transform", "translate(" + 100 + "," + 0 + ")")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("d", linkGenerator)
            // .attr("stroke-dasharray", "10 13")
            // .attr("stroke-dashoffset", 200)
            // .transition()
            // .attr("stroke-dashoffset", 0)
            .attr("stroke-dasharray", function() {
                const length = this.getTotalLength();
                return `${length} ${length}`
            })
            .attr("stroke-dashoffset", function() {
                const length = this.getTotalLength();
                return length
            })
            .transition()
            .duration(500)
            .delay(linkObj => linkObj.source.depth * 500)
            .attr("stroke-dashoffset", 0);

            
        // node label
        svg
            .selectAll(".label")
            .data(root.descendants())
            .join("text")
            .attr("class", "label")
            .attr("transform", "translate(" + 100 + "," + 0 + ")")
            .text(node => node.data.name)
            .attr("text-anchor", "left")
            .attr("font-size", 12)
            .attr("x", node => node.y )
            .attr("y", node => node.x )
        

    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} style={{width:"800px", margin:"0 auto"}}>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default TreeChart;