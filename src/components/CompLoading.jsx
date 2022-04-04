import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"

export default function CompLoading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}>
      <div>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    </div>
  )
}
