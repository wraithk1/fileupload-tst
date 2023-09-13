import React from 'react'
import { Skeleton, Space } from 'antd'

function Loader() {
  return (
    <Space direction='vertical' size={20} style={{ padding: '50px', paddingTop: 0 }}>
      <Skeleton.Input active size='default' style={{ borderRadius: '10px' }} />
      <Space direction='horizontal' size={15}>
        <Skeleton.Image active className='picture picture__loader--size_def' />
        <Skeleton.Image active className='picture picture__loader--size_def' />
        <Skeleton.Image active className='picture picture__loader--size_sm' />
        <Skeleton.Image active className='picture picture__loader--size_def' />
        <Skeleton.Image active className='picture picture__loader--size_sm' />
      </Space>
    </Space>
  )
}

export default Loader