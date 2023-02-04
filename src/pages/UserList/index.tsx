import { currentUserListUsingPOST, deleteUserUsingGET } from '@/services/swagger/userController';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import {
  ActionType,
  DrawerForm,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { ProFormText } from '@ant-design/pro-form/lib';
import { Avatar, Card, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';

const TableList: React.FC = () => {
  const { Meta } = Card;
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [userId, setUserId] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const showModal = (id: string) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const deleteArticle = await deleteUserUsingGET({
      id: userId,
    });
    if (deleteArticle) {
      message.success('删除成功！');
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUserId(undefined);
  };

  const columns: ProColumns<API.UserVO>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'image',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'text',
      align: 'center',
      render: (dom, entity) => (
        <a
          onClick={() => {
            setIsUserOpen(true);
            setCurrentRow(entity);
          }}
        >
          {dom}
        </a>
      ),
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      ellipsis: true,
      valueType: 'text',
      width: 150,
      align: 'center',
    },
    {
      title: '阅读量',
      dataIndex: 'viewCount',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '点赞数',
      dataIndex: 'collectCount',
      valueType: 'digit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      align: 'center',
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '冻结', status: 'Processing' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'currentTime',
      valueType: 'dateTime',
      align: 'center',
      width: 150,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (dom, entity) => [
        <a
          key="editable"
          onClick={() => {
            setShowDetail(true);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            showModal(entity.userid as string);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.UserVO>
        actionRef={actionRef}
        rowKey="userid"
        search={{
          labelWidth: 120,
        }}
        // @ts-ignore
        request={async (params) => {
          const result = await currentUserListUsingPOST({
            current: params?.current,
            pageSize: params?.pageSize,
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
      <Modal title="高危操作警告！！！" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p style={{ fontSize: 16 }}>当前正在删除 id 为 {userId} 的用户，</p>
        <p style={{ fontSize: 16, color: 'red' }}>
          此操作属于高危操作，删除后将无法恢复，请谨慎决定！
        </p>
      </Modal>
      <DrawerForm<{
        name: string;
        company: string;
      }>
        width={600}
        open={showDetail}
        onOpenChange={setShowDetail}
        title="修改用户信息"
        autoFocusFirstInput
        drawerProps={{
          destroyOnClose: true,
        }}
        onFinish={async (values) => {
          console.log(values.name);
          message.success('提交成功');
          // 不返回不会关闭弹框
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="name"
            width="md"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            name="company"
            label="我方公司名称"
            placeholder="请输入名称"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
          <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: '盖章后生效',
              },
            ]}
            width="xs"
            name="useMode"
            label="合同约定生效方式"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '履行完终止',
              },
            ]}
            formItemProps={{
              style: {
                margin: 0,
              },
            }}
            name="unusedMode"
            label="合同约定失效效方式"
          />
        </ProForm.Group>
      </DrawerForm>

      <Modal
        title={currentRow?.nickname + '的用户卡片'}
        open={isUserOpen}
        onOk={() => {
          setIsUserOpen(false);
        }}
        onCancel={() => {
          setIsUserOpen(false);
        }}
      >
        <Card
          actions={[
            <span key="viewCount">
              {' '}
              <EyeOutlined /> {currentRow?.viewCount}
            </span>,
            <span key="collectCount">
              {' '}
              <LikeOutlined /> {currentRow?.collectCount}
            </span>,
          ]}
        >
          <Meta
            avatar={<Avatar src={currentRow?.avatar} />}
            title={currentRow?.nickname}
            description={currentRow?.introduction}
          />
        </Card>
      </Modal>
    </PageContainer>
  );
};

export default TableList;
