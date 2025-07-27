'use client'

import React, { useCallback } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from '@xyflow/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import '@xyflow/react/dist/style.css'

// Enhanced Custom Node Component with shadcn styling
const WorkflowNode = ({ data, selected }: { data: { label: string; type?: string; status?: string }, selected: boolean }) => {
  const getNodeStyle = (type?: string) => {
    switch (type) {
      case 'start':
        return 'border-emerald-600 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
      case 'decision':
        return 'border-amber-600 bg-amber-50 text-amber-900 hover:bg-amber-100'
      case 'end':
        return 'border-blue-600 bg-blue-50 text-blue-900 hover:bg-blue-100'
      case 'rejection':
        return 'border-red-600 bg-red-50 text-red-900 hover:bg-red-100'
      default:
        return 'border-gray-700 bg-white text-gray-900 hover:bg-gray-50'
    }
  }

  return (
    <Card className={cn(
      'relative min-w-[160px] p-4 border-2 transition-all duration-300 ease-in-out',
      'hover:shadow-lg hover:scale-105 hover:border-purple-500',
      'hover:shadow-purple-200/50 cursor-pointer',
      getNodeStyle(data.type),
      selected && 'ring-2 ring-purple-400 ring-offset-2'
    )}>
      <div className="text-center">
        <div className="font-semibold text-sm leading-tight mb-2">
          {data.label}
        </div>
        {data.status && (
          <Badge variant="outline" className="text-xs">
            {data.status}
          </Badge>
        )}
      </div>
      
      {/* Aceternity-style glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/0 via-purple-400/0 to-purple-400/0 
                      hover:from-purple-400/10 hover:via-purple-400/5 hover:to-purple-400/10 
                      transition-all duration-500 pointer-events-none" />
    </Card>
  )
}

const nodeTypes = {
  workflowNode: WorkflowNode,
}

// Enhanced nodes with proper positioning and types
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 100, y: 100 },
    data: { label: 'User Register', type: 'start', status: 'Entry Point' },
    sourcePosition: 'right' as any,
  },
  {
    id: '2',
    type: 'workflowNode',
    position: { x: 350, y: 100 },
    data: { label: 'Submit their project', status: 'Action' },
    sourcePosition: 'right' as any,
    targetPosition: 'left' as any,
  },
  {
    id: '3',
    type: 'workflowNode',
    position: { x: 600, y: 100 },
    data: { label: 'Experts/seniors look into the project', type: 'decision', status: 'Review' },
    sourcePosition: 'right' as any,
    targetPosition: 'left' as any,
  },
  {
    id: '4',
    type: 'workflowNode',
    position: { x: 850, y: 50 },
    data: { label: 'Rejected, Level Up Time!', type: 'rejection', status: 'Feedback Loop' },
    sourcePosition: 'right' as any,
    targetPosition: 'left' as any,
  },
  {
    id: '5',
    type: 'workflowNode',
    position: { x: 1150, y: 50 },
    data: { label: 'Constructive criticism provided through mail personally', type: 'end', status: 'Support' },
    targetPosition: 'left' as any,
  },
  {
    id: '6',
    type: 'workflowNode',
    position: { x: 850, y: 200 },
    data: { label: 'Approved', type: 'start', status: 'Success' },
    sourcePosition: 'right' as any,
    targetPosition: 'left' as any,
  },
  {
    id: '7',
    type: 'workflowNode',
    position: { x: 1150, y: 150 },
    data: { label: 'Users become builders over here', type: 'end', status: 'Community' },
    targetPosition: 'left' as any,
  },
  {
    id: '8',
    type: 'workflowNode',
    position: { x: 1150, y: 250 },
    data: { label: 'Project added to the main project gallery', type: 'end', status: 'Showcase' },
    targetPosition: 'left' as any,
  },
]

// Fixed edges with proper connections
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#374151', width: 20, height: 20 },
    style: { stroke: '#374151', strokeWidth: 2 },
    animated: false,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#374151', width: 20, height: 20 },
    style: { stroke: '#374151', strokeWidth: 2 },
    animated: false,
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#dc2626', width: 20, height: 20 },
    style: { stroke: '#dc2626', strokeWidth: 2 },
    label: 'Rejected',
    labelStyle: { fill: '#dc2626', fontSize: 12, fontWeight: 600 },
    labelBgStyle: { fill: '#fee2e2', fillOpacity: 0.8 },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#dc2626', width: 20, height: 20 },
    style: { stroke: '#dc2626', strokeWidth: 2 },
  },
  {
    id: 'e3-6',
    source: '3',
    target: '6',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#059669', width: 20, height: 20 },
    style: { stroke: '#059669', strokeWidth: 2 },
    label: 'Approved',
    labelStyle: { fill: '#059669', fontSize: 12, fontWeight: 600 },
    labelBgStyle: { fill: '#d1fae5', fillOpacity: 0.8 },
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#059669', width: 20, height: 20 },
    style: { stroke: '#059669', strokeWidth: 2 },
  },
  {
    id: 'e6-8',
    source: '6',
    target: '8',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#059669', width: 20, height: 20 },
    style: { stroke: '#059669', strokeWidth: 2 },
  },
]

export default function WorkflowComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        markerEnd: { type: MarkerType.ArrowClosed, color: '#374151' },
        style: { stroke: '#374151', strokeWidth: 2 },
      }
      setEdges((eds) => addEdge(newEdge, eds))
    },
    [setEdges]
  )

  return (
    <div className="w-full h-screen bg-transparent">
      {/* Aceternity-style background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
        minZoom={0.3}
        maxZoom={1.5}
        attributionPosition="bottom-left"
      >
        {/* Enhanced background with subtle pattern */}
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#e5e7eb"
          className="opacity-30"
        />
        
        {/* Enhanced controls with shadcn styling */}
        <Controls 
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg"
          showInteractive={false}
        />
        
        {/* Enhanced minimap */}
        <MiniMap 
          className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg"
          maskColor="rgb(240, 240, 240, 0.6)"
          nodeColor={(node) => {
            switch (node.data.type) {
              case 'start': return '#10b981'
              case 'decision': return '#f59e0b'
              case 'end': return '#3b82f6'
              case 'rejection': return '#ef4444'
              default: return '#6b7280'
            }
          }}
        />
      </ReactFlow>
    </div>
  )
}
