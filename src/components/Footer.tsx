import React from 'react';
import cn from 'classnames';
import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  selectedFilter: Filters;
  onFilteredStatus: (filter: Filters) => void;
  onDeleteCompleted: () => void;
};

export const Footer: React.FC<Props> = props => {
  const { todos, selectedFilter, onFilteredStatus, onDeleteCompleted } = props;

  const filtersValue = Object.values(Filters);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const isCompleted = todos.some(todo => todo.completed);
  let isDeleteCompleted = false;

  const handleDeleteCompleted = () => {
    isDeleteCompleted = true;
    onDeleteCompleted();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {filtersValue.map(filter => (
          <a
            key={filter}
            href={`#/${filter !== Filters.All ? filter.toLowerCase() : ''}`}
            className={cn('filter__link', {
              selected: filter === selectedFilter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => onFilteredStatus(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={isDeleteCompleted || !isCompleted}
        style={{ visibility: !isCompleted ? 'hidden' : 'visible' }}
        onClick={handleDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
