import React, { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FiChevronLeft, FiChevronDown } from 'react-icons/fi'
import { NAV_ITEMS, groupNavItems } from '../utils/navigation'

function SidebarSection({ title, items, collapsed, isAnchor }) {
  const [expandedItems, setExpandedItems] = useState({})
  const location = useLocation()

  const toggleExpanded = (path) => {
    setExpandedItems((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))
  }

  const isChildActive = (item) => {
    if (!item.children) return false
    return item.children.some((child) => location.pathname === child.path)
  }

  return (
    <div className={`px-3 py-1 ${isAnchor ? 'mt-auto' : ''}`}>
      <p className={`m-0 py-[10px] px-[10px] pb-1.5 text-[8px] uppercase tracking-[0.12em] text-sidebar-muted ${collapsed ? 'text-center' : ''}`}>
        {title}
      </p>
      <nav className="flex flex-col gap-1.5">
        {items.map((item) => (
          <div key={item.path}>
            {item.children ? (
              <div>
                <button
                  type="button"
                  title={item.label}
                  onClick={() => toggleExpanded(item.path)}
                  className={[
                    'w-full flex items-center gap-3 py-2.5 px-3 rounded-xl text-sidebar-text border border-transparent transition-all duration-150 hover:bg-white/8',
                    collapsed ? 'justify-center p-2.5' : '',
                    expandedItems[item.path] || isChildActive(item)
                      ? 'bg-accent text-[#2c2c2c] border-black/8 [&>span:first-child]:text-[#2c2c2c]'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="inline-flex items-center justify-center text-sidebar-muted text-base">
                    {item.icon}
                  </span>
                  {!collapsed && <span className="text-xs whitespace-nowrap">{item.label}</span>}
                  {!collapsed && item.children && (
                    <span className="ml-auto text-xs transition-transform duration-150" aria-hidden>
                      <FiChevronDown
                        className={`transition-transform duration-150 ${
                          expandedItems[item.path] ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  )}
                </button>
                {(expandedItems[item.path] || isChildActive(item)) && !collapsed && (
                  <div className="flex flex-col gap-1 mt-1 ml-6 pl-3 border-l border-sidebar-line">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        title={child.label}
                        className={({ isActive }) =>
                          [
                            'flex items-center gap-2 py-2 px-2 rounded-lg text-sidebar-text text-xs border border-transparent transition-all duration-150',
                            isActive
                              ? 'bg-white/8 text-sidebar-text'
                              : 'hover:bg-white/4',
                          ]
                            .filter(Boolean)
                            .join(' ')
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                title={item.label}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 py-2.5 px-3 rounded-xl text-sidebar-text border border-transparent transition-all duration-150',
                    collapsed ? 'justify-center p-2.5' : '',
                    isActive
                      ? 'bg-accent text-[#2c2c2c] border-black/8 [&>span:first-child]:text-[#2c2c2c]'
                      : 'hover:bg-white/8',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                <span className="inline-flex items-center justify-center text-sidebar-muted text-base">
                  {item.icon}
                </span>
                {!collapsed && <span className="text-xs whitespace-nowrap">{item.label}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const grouped = useMemo(() => groupNavItems(NAV_ITEMS), [])

  return (
    <aside
      className={`flex flex-col h-screen bg-sidebar-bg text-sidebar-text border-r border-sidebar-line transition-all duration-[180ms] ${
        collapsed ? 'w-[84px]' : 'w-[280px]'
      }`}
    >
      <div className="flex items-center justify-between py-5 px-[18px] pb-2.5 border-b border-sidebar-line gap-2.5">
        <div
          className={`flex items-center gap-3 font-bold tracking-[0.3em] transition-opacity duration-150 ${
            collapsed ? 'cursor-pointer hover:opacity-80' : ''
          }`}
          onClick={collapsed ? () => setCollapsed(false) : undefined}
          role={collapsed ? 'button' : undefined}
          aria-label={collapsed ? 'Expand sidebar' : undefined}
          tabIndex={collapsed ? 0 : undefined}
          onKeyDown={
            collapsed
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setCollapsed(false)
                  }
                }
              : undefined
          }
        >
          <img
            src="/hsi-logo.png"
            alt="HSI"
            className="inline-flex items-center justify-center w-[38px] h-[38px] object-contain rounded-[10px]"
          />
          {!collapsed && <span className="text-lg text-accent">HSI</span>}
        </div>
        {!collapsed && (
          <button
            type="button"
            className="w-9 h-9 rounded-[10px] border border-sidebar-line bg-transparent text-sidebar-text inline-flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-white/6"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
          >
            <FiChevronLeft />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-3 py-2 pb-4 overflow-y-auto">
        <SidebarSection title="Main" collapsed={collapsed} items={grouped.main} />
        <SidebarSection title="Others" collapsed={collapsed} items={grouped.others} isAnchor />
      </div>
    </aside>
  )
}
