import {CloudUploadOutlined, SendOutlined} from '@ant-design/icons';
import {
  DrawerForm,
  PageContainer,
  ProFormSelect,
  ProFormTextArea,
  ProFormUploadDragger
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {Button, Card, Form, Input, message, Modal, UploadFile, UploadProps} from 'antd';
import MarkdownIt from 'markdown-it';
import React, {useState} from 'react';

import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {RcFile} from "antd/es/upload";
const mdParser = new MarkdownIt(/* Markdown-it options */);


function handleEditorChange({ html, text }: { html: string; text: string }) {
  console.log('handleEditorChange', html, text);
}

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const onTagFinish = (value: any) => {
    if (value.length > 2) {
      value.pop();
      message.warning("最多只能选择2个标签");
    }
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

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
          <Form layout={'inline'}>
            <Form.Item
              label="输入标题"
              style={{ width: '76%' }}
              name="title"
              rules={[{ required: true, message: '标题为必填项' }]}
            >
              <Input placeholder="在此输入标题" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">
                <CloudUploadOutlined />
                草稿箱
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  setDrawerVisit(true);
                }}
              >
                <SendOutlined />
                发布
              </Button>
            </Form.Item>
          </Form>
        </div>
        <br />
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
        <DrawerForm<{
          name: string;
          company: string;
        }>
          title="发布文章"
          width={500}
          form={form}
          onOpenChange={setDrawerVisit}
          open={drawerVisit}
          autoFocusFirstInput
          drawerProps={{
            destroyOnClose: true,
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            console.log(values.name);
            message.success('提交成功');
            return true;
          }}
        >
          <ProFormSelect
            name="select"
            label="文章分类"
            valueEnum={{
              china: 'China',
              usa: 'U.S.A',
            }}
            placeholder="选择文章分类"
            rules={[{ required: true, message: '请选择一个文章分类' }]}
          />
          <ProFormSelect
            name="select-multiple"
            label="添加标签"
            valueEnum={{
              red: 'Red',
              green: 'Green',
              blue: 'Blue',
            }}
            fieldProps={{
              mode: 'multiple',
              maxTagCount:2,
              onChange:onTagFinish
            }}
            placeholder="请添加标签"
            rules={[
              { required: true, message: '请至少添加一个标签', type: 'array' },
            ]}
          />
          <ProFormUploadDragger
            name="drag-pic"
            label="文章封面"
            title="请上传一张封面，多余的图片将会被覆盖"
            description="建议尺寸：1303*734px"
            fieldProps={{
              listType:"picture-card",
              fileList: fileList,
              onPreview:handlePreview,
              onChange:handleChange,
              maxCount:1
            }}
          />
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          <ProFormTextArea
            fieldProps={{
              maxLength: 100,
              showCount: true
            }}
            name="text"
            label="编辑摘要"
            placeholder="请编辑文章摘要"
            rules={[
              { required: true, message: '请填写文章摘要' },
            ]}
          />
        </DrawerForm>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
