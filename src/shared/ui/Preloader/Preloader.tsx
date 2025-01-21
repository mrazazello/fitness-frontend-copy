import { Col, Row, Spin } from "antd";
import type { SpinSize } from "antd/lib/spin";

type PreloadProperties = {
  size?: SpinSize;
  message?: string;
};

const Preloader = ({ size = "large", message }: PreloadProperties) => {
  return (
    <Row justify="center">
      <Col>
        <Spin size={size}>{message}</Spin>
      </Col>
    </Row>
  );
};

export default Preloader;
