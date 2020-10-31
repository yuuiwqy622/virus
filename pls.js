let plN = 0
let ns = "http://www.w3.org/2000/svg"
state = 'b', bId = 0, eId = 0

/**
 * @param {number} begin begin circle id
 * @param {number} end end circle id
 */
function addEdge(begin, end) {
    let svgObject = document.getElementById('plSVG')
    let bCircle = svgObject.getElementById(`${begin}`)
    let eCircle = svgObject.getElementById(`${end}`)

    let edge = document.createElementNS(ns, 'line')
    edge.setAttribute('x1', bCircle.getAttribute('cx'))
    edge.setAttribute('y1', bCircle.getAttribute('cy'))
    edge.setAttribute('x2', eCircle.getAttribute('cx'))
    edge.setAttribute('y2', eCircle.getAttribute('cy'))
    edge.setAttribute('id', `${begin} ${end}`)
    svgObject.appendChild(edge)
}

function addNode(x, y) {
    let c = document.createElementNS(ns, 'circle')
    c.setAttributeNS(null, 'cx', x); c.setAttributeNS(null, 'cy', y)
    c.setAttributeNS(null, 'r', 30); c.setAttributeNS(null, 'id', plN)

    t = document.createElementNS(ns, 'text')
    t.setAttributeNS(null, 'x', x); t.setAttributeNS(null, 'y', y)
    let text = document.createTextNode(plN++)
    t.appendChild(text)

    let svg = document.getElementById('plSVG')
    svg.appendChild(c); svg.appendChild(t)
}

function getCursorPosition(svg, e) {
    const rect = svg.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    return { 'x': x, 'y': y }
}

function findPath() {
    let all = document.getElementById('plSVG')
    let circles = all.getElementsByTagName('circle'), n = circles.length
    let lines = all.getElementsByTagName('line'), m = lines.length
    let nodes = [], neighs = []
    for (let i = 0; i < n; ++i) {
        nodes.push(i), neighs.push([])
    }

    for (c of lines) {
        let link = c.getAttribute('id').split(' ')
        neighs[link[0]].push(link[1]), neighs[link[1]].push(link[0])
    }

}

document.addEventListener('DOMContentLoaded', (e) => {
    let svg = document.getElementById('plSVG')
    svg.addEventListener('mousedown', function (e) {
        if (svg.id == e.target.id) {
            pos = getCursorPosition(svg, e)
            addNode(pos['x'], pos['y']); return
        }

        if (state == 'b') { bId = e.target.id; state = 'e'; return }

        eId = e.target.id
        state = 'b'
        addEdge(bId, eId);
    })

    let button = document.querySelector('button')
    button.addEventListener('click', (e) => { findPath() })

})