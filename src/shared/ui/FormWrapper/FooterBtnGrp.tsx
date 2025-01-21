import { Button, Col, Row, Space } from "antd";

import { SubmitCol } from "@shared/constants/formsWrappers";

import "./footerBtnGrp.css";

type EProps = {
  onSave: () => void;
  onSaveAs?: () => void;
  onCancel: () => void;
};

export const FooterBtnGrp = (props: EProps) => {
  const { onSave, onSaveAs, onCancel } = props;

  return (
    <div className="footerBtnGrp">
      <Row>
        <Col md={SubmitCol.md} lg={SubmitCol.lg}>
          <Space>
            <Button type="primary" onClick={onSave}>
              Сохранить
            </Button>
            {onSaveAs && <Button onClick={onSaveAs}>Сохранить как</Button>}
            <Button onClick={onCancel}>Отменить</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};
