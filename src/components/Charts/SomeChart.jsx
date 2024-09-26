import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Formik, Field, Form } from 'formik';
import axios from "axios";

function SomeChart() {
    const [names, setNames] = useState([]);
    const [monto, setMonto] = useState([]);
    const series = [
        {
            name: "Monto",
            data: monto
        },
    ];
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: names
        }
    }

    const handleSubmit = async (values) => {
        const year = values.year;
        const month = values.month;
        const cuenta = values.cuenta;
        const response = await axios.get(`http://localhost:8000/all_field_values/${year}/${month}/${cuenta}`);
        setNames(response.data[0]);
        setMonto(response.data[1]);
    }

    return(
        <div style={{ width: "100vw", height: "100vh", background: "gray" }}>
            <Formik
                initialValues={{ year: '', month: '', cuenta: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="year">Year</label>
                    <Field id="yearField" name="year" placeholder="year" />

                    <label htmlFor="month">Month</label>
                    <Field id="monthField" name="month" placeholder="month" />

                    <label htmlFor="cuenta">Cuenta</label>
                    <Field id="cuentaField" name="cuenta" placeholder="cuenta" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <Chart options={options} type="bar" series={series} width="80%" />
        </div>
    );
}

export default SomeChart;