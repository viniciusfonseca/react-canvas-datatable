import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { CanvasDatatable } from 'canvas-datatable';
import { ReactCanvasDatatable } from '.'

CanvasDatatable.addWebFont('https://fonts.googleapis.com/css?family=Titillium+Web')

const html = String.raw

/** @type {import("canvas-datatable").ColumnDefinition[]} */
const columns = [
    { key: "name", label: "Nome", width: 130 },
    {
        key: "create_date",
        label: "Data de Cadastro",
        width: 200,
        align: 'center',
        render(value) {
            return html`
                <span
                    style="overflow-x: hidden; white-space: nowrap; background-color: #FFF;"
                >
                    ${value ? new Date(value).toLocaleDateString() : "Não disponível"}
                </span>
            `;
        }
    },
    {
        key: "status",
        label: "Status",
        align: 'center',
        render(value) {
            const active = value === "active";
            return html`
                <span
                    style="font-weight: bold; padding: 6px; color: #FFF; background-color: ${active
                                ? "green"
                                : "#F00"}; border-radius: 7px;"
                    >
                    ${active ? "Ativo" : "Inativo"}
                </span>
            `;
        }
    },
    {
        key: "amount",
        label: "Valor",
        align: 'right',
        render(value) {
            return html`
                <span style="background-color: #FFF">
                    ${formatter.format(value)}
                </span>
            `
        }
    },
    { key: "last_name", label: "Nome", width: 130 },
    {
        key: "update_date",
        label: "Data de Atualização",
        width: 200,
        align: 'center',
        render(value) {
            return html`
                <span
                    style="overflow-x: hidden; white-space: nowrap; background-color: #FFF"
                >
                    ${value ? new Date(value).toLocaleDateString() : "Não disponível"}
                </span>
            `;
        }
    },
    {
        key: "next_status",
        label: "Status",
        align: 'center',
        render(value) {
            const active = value === "active";
            return html`
                <span
                    style="font-weight: bold; padding: 6px; color: #FFF; background-color: ${active
                            ? "green"
                            : "#F00"}; border-radius: 7px;"
                >
                    ${active ? "Ativo" : "Inativo"}
                </span>
            `;
        }
    },
    {
        key: "pending_amount",
        label: "Valor"
    }
];

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const data = x([
    {
        name: "Vinicius Fonseca",
        create_date: new Date().toISOString(),
        status: "active",
        last_name: "Vinicius Fonseca",
        update_date: new Date().toISOString(),
        next_status: "active",
        amount: 100.00,
    },
    {
        name: "John Doe",
        create_date: new Date().toISOString(),
        status: "active"
    },
    {
        name: "Fulano Beltrano",
        create_date: new Date().toISOString(),
        status: "inactive"
    }
], 16);

function x(a, n) {
    const result = []
    for (let i = 0; i < n; i++)
        for (const e of a)
            result.push({ ...e })
    return result
}

function App() {

    const [ rows, setRows ] = useState(data)

    const shuffleRowsStatus = useCallback(() => {

        setRows(rows.map((row, i) => {
            row.status = ["active", "inactive"][Math.floor(Math.random() * 2)]
            return row
        }))
        
    }, [rows])

    return (
        <div>
            <h1> React Canvas Datatable Example </h1>
            <button onClick={shuffleRowsStatus}>
                Click to Shuffle Rows Status
            </button>
            <div>
                <ReactCanvasDatatable canvasStyle={{ border: `1px solid #A0A0A0` }}
                    data={rows}
                    columns={columns} />
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)