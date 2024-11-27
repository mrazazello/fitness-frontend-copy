import { Col, Row, Spin } from "antd";
import { SpinSize } from "antd/lib/spin";

type PreloadProperties = {
  size?: SpinSize;
  message?: string;
};

const Preloader = ({ size = "large", message }: PreloadProperties) => {
  return (
    <Row justify="center">
      <Col flex="0 0 auto">
        <Spin size={size} tip={message} />
      </Col>
    </Row>
  );
};

export default Preloader;
