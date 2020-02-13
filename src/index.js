import React, { useRef, useEffect } from 'react'
import { CanvasDatatable } from 'canvas-datatable'

/** @param {import('.').ReactCanvasDatatableProps} props */
export function ReactCanvasDatatable(props) {

    const {
        data = [],
        canvasStyle,
        children
    } = props

    const canvasRef = useRef(null)
    /** @type {React.MutableRefObject<CanvasDatatable>} */
    const canvasDatatableRef = useRef(null)

    useEffect(() => {
        canvasDatatableRef.current = new CanvasDatatable(canvasRef.current, { ...props, initialData: data })
    }, [])
    
    useEffect(() => {
        if (!canvasDatatableRef.current) { return }
        canvasDatatableRef.current.setData(data)
    }, [ data ])

    return (
        <React.Fragment>
            <canvas style={canvasStyle}
                ref={canvasRef}>
            </canvas>
            { children }
        </React.Fragment>
    )
}