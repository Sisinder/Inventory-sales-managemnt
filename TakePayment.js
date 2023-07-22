import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
};

const TakePayment = () => {
  const [clients, setClients] = useState([]);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setpaymentMethod] = useState('Cash'); // New state for payment method
  const [form] = Form.useForm(); 
  const [date, setDate] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);


  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/client');
      setClients(response.data);
    } catch (error) {
      console.log('Error fetching clients:', error);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleClientChange = (value) => {
    const selectedClient = clients.find((client) => client.customerName === value);
    console.log(selectedClient);
    if (selectedClient) {
      setBalance(selectedClient.balance);
    } else {
      setBalance(0);
    }
  };
  const handleDateChange = (date) => {
    setDate(date);
  };

  const handlePaymentMethodChange = (value) => {
    setpaymentMethod(value);
  };

  const onFinish = async (values) => {
    console.log(values);
    const { customerName, amount, paymentMethod } = values;
    const dataToSubmit = {
      customerName,
      amount,
      paymentMethod,
      date: date ? date.format('YYYY-MM-DD') : null,
    };

    try {
      await axios.post('http://localhost:8080/api/payment', dataToSubmit);
      console.log('Payment submitted successfully');
      setAmount('');
      setpaymentMethod('Cash');
    const selectedClient = clients.find((client) => client.customerName === customerName);
    console.log(selectedClient);
    if (selectedClient) {
      const updatedBalance = selectedClient.balance - amount;
      await axios.put(`http://localhost:8080/api/client/${selectedClient._id}`, { balance: updatedBalance });
      console.log('Client balance updated successfully');
      setBalance(updatedBalance);
    }
    form.resetFields();
    } catch (error) {
      console.log('Error submitting payment:', error);
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      form={form}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <h1 style={{ textAlign: 'center' }}>Payments</h1> {/* Title displayed in the center */}
      
      <Form.Item
        name={['customerName']}
        label="Customer's Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={handleClientChange}>
          {clients.map((client) => (
            <Option key={client.id} value={client.customerName}>
              {client.customerName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name={['balance']} label="Balance"> {/* Update the name attribute here */}
        <Input value={balance} disabled style={{ fontWeight: 'bold', backgroundColor: 'white' }}/>
      </Form.Item>
      <Form.Item name={['date']} label="Date">
        <DatePicker onChange={handleDateChange} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name={['paymentMethod']} label="Payment Method"> {/* Add new form field */}
        <Select value={paymentMethod} defaultValue="Cash" onChange={handlePaymentMethodChange}>
          <Option value="Cash">Cash</Option>
          <Option value="UPI">UPI</Option>
          <Option value="Online">Online</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['amount']} label="Amount">
        <Input value={amount} onChange={handleAmountChange} />
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
  );
};

export default TakePayment;
