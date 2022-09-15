import React, { useCallback, useState } from 'react'

import useLog, { LogContext } from './hooks/useLog'

// useLog
// function Home() {
//   const [dom, reportMessage] = useLog()
//   return (
//     <div>
//       {/* 监听内部点击 */}
//       <div ref={dom}>
//         <p> 《React进阶实践指南》</p>
//         <button> 按钮 one (内部点击) </button>
//         <button> 按钮 two (内部点击) </button>
//         <button> 按钮 three (内部点击) </button>
//       </div>
//       {/* 外部点击 */}
//       <button
//         onClick={() => {
//           console.log(reportMessage)
//         }}
//       >
//         {' '}
//         外部点击{' '}
//       </button>
//     </div>
//   )
// }
// const Index = React.memo(Home) /*  阻断 useState 的更新效应  */
// export default function Root() {
//   const [value, setValue] = useState({})
//   return (
//     <LogContext.Provider value={value}>
//       <Index />
//       <button
//         onClick={() =>
//           setValue({ name: '《React进阶实践指南》', author: '我不是外星人' })
//         }
//       >
//         点击
//       </button>
//     </LogContext.Provider>
//   )
// }

// useQueryTable

const columns = [
  {
    title: '商品名称',
    dataIndex: 'id',
    key: 'giftName',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '图片',
    dataIndex: 'giftImage',
    key: 'giftImage',
    render: (text) => (
      <div>
        <img src={text} style={{ width: '70px', height: '70px' }} />
      </div>
    ),
  },
]

const inputStyle = { width: '200px', marginRight: '24px' }

import { listData } from '../mock'
import useQueryTable from './hooks/useQueryTable'
import { Table, Input, Select } from 'antd'

const Option = Select.Option

function threeNumberRandom() {
  const result = []
  while (result.length < 3) {
    const number = parseInt(Math.random() * 9)
    if (result.indexOf(number) === -1) result.push(number)
  }
  return result
}

/* 模拟数据请求 */
function getTableData(payload) {
  return new Promise((resolve) => {
    Promise.resolve().then(() => {
      const { list } = listData
      const arr = threeNumberRandom() // 生成三个随机数 模拟数据交互
      console.log('请求参数：', payload)
      resolve({
        ...listData,
        list: [list[arr[0]], list[arr[1]], list[arr[2]]],
        total: list.length,
        current: payload.page || 1,
      })
    })
  })
}
function Index() {
  const [table, form] = useQueryTable({ pageSize: 3 }, getTableData)
  const { formData, setFormItem, reset } = form
  const { pagination, tableData, getList, handerChange } = table
  return (
    <div style={{ margin: '30px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Input
          onChange={(e) => setFormItem('name', e.target.value)}
          placeholder="请输入名称"
          style={inputStyle}
          value={formData.name || ''}
        />
        <Input
          onChange={(e) => setFormItem('price', e.target.value)}
          placeholder="请输入价格"
          style={inputStyle}
          value={formData.price || ''}
        />
        <Select
          onChange={(value) => setFormItem('type', value)}
          placeholder="请选择"
          style={inputStyle}
          value={formData.type}
        >
          <Option value="1">家电</Option>
          <Option value="2">生活用品</Option>
        </Select>
        <button className="searchbtn" onClick={() => getList()}>
          提交
        </button>
        <button className="concellbtn" onClick={reset}>
          重置
        </button>
      </div>
      {useCallback(
        <Table
          columns={columns}
          dataSource={tableData.list}
          height="300px"
          onChange={(res) => {
            handerChange(res.current, res.pageSize)
          }}
          pagination={{
            ...pagination,
            total: tableData.total,
            current: tableData.current,
          }}
          rowKey="id"
        />,
        [tableData]
      )}
    </div>
  )
}

export default Index
