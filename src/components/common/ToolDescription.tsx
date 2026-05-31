import React from 'react'

interface ToolDescriptionProps {
  title?: string
  description?: string
  features?: string[]
}

const ToolDescription: React.FC<ToolDescriptionProps> = ({ title, description, features }) => {
  return (
    <div className="bg-muted/50 mt-4 rounded-lg p-4">
      <h3 className="mb-2 font-medium">{title || '说明：'}</h3>
      {description && <p className="text-muted-foreground mb-2 text-sm">{description}</p>}
      {features && features.length > 0 && (
        <ul className="text-muted-foreground ml-4 text-xs">
          {features.map((feature, index) => (
            <li key={index} className="list-disc">
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ToolDescription
