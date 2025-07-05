import { useState } from 'react'
import { FiPlus, FiEdit2, FiShare2, FiTrash2 } from 'react-icons/fi'

const actions = [
  { icon: <FiEdit2 />, name: 'Edit' },
  { icon: <FiShare2 />, name: 'Share' },
  { icon: <FiTrash2 />, name: 'Delete' },
]

const SpeedDial = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Actions */}
      <div className="flex flex-col items-end mb-2 space-y-3">
        {actions.map((action, idx) => (
          <button
            key={action.name}
            className={`flex items-center px-3 py-2 rounded-lg shadow-lg bg-white text-gray-700 hover:bg-gray-100 transition-opacity duration-300
              ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
            style={{
              transitionDelay: open ? `${idx * 60}ms` : `${(actions.length - idx) * 40}ms`,
            }}
            tabIndex={open ? 0 : -1}
            aria-label={action.name}
          >
            <span className="mr-2 text-lg">{action.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap bg-gray-800 text-white rounded px-2 py-1 ml-2 opacity-80">
              {action.name}
            </span>
          </button>
        ))}
      </div>
      {/* FAB */}
      <button
        className={`w-16 h-16 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-2xl hover:bg-blue-700 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400
          ${open ? 'rotate-45' : ''}
        `}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Speed Dial"
      >
        <FiPlus size={32} />
      </button>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40  bg-opacity-0 cursor-default"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default SpeedDial