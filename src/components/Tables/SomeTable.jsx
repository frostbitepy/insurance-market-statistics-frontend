import React, { useEffect, useState } from 'react';
import {
    Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import {
    useSort,
    HeaderCellSort,
    SortIconPositions,
    SortToggleType,
} from "@table-library/react-table-library/sort";



const THEME = {
    HeaderRow: `
    font-size: 14px;

    background-color: #000000;
  `,
    Row: `
    font-size: 14px;

    &:nth-child(odd) {
      background-color: #808080;
    }

    &:nth-child(even) {
      background-color: #333333;
    }
  `,
};

const SomeTable = () => {
    const [tableData, setTableData] = useState([]);
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const theme = useTheme(THEME);

    useEffect(() => {
        if (year && month) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/exercise/${year}/${month}`);
                    setTableData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [year, month]);

    const data = { nodes: tableData };
    const sort = useSort(
        data,
        {
            state: {
                sortKey: "INSURER_NAME",
                reverse: true,
            },
            onChange: onSortChange,
        },
        {
            sortFns: {
                INSURER_NAME: (array) => array.sort((a, b) => a.insurer_name.localeCompare(b.insurer_name)),
                TOTAL_ACTIVOS: (array) => array.sort((a, b) => parseInt(a.exercise.balance_general.total_activos.$numberLong) - parseInt(b.exercise.balance_general.total_activos.$numberLong)),
                TOTAL_PASIVOS: (array) => array.sort((a, b) => parseInt(a.exercise.balance_general.total_pasivos.$numberLong) - parseInt(b.exercise.balance_general.total_pasivos.$numberLong)),
                CAPITAL_SOCIAL: (array) => array.sort((a, b) => parseInt(a.exercise.balance_general.capital_social.$numberLong) - parseInt(b.exercise.balance_general.capital_social.$numberLong)),
                RESULTADO_EJERCICIO: (array) => array.sort((a, b) => parseInt(a.exercise.balance_general.resultado_ejercicio.$numberLong) - parseInt(b.exercise.balance_general.resultado_ejercicio.$numberLong)),
                TOTAL_PATRIMONIO_NETO: (array) => array.sort((a, b) => parseInt(a.exercise.balance_general.total_patrimonio_neto.$numberLong) - parseInt(b.exercise.balance_general.total_patrimonio_neto.$numberLong)),
            },
        }
    );

    function onSortChange(action, state) {
        console.log(action, state);
    }

    return (
        <div>
            <Formik
                initialValues={{ year: '', month: '' }}
                onSubmit={(values) => {
                    setYear(values.year);
                    setMonth(values.month);
                }}
            >
                <Form>
                    <label htmlFor="year">Year</label>
                    <Field id="year" name="year" placeholder="Enter year" />

                    <label htmlFor="month">Month</label>
                    <Field id="month" name="month" placeholder="Enter month" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            {year && month && (
                <Table data={{ nodes: tableData }} sort={sort} theme={theme}>
                    {(tableList) => (
                        <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCellSort sortKey="INSURER_NAME">Insurer Name</HeaderCellSort>
                                    <HeaderCellSort sortKey="TOTAL_ACTIVOS">Total Assets</HeaderCellSort>
                                    <HeaderCellSort sortKey="TOTAL_PASIVOS">Total Liabilities</HeaderCellSort>
                                    <HeaderCellSort sortKey="CAPITAL_SOCIAL">Capital Social</HeaderCellSort>
                                    <HeaderCellSort sortKey="RESULTADO_EJERCICIO">Result Exercise</HeaderCellSort>
                                    <HeaderCellSort sortKey="TOTAL_PATRIMONIO_NETO">Total Net Worth</HeaderCellSort>
                                </HeaderRow>
                            </Header>
                            <Body>
                                {tableList.map((item) => (
                                    <Row key={item.exercise._id} item={item}>
                                        <Cell>{item.insurer_name}</Cell>
                                        <Cell>{parseInt(item.exercise.balance_general.total_activos.$numberLong).toLocaleString('de-DE')}</Cell>
                                        <Cell>{parseInt(item.exercise.balance_general.total_pasivos.$numberLong).toLocaleString('de-DE')}</Cell>
                                        <Cell>{parseInt(item.exercise.balance_general.capital_social.$numberLong).toLocaleString('de-DE')}</Cell>
                                        <Cell>{parseInt(item.exercise.balance_general.resultado_ejercicio.$numberLong).toLocaleString('de-DE')}</Cell>
                                        <Cell>{parseInt(item.exercise.balance_general.total_patrimonio_neto.$numberLong).toLocaleString('de-DE')}</Cell>
                                    </Row>
                                ))}
                            </Body>
                        </>
                    )}
                </Table>
            )}
        </div>
    );
}

export default SomeTable;