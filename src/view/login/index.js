import React, { Component } from 'react';
import '@/common/less/login.less'
import { Form, Icon, Input, Button, Checkbox, message  } from 'antd'
import { setImageBackground } from '@/common/utils/login_back.js'
import { login } from '@/js/api'


class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(this.state.form).then(res => {
                    console.log(res)
                    if (res && res.data) {
                        localStorage.setItem('token',res.data.token)
                        message.success('登陆成功')
                        this.props.history.push("/");
                    }
                })
            }
        });
    }
    constructor(props) {
        super(props)
        this.state = {
            form: {
                userName: '',
                password: '',
                remember: true
            }
        }
        console.log(this.props.history)
        this.setInp = function (type, val) {
            const form = { ...this.state.form }
            form[type] = val
            this.setState({
                form
            })
        }
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className='form_box'>
            <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入你的登陆账号!' }],
                    getValueFromEvent: (e) => {
                        this.setInp('userName', e.target.value)
                        return e.target.value
                    }
                })(
                    <Input
                    maxLength={11}
                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='账号'
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入你的密码!' }],
                    getValueFromEvent: (e) => {
                        this.setInp('password', e.target.value)
                        return e.target.value
                    }
                })(
                    <Input.Password
                    maxLength={11}
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='密码'
                    placeholder='Password'
                    />,
                )}
            </Form.Item>
            <Form.Item className='form-bottom_btn'>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                    getValueFromEvent: (e) => {
                        this.setInp('remember', e.target.checked)
                    }
                })(<Checkbox>记住登陆</Checkbox>)}
                <a className='login-form-forgot' href=''>
                    忘记密码
                </a>
                <div>
                    <Button 
                        type='primary' 
                        htmlType='submit' 
                        className='login-form-button'>
                        登陆
                    </Button>
                </div>
                <a href='' style={{
                    textAlign: 'center',
                    display: 'inline-block',
                    width: '100%' 
                }}>
                    登陆即可完成注册!
                </a>
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
            <div className='login-box' ref='loginBox'>
                <div className='login-form'>
                    <WrappedNormalLoginForm 
                        history={this.props.history}>
                    </WrappedNormalLoginForm>
                </div>
            </div>
        )
    }
}

export default Login