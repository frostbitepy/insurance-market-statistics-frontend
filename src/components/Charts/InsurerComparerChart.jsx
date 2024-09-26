import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

function InsurerComparerChart() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [cuenta, setCuenta] = useState('');
    const [loading, setLoading] = useState(false);

    const series = [
        {
            name: "Total Activos 1",
            data: data1.map(item => item[cuenta] ? parseInt(item[cuenta]['$numberLong']) :0).reverse()
        },
        {
            name: "Total Activos 2",
            data: data2.map(item => item[cuenta] ? parseInt(item[cuenta]['$numberLong']) : 0).reverse()
        },
        {
            name: "Total Activos 3",
            data: data3.map(item => item[cuenta] ? parseInt(item[cuenta]['$numberLong']) : 0).reverse()
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
        setLoading(true);
        const { insurer_id1, insurer_id2, insurer_id3, cuenta } = values;
        setCuenta(cuenta);
        const response1 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id1}/${cuenta}`);
        const response2 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id2}/${cuenta}`);
        const response3 = await axios.get(`http://localhost:8000/field_values_insurer/${insurer_id3}/${cuenta}`);
        setData1(response1.data.results);
        console.log(response1);
        setData2(response2.data.results);
        console.log(response2);
        setData3(response3.data.results);
        console.log(response3);
        setLoading(false);
    }

    return(
        <div style={{ width: "100vw", height: "100vh", background: "gray" }}>
            <Formik
                initialValues={{ insurer_id1: '', insurer_id2: '', insurer_id3: '', cuenta: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="insurer_id1">Insurer ID 1</label>
                    <Field id="insurer_id1Field" name="insurer_id1" placeholder="Insurer ID 1" />

                    <label htmlFor="insurer_id2">Insurer ID 2</label>
                    <Field id="insurer_id2Field" name="insurer_id2" placeholder="Insurer ID 2" />

                    <label htmlFor="insurer_id3">Insurer ID 3</label>
                    <Field id="insurer_id3Field" name="insurer_id3" placeholder="Insurer ID 3" />

                    <label htmlFor="cuenta">Cuenta</label>
                    <Field id="cuentaField" name="cuenta" placeholder="Cuenta" />

                    <button type="submit">Fetch Data</button>
                </Form>
            </Formik>
            {loading ? (
                <dir>Loading...</dir>
            ) : ( 
                <Chart options={options} series={series} type="line" width="80%" />
            )}
        </div>
    );
}


export default InsurerComparerChart;