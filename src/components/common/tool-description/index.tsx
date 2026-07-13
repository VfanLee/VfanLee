'use client'

import React from 'react'

interface ToolDescriptionProps {
  title?: string
  description?: string
  features?: string[]
}

const ToolDescription: React.FC<ToolDescriptionProps> = ({ title, description, features }) => {
  if (!description && (!features || features.length === 0)) return null

  return (
    <div className="text-muted-foreground mt-4 text-xs leading-relaxed">
      {description && <p className="mb-1">{description}</p>}
      {features && features.length > 0 && (
        <ul className="space-y-0.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-1.5">
              <span className="text-muted-foreground/40 mt-0.5 shrink-0">·</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ToolDescription
