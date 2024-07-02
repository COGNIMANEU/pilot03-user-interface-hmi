import { Tag , Menu} from 'antd';
import { STAGE_NAMES, STAGE_COLORS, STAGE_ICONS, STATUS_NAMES, STATUS_COLORS } from './constants';
import { ProductOutlined, PrinterOutlined, DeleteColumnOutlined, StarOutlined } from '@ant-design/icons';

export const getStatusTag = (status) => (<Tag color={STATUS_COLORS[status]}>{STATUS_NAMES[status]}</Tag>);

export const getStageTag = (stage) => (
  <Tag color={STAGE_COLORS[stage]}>{STAGE_NAMES[stage]}</Tag>
);


export const getCurrentSessionStage = (session) => {
  if (session.status === 0) {
    return session.stages[0];
  }

  if (session.status === 3) {
    for (let i = session.stages.length - 1; i >= 0; i--) {
      if (session.stages[i].status === 3) {
        return session.stages[i];
      }
    }
  }

  if (session.status === 2) {
    return session.stages[session.stages.length - 1];
  }

  for (let i = 0; i < session.stages.length; i++) {
    if (
      session.stages[i].status !== 2 &&
      (i === session.stages.length - 1 || session.stages[i + 1].status === 0)
    ) {
      return session.stages[i];
    }
  }

  return null; // In case there is no matching stage
}

const iconComponents = {
  PrinterOutlined: <PrinterOutlined style={{ fontSize: '24px' }} />,
  ProductOutlined: <ProductOutlined style={{ fontSize: '24px' }} />,
  DeleteColumnOutlined: <DeleteColumnOutlined style={{ fontSize: '24px' }} />,
  StarOutlined: <StarOutlined style={{ fontSize: '24px' }} />
};
export const getStageIcon = (stage) => iconComponents[STAGE_ICONS[stage]];

export const getStageStatusMenu = (index, handleUpdateStageStatus) => (
  <Menu>
    <Menu.Item key="0" onClick={() => handleUpdateStageStatus(index, 0)}>{getStatusTag(0)}</Menu.Item>
    <Menu.Item key="1" onClick={() => handleUpdateStageStatus(index, 1)}>{getStatusTag(1)}</Menu.Item>
    <Menu.Item key="2" onClick={() => handleUpdateStageStatus(index, 2)}>{getStatusTag(2)}</Menu.Item>
    <Menu.Item key="3" onClick={() => handleUpdateStageStatus(index, 3)}>{getStatusTag(3)}</Menu.Item>
  </Menu>
);