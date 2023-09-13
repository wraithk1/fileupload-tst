import React, { useContext } from 'react'
import { Badge, Space } from 'antd'
import _ from 'lodash'
import Picture from '../Picture'
import Text from '../Text'
import { DataContext } from '../../App'
import { getFormatedDate } from '../../utils'

function FileList() {
  const {data} = useContext(DataContext)
  
  const groupedFiles = _.groupBy(_.orderBy(data?.files, 'createdAt'), (f) => getFormatedDate(f.createdAt))
  
  return (
    <Space direction='vertical' size={40} style={{ padding: '50px', paddingTop: 0 }}>
      {_.map(_.toPairs(groupedFiles), ([date, files], idx) => (
        <Space key={idx} direction='vertical' size={15}>
          <Space direction='horizontal' size={10}>
            <Text variant='h1' color='gray-200' text={getFormatedDate(date)} />
            <Badge count={files.length} showZero className='text-h3' style={{ background: 'var(--green-color)' }} />
          </Space>
          <Space direction='horizontal' size={15}>
            {_.map(files, (item) => (
              <Picture item={item} key={item._id} />
            ))}
          </Space>
        </Space>
      ))}
    </Space>
  )
}

export default FileList