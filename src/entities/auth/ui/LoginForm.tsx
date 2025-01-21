import { Button, Card, Form, Input, Space } from "antd";
import { useCallback } from "react";

import { ShowErrorMessages, errorActions } from "@shared/api/error";
import * as form from "@shared/constants/formsWrappers";
import { useAppDispatch } from "@shared/hooks/useAppStore";

import { login } from "../model/service/login";
import type { ILoginFormValues } from "../model/types/auth";

type TProps = {
  loading: boolean;
};

export const LoginForm = (props: TProps) => {
  const { loading } = props;
  const dispatch = useAppDispatch();

  const onFinish = useCallback((values: ILoginFormValues) => {
    void dispatch(errorActions.resetErrors());
    void dispatch(
      login({
        username: values.username,
        password: values.password
      })
    );
  }, []);

  return (
    <Card>
      <ShowErrorMessages />
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex"
        }}
      >
        <Form
          name="authorization"
          labelCol={form.LebelCol}
          wrapperCol={form.WrapperCol}
          onFinish={onFinish}
          autoComplete="off"
          disabled={loading}
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите имя пользователя"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: "Пожалуйста укажите пароль"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={form.SubmitCol}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};
