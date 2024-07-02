import { Tag , Menu} from 'antd';
import { EditOutlined, PrinterOutlined, RobotOutlined, BgColorsOutlined, CheckCircleOutlined } from '@ant-design/icons';

export const getStatusTag = (status) => {
  switch (status) {
    case 0:
      return <Tag color="gray">Not started</Tag>;
    case 1:
      return <Tag color="blue">In progress</Tag>;
    case 2:
      return <Tag color="red">Terminated</Tag>;
    case 3:
      return <Tag color="green">Completed</Tag>;
    default:
      return <Tag color="default">Unknown</Tag>;
  }
};

export const getStageTag = (stage) => {
  const stageNames = [
    'Just created',
    '3D printing',
    'Parts removal',
    'Ultrasonic cleaning',
    'Support removal',
    'Ultrasonic cleaning',
    'Surface polishing',
    'Completed'
  ];

  const stageColors = [
    'lightgray', // Just created
    'blue',      // 3D printing
    'cyan',      // Parts removal
    'green',     // Ultrasonic cleaning
    'yellow',    // Support removal
    'orange',    // Ultrasonic cleaning
    'red',       // Surface polishing
    'gold'       // Completed
  ];
  return <Tag color={stageColors[stage]}>{stageNames[stage]}</Tag>;
};


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

export const getStageIcon = (stage) => {
  switch(stage) {
    case 0:
      return <EditOutlined style={{ fontSize: '24px' }} />;
    case 1:
      return <PrinterOutlined style={{ fontSize: '24px' }} />;
    case 2:
    case 4:
    case 6:
      return <RobotOutlined style={{ fontSize: '24px' }} />;
    case 3:
    case 5:
      return <BgColorsOutlined style={{ fontSize: '24px' }} />;
    case 7:
      return <CheckCircleOutlined style={{ fontSize: '24px' }} />;
    default:
      return null;
  }
};

export const getStageStatusMenu = (index, handleUpdateStageStatus) => (
  <Menu>
    <Menu.Item key="0" onClick={() => handleUpdateStageStatus(index, 0)}>{getStatusTag(0)}</Menu.Item>
    <Menu.Item key="1" onClick={() => handleUpdateStageStatus(index, 1)}>{getStatusTag(1)}</Menu.Item>
    <Menu.Item key="2" onClick={() => handleUpdateStageStatus(index, 2)}>{getStatusTag(2)}</Menu.Item>
    <Menu.Item key="3" onClick={() => handleUpdateStageStatus(index, 3)}>{getStatusTag(3)}</Menu.Item>
  </Menu>
);