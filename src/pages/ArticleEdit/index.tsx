import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormTextArea,
  ProFormUploadDragger
} from '@ant-design/pro-components';
import {Form, message, Modal, UploadFile, UploadProps} from 'antd';
import MarkdownIt from 'markdown-it';
import React, {useState} from 'react';

import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {RcFile} from "antd/es/upload";
import {ProFormText} from "@ant-design/pro-form/lib";
import {currentArticleUsingGET} from "@/services/swagger/articleController";

const query = window.location.search;
const params = new URLSearchParams(query);


const mdParser = new MarkdownIt(/* Markdown-it options */);


function handleEditorChange({ html, text }: { html: string; text: string }) {
  console.log('handleEditorChange', html, text);
}

const ArticleEdit: React.FC =() => {
  const [fileList, setFileList] = useState<UploadFile[]>();
  let [form] = Form.useForm()
  let articleId: string | null = "";
  const [article, setArticle] = useState<API.ArticleVO>();
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  if (params.has("id")) {
    articleId = params.get("id");
  }
  const  currentArticleById = async () => {
    const articleById = await currentArticleUsingGET({
      id: articleId as string
    })
    if (articleById.data) {
      setArticle(articleById.data)
    }
  }

  currentArticleById();

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

  const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
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
      <ProCard split="vertical">
        <ProCard title="文章信息" colSpan="20%">
          <ProForm
            params={{id: '100'}}
            formKey="base-form-use-demo"

          >
            <ProFormText
              width="md"
              name="title1"
              label="文章标题"
              placeholder="请输入标题"
              rules={[{required: true, message: '请输入文章标题'}]}
            />
            <ProFormSelect
              name="select"
              label="文章分类"
              valueEnum={{
                china: 'China',
                usa: 'U.S.A',
              }}
              placeholder="选择文章分类"
              rules={[{required: true, message: '请选择一个文章分类'}]}
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
                maxTagCount: 2,
                onChange: onTagFinish
              }}
              placeholder="请添加标签"
              rules={[
                {required: true, message: '请至少添加一个标签', type: 'array'},
              ]}
            />
            <ProFormUploadDragger
              name="drag-pic"
              label="文章封面"
              title="请上传一张封面，多余的图片将会被覆盖"
              description="建议尺寸：1303*734px"
              fieldProps={{
                listType: "picture-card",
                fileList: fileList,
                onPreview: handlePreview,
                onChange: handleChange,
                maxCount: 1
              }}
            />
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage}/>
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
                {required: true, message: '请填写文章摘要'},
              ]}
            />
          </ProForm>
        </ProCard>
        <ProCard title="文章修改" headerBordered >
          <MdEditor
            value={article?.content}
            style={{height: 600}}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default ArticleEdit;
