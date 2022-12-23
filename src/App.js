import React, { useEffect, useContext, useState } from 'react';

import TaskListContext from './store/taskList-context';
import TaskListProvider from './store/TaskListProvider';
import Header from './components/Layout/Header';
import NewTask from './components/Tasks/NewTask';
import Tasks from './components/Tasks/Tasks';
import Wrapper from './components/Layout/Wrapper';
import RemoveTaskModal from './components/UI/RemoveTaskModal';
import SuccessfullyRemovedModal from './components/UI/SuccessfullyRemovedModal';

const App = () => {
  const ctx = useContext(TaskListContext);
  const [removeTaskModalIsShown, setRemoveTaskModalIsShown] = useState(false);
  const [successfullyRemoved, setSuccessfullyRemoved] = useState(false);
  const [task, setTask] = useState();

  const showRemoveTaskModalHandler = (task) => {
    setRemoveTaskModalIsShown(true);
    setTask(task);
  };

  const hideRemoveTaskModalHandler = () => {
    setRemoveTaskModalIsShown(false);
  };

  const hideTaskRemovedModalHandler = () => {
    setSuccessfullyRemoved(false);
  };

  const showTaskRemovedSuccessfullyHandler = () => {
    setRemoveTaskModalIsShown(false);
    setSuccessfullyRemoved(true);
  };

  return (
    <TaskListProvider
      onShowRemoveTaskModal={showRemoveTaskModalHandler}
      onHideRemoveTaskModal={hideRemoveTaskModalHandler}
      onHideTaskRemovedModal={hideTaskRemovedModalHandler}
      onShowTaskRemovedSuccessfully={showTaskRemovedSuccessfullyHandler}
    >
      <Wrapper>
        {removeTaskModalIsShown && <RemoveTaskModal task={task} />}
        {successfullyRemoved && <SuccessfullyRemovedModal task={task} />}
        <Header />
        <NewTask />
        <Tasks />
      </Wrapper>
    </TaskListProvider>
  );
};

export default App;
