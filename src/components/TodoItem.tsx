import { useState, useEffect, useRef } from 'react';
import { useTodoStore } from '@/app/store/todoStore';

export default function TodoItem({ todo }: { todo: { id: string; text: string; completed: boolean } }) {
  const { toggleTodo, removeTodo, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText === '') {
      removeTodo(todo.id);
    } else if (trimmedText !== todo.text) {
      updateTodo(todo.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="flex items-center gap-2 p-2 border rounded">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        disabled={isEditing}
      />
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="flex-1 p-1 border rounded"
        />
      ) : (
        <span 
          className={`flex-1 ${todo.completed ? 'line-through' : ''}`}
          onDoubleClick={handleEdit}
        >
          {todo.text}
        </span>
      )}
      
      <div className="flex gap-1">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="p-1 hover:bg-blue-500/20 rounded"
            title="Edit task"
          >
            ✏️
          </button>
        )}
        <button 
          onClick={() => removeTodo(todo.id)}
          className="p-1 hover:bg-red-500/20 rounded"
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </li>
  );
}