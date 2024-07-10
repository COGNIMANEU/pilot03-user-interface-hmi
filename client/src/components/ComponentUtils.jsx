import { Tag , Menu} from 'antd';
import { STAGE_NAMES, STAGE_COLORS, STAGE_ICONS, STATUS_NAMES, STATUS_COLORS, STAGE_SERVICE_URLS, ALERT_TYPE_COLORS, ALERT_TYPE_NAMES } from './constants';
import { ProductOutlined, PrinterOutlined, DeleteColumnOutlined, StarOutlined } from '@ant-design/icons';

export const getStatusTag = (status) => (<Tag color={STATUS_COLORS[status]}>{STATUS_NAMES[status]}</Tag>);

export const getStageTag = (stage) => (
  <Tag>{STAGE_NAMES[stage]}</Tag>
);

export const getAlertTag = (alert_type) => (
  <Tag color={ALERT_TYPE_COLORS[alert_type]}>{ALERT_TYPE_NAMES[alert_type]}</Tag>
);

export const getStageName = (stage) => STAGE_NAMES[stage];

export const getCurrentSessionStage = (session) => session.stages[session.currentStageIndex];

const iconComponents = {
  PrinterOutlined: <PrinterOutlined style={{ fontSize: '36px' }} />,
  ProductOutlined: <ProductOutlined style={{ fontSize: '36px' }} />,
  DeleteColumnOutlined: <DeleteColumnOutlined style={{ fontSize: '36px' }} />,
  StarOutlined: <StarOutlined style={{ fontSize: '36px' }} />
};
export const getStageIcon = (stage) => iconComponents[STAGE_ICONS[stage]];

export const getStageColor = (stage) => STAGE_COLORS[stage];

export const getStageServiceURL = (stage) => STAGE_SERVICE_URLS[stage];

export const getStageStatusMenu = (index, handleUpdateStageStatus) => (
  <Menu>
    <Menu.Item key="0" onClick={() => handleUpdateStageStatus(index, 0)}>{getStatusTag(0)}</Menu.Item>
    <Menu.Item key="1" onClick={() => handleUpdateStageStatus(index, 1)}>{getStatusTag(1)}</Menu.Item>
    <Menu.Item key="2" onClick={() => handleUpdateStageStatus(index, 2)}>{getStatusTag(2)}</Menu.Item>
    <Menu.Item key="3" onClick={() => handleUpdateStageStatus(index, 3)}>{getStatusTag(3)}</Menu.Item>
  </Menu>
);