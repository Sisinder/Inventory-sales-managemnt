import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import axios from 'axios';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ClientForm = () => {
  const onFinish = async (values) => {
    try {
      const url = 'http://localhost:8080/api/client'; // Change the URL to match your server endpoint
      const response = await axios.post(url, values);
      console.log(response.data);
      // Clear the form after successful submission
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          width: '400px',
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="number"
          label="Phone Number"
          rules={[
            {
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gst"
          label="GSTIN Number"
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClientForm;
