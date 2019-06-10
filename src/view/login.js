import React, { Component } from 'react';
import '@/common/less/login.less'
import { Form, Icon, Input, Button, Checkbox  } from 'antd'
import { setImageBackground } from '@/common/utils/login_back.js'

class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className="form_box">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item className="form-bottom_btn">
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
                <div>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </div>
                Or <a href="">register now!</a>
            </Form.Item>
        </Form>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

class Login extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        setImageBackground(this.refs.loginBox)
        // console.log(this.refs.loginBox)
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }
    render() {
        return (
            <div className="login-box" ref="loginBox">
                <div className="login-form">
                    <WrappedNormalLoginForm></WrappedNormalLoginForm>
                </div>
            </div>
        )
    }
}

export default Login