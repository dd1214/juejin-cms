import { addRule } from '@/services/ant-design-pro/api';
import { currentListArticleUsingPOST } from '@/services/swagger/articleController';
import ProCard from '@ant-design/pro-card';
import {
  ActionType,
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Avatar, Button, Drawer, message, Space, Tag } from 'antd';
import MarkdownIt from 'markdown-it';
import React, { useRef, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
const mdParser = new MarkdownIt(/* Markdown-it options */);
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('Configuring');
//   try {
//     await updateRule({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();
//
//     message.success('Configuration is successful');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Configuration failed, please try again!');
//     return false;
//   }
// };

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: API.RuleListItem[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide();
//     message.success('Deleted successfully and will refresh soon');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Delete failed, please try again');
//     return false;
//   }
// };

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ArticleVO>();
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [selectedRowsState, setSelectedRows] = useState<API.ArticleVO[]>([]);
  const actionRef = useRef<ActionType>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

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
      width: 250,
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
      width: 80,
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
      width: 80,
    },
    {
      title: '点赞数',
      sorter: true,
      dataIndex: 'collectCount',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '评论数',
      sorter: true,
      dataIndex: 'commentCount',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'articleStatus',
      width: 120,
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
        <a key="editable">编辑</a>,
        <a key="delete" onClick={() => {}}>
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

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      {/*<UpdateForm*/}
      {/*  onSubmit={async (value) => {*/}
      {/*    const success = await handleUpdate(value);*/}
      {/*    if (success) {*/}
      {/*      handleUpdateModalOpen(false);*/}
      {/*      setCurrentRow(undefined);*/}
      {/*      if (actionRef.current) {*/}
      {/*        actionRef.current.reload();*/}
      {/*      }*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  onCancel={() => {*/}
      {/*    handleUpdateModalOpen(false);*/}
      {/*    if (!showDetail) {*/}
      {/*      setCurrentRow(undefined);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  updateModalOpen={updateModalOpen}*/}
      {/*  values={currentRow || {}}*/}
      {/*/>*/}

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
          <ProCard title="左侧详情" colSpan="30%">
            从v但是
          </ProCard>
          <ProCard title={currentRow?.title} headerBordered headStyle={{ color: 'red' }}>
            <div style={{ marginBottom: 20 }}>
              <Avatar size={32} src={currentRow?.avatar} /> &nbsp; {currentRow?.author}{' '}
              &nbsp;&nbsp;&nbsp;
              <Tag color="success">{currentRow?.category}</Tag>
            </div>
            <MdEditor
              style={{ maxWidth: 500 }}
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
