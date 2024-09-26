import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import SomeTable from '../../components/Tables/SomeTable';

function TableDisplay() {

    return (
        <div>
            <h2>Table Display</h2>
            <SomeTable />
        </div>
    );
}

export default TableDisplay;