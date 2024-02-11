import { useRef, useState } from "react";
import {
  Select,
  Space,
  Form,
  Result,
  Button,
  InputNumber,
  DatePicker,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import { CoinTitle } from "./CoinTitle";

const validateMessages = {
    required: '${label} is required',
    types: {
        number: '${label} is not valid number',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    }
}

export default function AddForm({onClose}) {
  const [form] = Form.useForm()
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState();
  const [sumbit, setSubmit] = useState(false)
  const assetRef = useRef()

  const onFinish = (values) => {
    const newAsset = {
        id: coin.id,
        amount: +values.amount,
        price: +values.price,
        date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset;
    setSubmit(true);
    addAsset(newAsset);
  };

  function handleAmountChange(value){
    const price = form.getFieldValue('price');
    form.setFieldsValue({
        total: +(value * price).toFixed(2),
    })
  }

  function handlePriceChange(value){
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
        total: +(value * amount).toFixed(2)
    })
  }

  if(sumbit){
    return(
        <Result
        status="success"
        title="Assets successfully added!"
        subTitle= {`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{ alignItems: "center" }}>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.value}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  return (
    <>
      <CoinTitle coin={coin}/>

      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          price: coin.price.toFixed(2),
          amount: 1,
          total: coin.price.toFixed(2),
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item  label="Price" name="price">
          <InputNumber onChange={handlePriceChange}  style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime/>
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
