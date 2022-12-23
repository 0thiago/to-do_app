import React, { useContext, useState } from 'react';

import TaskListContext from '../../store/taskList-context';
import TasksCard from './TasksCard';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: top;
  justify-content: center;
`;
const Tasks = (props) => {
  const ctx = useContext(TaskListContext);
  const [taskList, setTaskList] = useState([]);

  const getTaskListHandler = (taskList) => {
    if (taskList === null || taskList === undefined) {
      setTaskList([]);
    } else {
      setTaskList(taskList);
    }
  };

  return (
    <Div>
      {ctx.taskTypes.map((task, index) => {
        return (
          <TasksCard
            key={`${'tasks' + index}`}
            type={task.type}
            title={task.title}
            getTaskList={getTaskListHandler}
            taskList={taskList}
            closeNewTask={props.closeNewTaskWindow}
          />
        );
      })}
    </Div>
  );
};

export default Tasks;
