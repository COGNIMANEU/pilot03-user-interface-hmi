export const STATUS_NAMES = [
  'Not Started',
  'In Progress',
  'Completed',
  'Terminated'
];

export const STATUS_COLORS = [
  'lightgray',
  'blue',
  'green',
  'red'
];

export const STAGE_SERVICE_URLS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003'
];

export const STAGE_NAMES = [
  '3D printing',
  'Parts removal',
  'Support removal',
  'Surface polishing'
];

export const STAGE_COLORS = [
  'blue',      // 3D printing
  'orange',      // Parts removal
  'red',    // Support removal
  'green'       // Surface polishing
];

export const STAGE_ICONS = {
  0: 'PrinterOutlined',
  1: 'ProductOutlined',
  2: 'DeleteColumnOutlined',
  3: 'StarOutlined'
};

export const ALERT_TYPE_COLORS = [
  'darkblue', // information
  'darkorange', // warning
  'darkred'// critical
];

export const ALERT_TYPE_NAMES = [
  'Info',
  'Warning',
  'Critical',
]