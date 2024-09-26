import React from 'react';
import SomeChart from '../../components/Charts/SomeChart';
import LineChart from '../../components/Charts/LinesChart';
import InsurerComparerChart from '../../components/Charts/InsurerComparerChart';

const Index = () => {
    return (
        <>
            <div style={{ width: "100vw", height: "100vh", background: "gray" }}>
                <InsurerComparerChart />
            </div>
        </>
    );
}

export default Index;