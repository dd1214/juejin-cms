import { currentUserListUsingPOST, deleteUserUsingGET } from '@/services/swagger/userController';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import {
  ActionType,
  DrawerForm,
  PageContainer,
  ProColumns, ProFormSelect,
  ProTable,
  ProForm,
} from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form/lib';
import { Avatar, Card, message, Modal, Form } from 'antd';
import React, { useRef, useState } from 'react';
import { ProFormUploadDragger } from "@ant-design/pro-form";

const TableList: React.FC = () => {
  const { Meta } = Card;
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [userRow, setUserRow] = useState<API.UserVO>();
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
  const userDetail = (data: any) => {
    console.log(data)
    setUserRow(data);
    return data;
  }

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
            userDetail(entity)
            setUserRow(entity);
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
          return true;
        }}
      >
        <ProForm initialValues={userDetail}>
          <ProFormText
            name="nickname"
            label="昵称"
            placeholder="请输入昵称"
            rules={[
              {
                required: true,
              },
            ]}
          />

          <ProFormText
            name="introduction"
            label="简介"
            placeholder="请输入简介"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormUploadDragger
            label="头像"
            name="avatar"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormSelect
            name="userStatus"
            label="状态"
            valueEnum={{
              0: '正常',
              1: '冻结',
            }}
            placeholder="请选择用户状态"
            rules={[{ required: true }]}
          />
        </ProForm>
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
