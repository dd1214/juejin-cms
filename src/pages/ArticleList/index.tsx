import {currentListArticleUsingPOST, deleteArticleUsingPOST} from '@/services/swagger/articleController';
import ProCard from '@ant-design/pro-card';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import {Avatar, Button, Drawer, message, Modal, Space, Tag} from 'antd';
import MarkdownIt from 'markdown-it';
import React, { useRef, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import {Link} from "@umijs/renderer-react";
const mdParser = new MarkdownIt(/* Markdown-it options */);


const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ArticleVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.ArticleVO[]>([]);
  const actionRef = useRef<ActionType>();
  const [articleId,setArticleId] = useState<string>()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id:string) => {
    setArticleId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const deleteArticle = await deleteArticleUsingPOST({
      id:articleId
    })
    if (deleteArticle){
      message.success("删除成功！")
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setArticleId(undefined);
  };

  const columns: ProColumns<API.ArticleVO>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      align: 'center',
      ellipsis: true,
      render: (dom) => {
        return (
          <Space>
            <a>{dom}</a>
          </Space>
        );
      },
    },
    {
      title: '作者',
      dataIndex: 'avatar',
      valueType: 'avatar',
      align: 'center',
      render: (dom, entity) => {
        return (
          <Space>
            <span>{dom}</span>
            <a>{entity.author}</a>
          </Space>
        );
      },
    },
    {
      title: '标签',
      dataIndex: 'category',
      valueType: 'text',
      align: 'center',
      onFilter: true,
      filters: true,
      render: (_, record) => (
        <Space>
          <Tag key={record.category} color={'blue'}>
            {record.category}
          </Tag>
        </Space>
      ),
    },
    {
      title: '阅读数',
      sorter: true,
      dataIndex: 'viewCount',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '点赞数',
      sorter: true,
      dataIndex: 'collectCount',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '评论数',
      sorter: true,
      dataIndex: 'commentCount',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'articleStatus',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        2: { text: '已发布', status: 'Success' },
        0: { text: '草稿箱', status: 'Default' },
        1: { text: '审核中', status: 'Processing' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (dom, entity) => [
        <a
          key="view"
          onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true);
          }}
        >
          查看
        </a>,
        <Link key="edit" to={"/article/edit?id=" + entity.articleID}>编辑</Link>,
        <a key="delete"
           onClick={() => {
            showModal(entity.articleID as string)
        }}>
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ArticleVO>
        headerTitle="文章管理"
        actionRef={actionRef}
        rowKey="articleID"
        search={{
          labelWidth: 120,
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        // @ts-ignore
        request={async (params) => {
          const result = await currentListArticleUsingPOST({
            current: params?.current,
            pageSize: params?.pageSize,
            articleStatus: -1,
            sortField: '',
            sortOrder: '',
          });
          if (result.data !== undefined) {
            return {
              data: result.data.list,
              success: true,
              total: result.data.total,
            };
          }
        }}
        columns={columns}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <Modal title="高危操作警告！！！" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p style={{fontSize:16}}>当前正在删除 id 为 {articleId} 的文章，</p>
        <p style={{fontSize:16 , color:"red"}} >此操作属于高危操作，删除后将无法恢复，请谨慎决定！</p>
      </Modal>
      <Drawer
        width={800}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        <ProCard split="vertical">
          {/*左边栏   可扩展目录*/}
          {/*<ProCard title="左侧详情" colSpan="30%">*/}
          {/*</ProCard>*/}
          <ProCard title={currentRow?.title} headerBordered headStyle={{ color: 'red' }}>
            <div style={{ marginBottom: 20 }}>
              <Avatar size={32} src={currentRow?.avatar} /> &nbsp; {currentRow?.author}{' '}
              &nbsp;&nbsp;&nbsp;
              <Tag color="success">{currentRow?.category}</Tag>
            </div>
            <MdEditor
              value={currentRow?.content}
              renderHTML={(text) => mdParser.render(text)}
              readOnly={true}
              view={{ menu: false, md: false, html: true }}
              canView={{
                menu: false,
                md: false,
                html: true,
                both: true,
                fullScreen: false,
                hideMenu: false,
              }}
            />
          </ProCard>
        </ProCard>
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
