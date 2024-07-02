import {
  Button,
  Steps,
  Dropdown,
} from "antd";
import {
  DownOutlined,
} from "@ant-design/icons";
import {
  getStatusTag,
  getCurrentSessionStage,
  getStageIcon,
  getStageStatusMenu,
  getStageName,
} from "./ComponentUtils";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const { Step } = Steps;

const StagesSection = ({ session, handleUpdateStageStatus }) => {
  const currentStage = getCurrentSessionStage(session);
  const navigate = useNavigate();
  return (
    <Steps current={currentStage}>
          {session.stages.map((stage, index) => (
            <Step
              key={index}
              icon={getStageIcon(stage.stage)}
              description={
                <div>
                  <span>{getStatusTag(stage.status)}</span>
                  <Dropdown
                    overlay={getStageStatusMenu(index, handleUpdateStageStatus)}
                  >
                    <Button type="link" icon={<DownOutlined />} />
                  </Dropdown>
                </div>
              }
              title={
                <Button type="text" onClick={() => navigate(`/sessions/${session._id}/stages/${stage.stage}`)}>{getStageName(stage.stage)}</Button>
              }
              status={
                stage.status === 2
                  ? "finish"
                  : stage.status === 1
                  ? "process"
                  : stage.status === 3
                  ? "error"
                  : "wait"
              }
            />
          ))}
        </Steps>
  );
};

StagesSection.propTypes = {
  session: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    stages: PropTypes.arrayOf(PropTypes.shape({
      stage: PropTypes.number.isRequired,
      status: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  handleUpdateStageStatus: PropTypes.func.isRequired
};

export default StagesSection;