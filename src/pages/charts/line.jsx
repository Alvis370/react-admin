import React from 'react';
import { Card, Button } from 'antd';
import ReactECharts from 'echarts-for-react';

export default function Line() {

  const [sales, setSales] = React.useState([5, 20, 36, 10, 10, 20]);
  const [storage, setStorage] = React.useState([15, 25, 46, 30, 22, 25]);

  const update = () => {
    let sa = sales.map(sale => {
      return sale + 1;
    });

    let st = storage.reduce((pre, store) => {
      pre.push(store - 1);
      return pre;
    }, []);

    setSales(sa);
    setStorage(st);
  }

  const getOption = (sales, storage) => {
    return {
      title: {
        text: 'ECharts入门示例'
      },
      tooltip: {},
      legend: {
        data: ['Sales', 'Storage']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: 'Sales',
        type: 'line',
        data: sales
      }, {
        name: 'Storage',
        type: 'line',
        data: storage
      }]
    };
  }

  return (
    <div>
      <Card>
        <Button type='primary' onClick={update}>Update</Button>
      </Card>

      <Card title='Line chart'>
        <ReactECharts
          option={getOption(sales, storage)}
        />

      </Card>
    </div>
  )
}
