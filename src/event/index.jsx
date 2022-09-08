import { BusService } from './eventBus'
import React, { useState } from 'react'
/* event Bus  */
function Son() {
  const [fatherSay, setFatherSay] = useState('')
  React.useEffect(() => {
    BusService.on('fatherSay', (value) => {
      /* 事件绑定 , 给父组件绑定事件 */
      setFatherSay(value)
    })
    return function () {
      BusService.off('fatherSay') /* 解绑事件 */
    }
  }, [])
  return (
    <div className="son">
      我是子组件
      <div> 父组件对我说：{fatherSay} </div>
      <input
        placeholder="我对父组件说"
        onChange={(e) => BusService.emit('childSay', e.target.value)}
      />
    </div>
  )
}
/* 父组件 */
export function Father() {
  const [childSay, setChildSay] = useState('')
  React.useEffect(() => {
    /* 事件绑定 , 给子组件绑定事件 */
    BusService.on('childSay', (value) => {
      setChildSay(value)
    })
    return function () {
      BusService.off('childSay') /* 解绑事件 */
    }
  }, [])
  return (
    <div className="box father">
      我是父组件
      <div> 子组件对我说：{childSay} </div>
      <input
        placeholder="我对子组件说"
        onChange={(e) => BusService.emit('fatherSay', e.target.value)}
      />
      <Son />
    </div>
  )
}
