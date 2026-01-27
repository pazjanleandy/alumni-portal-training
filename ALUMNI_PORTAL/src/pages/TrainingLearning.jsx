import React, { useRef, useState, useEffect } from "react";
import FiltersPanel from "../components/Training_Learning/FiltersPanel";
import SortFilterDropdown from "../components/content_management/SortFilterDropdown";

const PLATFORMS = [
  {
    name: "Microsoft Learning",
    href: "https://learn.microsoft.com/training/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Udemy",
    href: "https://www.udemy.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
  },
  {
    name: "LinkedIn Learning",
    href: "https://www.linkedin.com/learning/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  },
  {
    name: "IBM SkillsBuild",
    href: "https://skillsbuild.org/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
];

export default function TrainingLearning() {
  const scrollerRef = useRef(null);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  const scrollByCards = (dir) => {
    scrollerRef.current?.scrollBy({ left: 320 * dir, behavior: "smooth" });
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSortBy("newest");
    setDepartmentFilter("");
    setRoleFilter("");
    setSkillFilter("");
  };

  const filteredPlatforms = PLATFORMS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const sidebar =
      document.getElementById("app-sidebar") ||
      document.querySelector('[data-sidebar="true"]');

    if (!sidebar) return;

    const update = () => {
      setIsSidebarCollapsed(sidebar.getBoundingClientRect().width <= 120);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(sidebar);

    return () => ro.disconnect();
  }, []);

  return (
    <div className="p-6">

      {/* Carousel */}
      <section className="rounded-2xl px-16 py-10 bg-[#EEE6C8]">
        <h2 className="text-lg font-semibold mb-6">Learning Platforms</h2>

        <div className="relative">
          <button
            onClick={() => scrollByCards(-1)}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-white grid place-items-center"
          >
            ‹
          </button>

          <button
            onClick={() => scrollByCards(1)}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-white grid place-items-center"
          >
            ›
          </button>

          <div
            ref={scrollerRef}
            className="flex justify-center gap-8 overflow-x-auto px-6 py-8"
          >
            {filteredPlatforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="w-[240px] h-[120px] bg-white rounded-2xl border flex items-center justify-center gap-3 shadow-md hover:scale-105 transition"
              >
                <img src={p.logo} className="h-10" />
                <span className="font-medium">{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH + NEWEST ROW */}
      <div className="mt-8 flex justify-center">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-2xl border p-4">
            <div className="flex items-center gap-3">

              {/* Search */}
              <div className="relative flex-1">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full h-10 pl-4 pr-3 border rounded-lg"
                />
              </div>

              {/* Newest */}
              <SortFilterDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS MOVE */}
      {isSidebarCollapsed ? (
        <div className="mt-6 grid grid-cols-12 gap-6">
          <aside className="col-span-3">
            <FiltersPanel
              variant="sidebar"
              showSearch={false}
              showClearTop={false}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              skillFilter={skillFilter}
              setSkillFilter={setSkillFilter}
              onClear={handleClearAll}
            />
          </aside>
        </div>
      ) : (
        <div className="mt-1 flex justify-center">
          <div className="max-w-4xl w-full">
            <FiltersPanel
            variant="inline"
            showSearch={false}
            showClearTop={false}      
            showClearBottom={true}    
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            skillFilter={skillFilter}
            setSkillFilter={setSkillFilter}
            onClear={handleClearAll}
            /> 
          </div>
        </div>
      )}
    </div>
  );
}
