import { ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  StepsForm,
} from '@ant-design/pro-components';
import {useRef, useState} from 'react';
import {EditableProTable} from "@ant-design/pro-table";

import { MenuOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { arrayMoveImmutable, useRefFunction } from '@ant-design/pro-components';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import {message} from "antd";


type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};
const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '1590486176000',
    update_at: '1590486176000',
  },
  {
    id: 624691229,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '1590481162000',
    update_at: '1590481162000',
  },
];
const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',
    render: () => <DragHandle />,
    editable: (text, record, index) => {
      return index !== 0;
    },

  },
  {
    title: '活动名称',
    dataIndex: 'title',
    tooltip: '只读，使用form.getFieldValue获取不到值',
    width: '15%',
  },
  {
    title: '活动名称二',
    dataIndex: 'readonly',
    tooltip: '只读，使用form.getFieldValue可以获取到值',
    width: '15%',
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
  },
  {
    title: '描述',
    dataIndex: 'decs',
  },
  {
    title: '活动时间',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a
        key="delete"
      >
        删除
      </a>,
    ],
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

export default () => {
  const formRef = useRef<ProFormInstance>();

  const [dataSource, setDataSource] = useState(data);
  const SortableItem = SortableElement((props: any) => <tr {...props} />);
  const SortContainer = SortableContainer((props: any) => <tbody {...props} />);

  const onSortEnd = useRefFunction(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      if (oldIndex !== newIndex) {
        const newData = arrayMoveImmutable({
          array: [...dataSource],
          fromIndex: oldIndex,
          toIndex: newIndex,
        }).filter((el) => !!el);
        setDataSource([...newData]);
      }
    },
  );

  const DraggableContainer = (props: any) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = (props: any) => {
    const { ...restProps } = props;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };


  return (
    <PageContainer>
      <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          message.success('提交成功');
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="首页标题配置"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
            <>
              <EditableProTable<DataSourceType>
                rowKey="id"
                columns={columns}
                maxLength={5}
                value={defaultData}
                loading={false}
                editable={{
                  type: 'multiple',
                  onSave: async (rowKey, data, row) => {
                    console.log(rowKey, data, row);
                  },
                }}
                recordCreatorProps={{
                  position: 'bottom',
                  record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                }}
                components={{
                  body: {
                    wrapper: DraggableContainer,
                    row: DraggableBodyRow,
                  },
                }}
              />
            </>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="checkbox"
          title="设置参数"
        >

        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="time"
          title="发布实验"
        >

        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="1"
          title="设置参数"
        >

        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="2"
          title="设置参数"
        >

        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
    </PageContainer>
  );
};
