import { ReactChildren } from 'react'
import { CanvasDatatableOptions } from "canvas-datatable";

export interface ReactCanvasDatatableProps extends CanvasDatatableOptions {
    canvasStyle: CSSStyleDeclaration
    children: ReactChildren
}