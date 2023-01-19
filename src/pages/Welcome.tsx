import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import MarkdownIt from 'markdown-it';
import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import { CloudUploadOutlined, SendOutlined } from '@ant-design/icons';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }: { html: string; text: string }) {
  console.log('handleEditorChange', html, text);
}
const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
          }}
        >
          {' '}
          <Form name="basic" initialValues={{ remember: true }} autoComplete="off">
            <Row>
              <Col span={17}>
                <Form.Item
                  label="标题"
                  name="title"
                  rules={[{ required: true, message: '请输入标题' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={3} style={{ marginLeft: '20px' }}>
                <Form.Item>
                  <Button htmlType="submit">
                    <CloudUploadOutlined />
                    草稿箱
                  </Button>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    <SendOutlined />
                    发布
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
        );
      </Card>
    </PageContainer>
  );
};

export default Welcome;
