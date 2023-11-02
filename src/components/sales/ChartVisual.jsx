import { useEffect, useRef } from 'react';
import * as echarts from "echarts";

function ChartVisual({ items }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const options = {
      color: ['#3b82f6'], 
      title: {
        text: '各商品銷售額',
        x: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 18,
        },
        top: '5%',
      },
      tooltip: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { show: false, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: false },
          saveAsImage: { show: true }
        }
      },
      grid: {
        left: '2%',           // 調整圖表與左側的距離
        top: '14%',
        containLabel: true,
      },
      yAxis: {
        type: 'category',
        data: items.map(item => item.product_name),
        axisLabel: {
          fontSize: 14,       // 調整字體大小
          margin: 22,         // 調整刻度標籤距離軸線的距離
        },
        name: '商品',
        nameTextStyle: {
          fontSize: 14,
          padding: [20, 0, 0, 0],
        },
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 13,    
          margin: 20,
        },
        name: '金額',
        nameTextStyle: {
          fontSize: 14, 
          padding: [0, 0, 0, 20], 
        },
      },
      series: [
        {
          name: '銷售額',
          type: 'bar',
          // data: items.map(item => item.total_amount),  原本不顯示文字的寫法
          data: items.map(item => ({
            value: item.total_amount,
            label: {                   //  顯示銷售額數字
              show: false,
              position: 'insideRight', // 顯示在長條圖右側
            },
          })),
        },
      ],
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [items]);

  return (
    <section>
      <div className='pr-8'>
        <div ref={chartRef} style={{ width: '100%', height: '670px' }} />
      </div>
    </section>
  )
}

export default ChartVisual