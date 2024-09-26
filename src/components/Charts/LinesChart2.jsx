import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

function LineChart2() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    const accounts = ['balance_general.total_activos', 'balance_general.total_pasivos', 'balance_general.capital_social'];

    const series = [
        {
            name: "Total Activos 1",
            data: data1.map(item => item[cuenta1] ? parseInt(item[cuenta1]['$numberLong']) : 0).reverse()
        },
        {
            name: "Total Activos 2",
            data: data2.map(item => item[cuenta2] ? parseInt(item[cuenta2]['$numberLong']) : 0).reverse()
        },
        {
            name: "Total Activos 3",
            data: data3.map(item => item[cuenta3] ? parseInt(item[cuenta3]['$numberLong']) : 0).reverse()
        }
    ];
    const options = {
        chart: {
            id: "basic-line"
        },
        xaxis: {
            categories: data1.map(item => `${item.year} ${item.month}`).reverse()
        }
    }

    const handleSubmit = async (values) => {
        const insurer_id = value.insurer_id;
        const response1 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id}/${values.cuenta1}`);
        const response2 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id}/${values.cuenta2}`);
        const response3 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id}/${values.cuenta3}`);
        setData1(response1.data.results);
        setData2(response2.data.results);
        setData3(response3.data.results);
    }

    return(
        <div style={{ width: "100vw", height: "100vh", background: "white" }}>
            <Formik
                initialValues={{ insurer_id: '', cuenta1: '', cuenta2: '', cuenta3: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="insurer_id">Insurer ID</label>
                    <Field id="insurer_idField" name="insurer_id" placeholder="Insurer ID" />

                    <label htmlFor="cuenta1">Cuenta 1</label>
                    <Field as="select" id="cuenta1Field" name="cuenta1">
                        {accounts.map(account => (
                            <option key={account} value={account}>{account}</option>
                        ))}
                    </Field>

                    <label htmlFor="cuenta2">Cuenta 2</label>
                    <Field as="select" id="cuenta2Field" name="cuenta2">
                        {accounts.map(account => (
                            <option key={account} value={account}>{account}</option>
                        ))}
                    </Field>

                    <label htmlFor="cuenta3">Cuenta 3</label>
                    <Field as="select" id="cuenta3Field" name="cuenta3">
                        {accounts.map(account => (
                            <option key={account} value={account}>{account}</option>
                        ))}
                    </Field>

                    <button type="submit">Fetch Data</button>
                </Form>
            </Formik>
            <Chart options={options} series={series} type="line" width="80%" />1
        </div>
    )
}

export default LineChart2;