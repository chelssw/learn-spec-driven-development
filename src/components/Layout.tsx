import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const nav = [
  {
    group: "Getting Started",
    links: [
      { to: "/", label: "Introduction" },
      { to: "/problem", label: "The Problem" },
      { to: "/landscape", label: "The Landscape" },
    ],
  },
  {
    group: "Tools",
    links: [
      { to: "/tools/speckit", label: "SpecKit" },
      { to: "/tools/openspec", label: "OpenSpec" },
      { to: "/tools/ai-powered", label: "AI-Powered Tools" },
      { to: "/tools/copilot-plan-mode", label: "Copilot Plan Mode" },
      { to: "/tools/traditional", label: "Traditional Tools" },
    ],
  },
  {
    group: "Learn",
    links: [
      { to: "/learn/plan-mode", label: "Plan Mode Simulator" },
    ],
  },
  {
    group: "Reference",
    links: [
      { to: "/best-practices", label: "Best Practices" },
      { to: "/decision-guide", label: "Decision Guide" },
    ],
  },
];

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1e3a5f] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1 rounded hover:bg-white/10"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          <NavLink to="/" className="text-xl font-bold tracking-tight hover:no-underline text-white">
            Spec-Driven Development
          </NavLink>
        </div>
        <span className="text-xs text-blue-200 hidden sm:block">A Developer's Guide</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            ${open ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 transition-transform duration-200
            fixed md:static z-30 top-[52px] left-0 h-[calc(100vh-52px)] md:h-auto
            w-64 bg-[#1e3a5f] text-white flex-shrink-0 overflow-y-auto
          `}
        >
          <nav className="py-6 px-4 space-y-6">
            {nav.map((section) => (
              <div key={section.group}>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2 px-2">
                  {section.group}
                </p>
                <ul className="space-y-0.5 list-none pl-0">
                  {section.links.map((link) => (
                    <li key={link.to} className="list-none">
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-1.5 rounded text-sm transition-colors ${
                            isActive
                              ? "bg-[#2da44e] text-white font-medium"
                              : "text-blue-100 hover:bg-white/10"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Backdrop for mobile */}
        {open && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
