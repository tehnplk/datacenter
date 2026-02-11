"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Hospital,
  Wind,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  category: string;
}

interface MenuGroup {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const oneHospitalItems: MenuItem[] = [
  { category: "Claim", label: "CMI & adjRW", href: "/onehos/cmi-adjrw" },
  { category: "ER/Refer", label: "Paperless Refer", href: "/onehos/paperless-refer" },
  { category: "ER/Refer", label: "Consult Response", href: "/onehos/consult-response" },
  { category: "ER/Refer", label: "Refer Transport", href: "/onehos/refer-transport" },
  { category: "ER/Refer", label: "Red Bypass", href: "/onehos/red-bypass" },
  { category: "ER/Refer", label: "Returnable Cases", href: "/onehos/returnable-cases" },
  { category: "OR", label: "OR Utilization", href: "/onehos/or-utilization" },
  { category: "OR", label: "Surgery Wait", href: "/onehos/surgery-wait" },
  { category: "ICU", label: "ICU Occupancy", href: "/onehos/icu-occupancy" },
  { category: "ICU", label: "ICU Wait", href: "/onehos/icu-wait" },
  { category: "ICU", label: "Critical Mortality", href: "/onehos/critical-mortality" },
  { category: "ERP", label: "Bed Occupancy", href: "/onehos/bed-occupancy" },
  { category: "ER/Refer", label: "Refer Top 10", href: "/onehos/refer-top10" },
  { category: "IP", label: "ICU Dx Top 10", href: "/onehos/icu-dx-top10" },
  { category: "IP", label: "CMI by Period", href: "/onehos/cmi-period" },
  { category: "IP", label: "Admit Dx Top 10", href: "/onehos/admit-dx-top10" },
  { category: "ICU", label: "ICU Mortality", href: "/onehos/icu-mortality" },
  { category: "ICU", label: "Ward Mortality", href: "/onehos/ward-mortality" },
  { category: "Claim", label: "adjRW Top 10", href: "/onehos/adjrw-top10" },
  { category: "Claim", label: "CMI Top 10", href: "/onehos/cmi-top10" },
  { category: "Pharma", label: "PHR Drug Link", href: "/onehos/phr-drug-link" },
  { category: "Pharma", label: "MALA Prevention", href: "/onehos/mala-prevention" },
];

function groupByCategory(items: MenuItem[]) {
  const map = new Map<string, MenuItem[]>();
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return map;
}

const menuGroups: MenuGroup[] = [
  {
    title: "One Hospital",
    icon: <Hospital size={20} />,
    items: oneHospitalItems,
  },
  {
    title: "PM 2.5",
    icon: <Wind size={20} />,
    items: [
      { category: "PM2.5", label: "Dashboard", href: "/pm25" },
    ],
  },
];

const MIN_WIDTH = 64;
const SNAP_THRESHOLD = 140;
const DEFAULT_WIDTH = 256;
const MAX_WIDTH = 480;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Sidebar() {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "One Hospital": false,
    "PM 2.5": false,
  });
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const isDragging = useRef(false);
  const prevCollapsed = useRef(collapsed);
  const sidebarRef = useRef<HTMLElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    setIsAnimating(false);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newWidth = e.clientX;
      if (newWidth < SNAP_THRESHOLD) {
        if (!prevCollapsed.current) {
          prevCollapsed.current = true;
          setIsAnimating(true);
          setCollapsed(true);
          setWidth(MIN_WIDTH);
        }
      } else {
        if (prevCollapsed.current) {
          prevCollapsed.current = false;
          setIsAnimating(true);
          setCollapsed(false);
          setWidth(DEFAULT_WIDTH);
        } else {
          setWidth(Math.min(newWidth, MAX_WIDTH));
        }
      }
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      setTimeout(() => setIsAnimating(false), 300);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const toggleCategory = (key: string) => {
    setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGroup = (title: string) => {
    if (collapsed) return;
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobile) setMobileOpen(false);
  }, [pathname, isMobile]);

  // Mobile: hamburger button + overlay sidebar
  if (isMobile) {
    return (
      <>
        {/* Hamburger Button */}
        {!mobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="fixed left-3 top-3 z-50 rounded-md bg-green-100 p-2 shadow-md"
          >
            <Menu size={22} className="text-green-700" />
          </button>
        )}

        {/* Backdrop */}
        {mobileOpen && (
          <div
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-black/40 transition-opacity"
          />
        )}

        {/* Sidebar Drawer */}
        <aside
          className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-green-200 bg-green-100 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-green-200 px-3 py-4">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={22} className="text-green-600" />
              <span className="text-sm font-bold text-black">Datacenter</span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="rounded-md p-1.5 text-green-400 hover:bg-green-100 hover:text-green-700"
            >
              <X size={18} />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {menuGroups.map((group) => (
              <div key={group.title} className="mb-2">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm font-semibold text-black hover:bg-green-100"
                  title={group.title}
                >
                  <div className="flex items-center gap-2">
                    {group.icon}
                    <span>{group.title}</span>
                  </div>
                  {openGroups[group.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {openGroups[group.title] && (
                  <div className="ml-3 mt-1 flex flex-col gap-1">
                    {Array.from(groupByCategory(group.items)).map(
                      ([category, items]) => {
                        const catKey = `${group.title}::${category}`;
                        const isOpen = openCategories[catKey] === true;
                        return (
                          <div key={category}>
                            <button
                              onClick={() => toggleCategory(catKey)}
                              className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 hover:bg-green-100 hover:text-black"
                            >
                              <span>{category}</span>
                              {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                            </button>
                            {isOpen && (
                              <div className="flex flex-col gap-0.5">
                                {items.map((item) => {
                                  const isActive = pathname === item.href;
                                  return (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                                        isActive
                                          ? "bg-green-200 font-medium text-black"
                                          : "text-gray-800 hover:bg-green-100 hover:text-black"
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
      </>
    );
  }

  // Desktop: original sidebar
  return (
    <aside
      ref={sidebarRef}
      style={{ width: collapsed ? MIN_WIDTH : width }}
      className={`relative flex h-screen flex-col border-r border-green-200 bg-green-100 ${
        isAnimating || !isDragging.current ? "transition-[width] duration-300 ease-in-out" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-green-200 px-3 py-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <LayoutDashboard size={22} className="text-green-600" />
            <span className="text-sm font-bold text-black">Datacenter</span>
          </div>
        )}
        <button
          onClick={() => {
            const next = !collapsed;
            setCollapsed(next);
            prevCollapsed.current = next;
            if (next) {
              setWidth(MIN_WIDTH);
            } else {
              setWidth(DEFAULT_WIDTH);
            }
          }}
          className="rounded-md p-1.5 text-green-400 hover:bg-green-100 hover:text-green-700"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-2">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.title)}
              className={`flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-semibold text-black hover:bg-green-100 ${
                collapsed ? "justify-center" : "justify-between"
              }`}
              title={group.title}
            >
              <div className="flex items-center gap-2">
                {group.icon}
                {!collapsed && <span>{group.title}</span>}
              </div>
              {!collapsed &&
                (openGroups[group.title] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </button>

            {/* Sub Items grouped by category */}
            {!collapsed && openGroups[group.title] && (
              <div className="ml-3 mt-1 flex flex-col gap-1">
                {Array.from(groupByCategory(group.items)).map(
                  ([category, items]) => {
                    const catKey = `${group.title}::${category}`;
                    const isOpen = openCategories[catKey] === true;
                    return (
                      <div key={category}>
                        <button
                          onClick={() => toggleCategory(catKey)}
                          className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 hover:bg-green-100 hover:text-black"
                        >
                          <span>{category}</span>
                          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                        </button>
                        {isOpen && (
                          <div className="flex flex-col gap-0.5">
                            {items.map((item) => {
                              const isActive = pathname === item.href;
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                                    isActive
                                      ? "bg-green-200 font-medium text-black"
                                      : "text-gray-800 hover:bg-green-100 hover:text-black"
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
      {/* Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute right-0 top-0 z-10 h-full w-1.5 cursor-col-resize hover:bg-green-300 active:bg-green-400"
      />
    </aside>
  );
}
