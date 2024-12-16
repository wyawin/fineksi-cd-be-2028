import React from 'react';
import { CreditCard, AlertCircle, CheckCircle2, ArrowRightCircle, Calculator, GaugeCircle } from 'lucide-react';
import { NodeType } from '../types/workflow';

const nodeTypes = [
  {
    type: 'trigger' as NodeType,
    title: 'Credit Application',
    description: 'Start when a new credit application is received',
    icon: CreditCard
  },
  {
    type: 'credit-score' as NodeType,
    title: 'Credit Score',
    description: 'Calculate credit score based on variables',
    icon: Calculator
  },
  {
    type: 'credit-score-check' as NodeType,
    title: 'Credit Score Check',
    description: 'Evaluate credit score threshold',
    icon: GaugeCircle
  },
  {
    type: 'condition' as NodeType,
    title: 'Conditional Check',
    description: 'Add branching logic',
    icon: AlertCircle
  },
  {
    type: 'action' as NodeType,
    title: 'Decision',
    description: 'Make credit decision',
    icon: CheckCircle2
  }
];

interface SidebarProps {
  onDragStart: (type: NodeType, e: React.DragEvent) => void;
}

export default function Sidebar({ onDragStart }: SidebarProps) {
  const handleDragStart = (type: NodeType) => (e: React.DragEvent) => {
    onDragStart(type, e);
  };

  return (
    <div className="w-64 border-r bg-white p-4">
      <h2 className="text-lg font-semibold mb-4">Workflow Steps</h2>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.title}
            className="p-3 border rounded-lg hover:bg-gray-50 cursor-grab active:cursor-grabbing"
            draggable
            onDragStart={handleDragStart(node.type)}
          >
            <div className="flex items-center gap-2 mb-1">
              <node.icon size={18} className="text-gray-600" />
              <h3 className="font-medium text-sm">{node.title}</h3>
            </div>
            <p className="text-xs text-gray-600">{node.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}