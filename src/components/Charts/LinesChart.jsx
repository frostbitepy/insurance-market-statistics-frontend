import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Formik, Field, Form } from 'formik';
import axios from "axios";

function LineChart() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [cuenta1, setCuenta1] = useState('');
    const [cuenta2, setCuenta2] = useState('');
    const [cuenta3, setCuenta3] = useState('');

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
        const insurer_id = values.insurer_id;
        setCuenta1(values.cuenta1);
        setCuenta2(values.cuenta2);
        setCuenta3(values.cuenta3);
        const response1 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id}/${values.cuenta1}`);
        const response2 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id}/${values.cuenta2}`);
        const response3 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id}/${values.cuenta3}`);
        setData1(response1.data.results);
        console.log(response1)
        setData2(response2.data.results);
        console.log(response2)
        setData3(response3.data.results);
        console.log(response3)
    }

    return(
        <div style={{ width: "100vw", height: "100vh", background: "white" }}>
            <Formik
                initialValues={{ insurer_id: '', cuenta: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="insurer_id">Insurer ID</label>
                    <Field id="insurer_idField" name="insurer_id" placeholder="Insurer ID" />

                    <label htmlFor="cuenta1">Cuenta1</label>
                    <Field id="cuentaField" name="cuenta1" placeholder="Cuenta 1" />

                    <label htmlFor="cuenta2">Cuenta2</label>
                    <Field id="cuentaField" name="cuenta2" placeholder="Cuenta 2" />

                    <label htmlFor="cuenta3">Cuenta3</label>
                    <Field id="cuentaField" name="cuenta3" placeholder="Cuenta 3" />

                    <button type="submit">Fetch Data</button>
                </Form>
            </Formik>
            <Chart options={options} series={series} type="line" width="80%" />
        </div>
    );
}

export default LineChart;