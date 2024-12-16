import React from 'react';
import Sidebar from './components/Sidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import { Save } from 'lucide-react';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useWorkflow } from './hooks/useWorkflow';
import { Toaster } from 'react-hot-toast';

const initialWorkflow = {
  id: '',
  name: 'Credit Decision Workflow',
  nodes: [
    {
      id: 'node-1',
      type: 'trigger',
      position: { x: 100, y: 100 },
      data: {
        title: 'New Application',
        description: 'Triggers when a new credit application is received',
        config: {}
      }
    }
  ],
  connections: []
};

function App() {
  const { handleDragStart } = useDragAndDrop();
  const { workflow, saveWorkflow, loading, error, setWorkflow } = useWorkflow(initialWorkflow);

  const handleSave = async () => {
    if (workflow) {
      try {
        await saveWorkflow(workflow);
      } catch (err) {
        // Error is handled by useWorkflow hook
        console.error('Failed to save workflow:', err);
      }
    }
  };

  if (!workflow) return null;

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Credit Decision Workflow Builder</h1>
            <button 
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              onClick={handleSave}
              disabled={loading}
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Save Workflow'}
            </button>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar onDragStart={handleDragStart} />
          <main className="flex-1">
            <WorkflowCanvas 
              workflow={workflow}
              onUpdateWorkflow={setWorkflow}
            />
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default App;