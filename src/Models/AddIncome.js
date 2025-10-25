import React from "react";
import {
    Card,
    Col,
    Row,
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
} from "antd";

function AddIncome({
    isIncomeModalVisible,
    handleIncomeCancel,
    onFinish,
}) {
    const [form] = Form.useForm();

    return (
        <Modal
            style={{ fontWeight: 600 }}
            title="Add Income"
            visible={isIncomeModalVisible}
            onCancel={handleIncomeCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values, "income");
                    form.resetFields();
                }}>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of the transaction!",
                        },
                    ]}
                >
                    <Input type="text" className="custom-input" />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input the amount of the transaction!",
                        },
                    ]}
                >
                    <Input type="number" className="custom-input" />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "Please select the date of the transaction!",
                        },
                    ]}
                >
                    <DatePicker className="custom-input" format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Tag"
                    name="tag"
                    rules={[
                        {
                            required: true,
                            message: "Please select a tag for the transaction!",
                        },
                    ]}
                >
                    <Select className="select-input-2">
                        <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
                        <Select.Option value="other">Other</Select.Option>

                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button className="btn btn-blue" type="primary" htmlType="submit">
                        Add Income
                    </Button>
                </Form.Item>
            </Form>

        </Modal>

    )

}


export default AddIncome;