import { addRule } from '@/services/ant-design-pro/api';
import { currentListArticleUsingPOST } from '@/services/swagger/articleController';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { message, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

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
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

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
      dataIndex: 'view_count',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '点赞数',
      sorter: true,
      dataIndex: 'collect_count',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '评论数',
      sorter: true,
      dataIndex: 'comment_count',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 80,
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        1: { text: '已发布', status: 'Success' },
        0: { text: '草稿箱', status: 'Default' },
        2: { text: '审核中', status: 'Processing' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.article_id);
          }}
        >
          编辑
        </a>,
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
        rowKey="article_id"
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          const result = await currentListArticleUsingPOST({
            current: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: result.data,
            success: true,
            total: 200,
          };
        }}
        columns={columns}
      />
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

      {/*<Drawer*/}
      {/*  width={600}*/}
      {/*  open={showDetail}*/}
      {/*  onClose={() => {*/}
      {/*    setCurrentRow(undefined);*/}
      {/*    setShowDetail(false);*/}
      {/*  }}*/}
      {/*  closable={false}*/}
      {/*>*/}
      {/*  {currentRow?.name && (*/}
      {/*    <ProDescriptions<API.RuleListItem>*/}
      {/*      column={2}*/}
      {/*      title={currentRow?.name}*/}
      {/*      request={async () => ({*/}
      {/*        data: currentRow || {},*/}
      {/*      })}*/}
      {/*      params={{*/}
      {/*        id: currentRow?.name,*/}
      {/*      }}*/}
      {/*      columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</Drawer>*/}
    </PageContainer>
  );
};

export default TableList;
