import { Col, Form } from 'antd';
import React from 'react';

function FormItem({ label, name, rules = [], element, disabled }) {
    return (
        <Col span={12}>
            <Form.Item label={label} name={name} rules={rules.map((rule) => ({ ...rule, message: `${label} is required` }))}>
                {React.cloneElement(element, { disabled: disabled })}
            </Form.Item>
        </Col>
    );
}

export default FormItem;
