import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Charts = () => {
  const options = {

    chart: {
        type: 'column'
       },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };
  const options2 = {

    chart: {
        type: 'pie'
       },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };
  return (
    <div className="charts">

      <div className="flex gap-[30px] mt-[30px]">
        <div
          className=""
          style={{
            background:
              'linear-gradient(71.65deg, #B2ADF4 0.38%, #F0DDFF 69.03%)',
          }}
        >
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div
          className=""
          style={{
            background:
              'linear-gradient(71.65deg, #B2ADF4 0.38%, #F0DDFF 69.03%)',
          }}
        >
          <HighchartsReact highcharts={Highcharts} options={options2} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
