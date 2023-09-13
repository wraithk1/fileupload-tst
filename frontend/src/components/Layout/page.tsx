import React, { useContext } from "react"
import { DataContext } from "../../App"
import { Layout } from "antd"
import Loader from "../Loader"
import FileList from "../FileList"
import Empty from "../Empty"

function Page() {
  const { isLoading, data } = useContext(DataContext)

  if (isLoading) {
    return (
      <Layout.Content>
        <Loader />
      </Layout.Content>
    )
  }

  return (
    <>
      <Layout.Content>{data?.files != undefined && data.files.length > 0 ? <FileList /> : <Empty />}</Layout.Content>
    </>
  )
}

export default Page