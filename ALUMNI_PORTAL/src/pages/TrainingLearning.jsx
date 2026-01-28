import React, { useRef, useState, useEffect, useMemo } from "react";
import FiltersPanel from "../components/Training_Learning/FiltersPanel";
import SortFilterDropdown from "../components/content_management/SortFilterDropdown";
import CourseCard from "../components/Training_Learning/CourseCard"; // Adjust path as needed

const PLATFORMS = [
  {
    name: "Microsoft Learning",
    href: "https://learn.microsoft.com/training/ ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg ",
  },
  {
    name: "Udemy",
    href: "https://www.udemy.com/ ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg ",
  },
  {
    name: "LinkedIn Learning",
    href: "https://www.linkedin.com/learning/ ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png ",
  },
  {
    name: "IBM SkillsBuild",
    href: "https://skillsbuild.org/ ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg ",
  },
];

// Dummy Data
const DUMMY_COURSES = [
  {
    id: 1,
    title: "HTML & CSS Mastery 2025 - Build Modern Websites",
    description: "Master modern HTML5 and CSS3 from scratch. Build responsive, accessible websites with Flexbox, Grid, and animations.",
    category: "Programming",
    duration: "3 Months",
    skill: "HTML/CSS",
    department: "Engineering",
    role: "Frontend Developer",
    instructor: { name: "Lira Johnson", avatar: "https://i.pravatar.cc/150?img=1" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    platform: "Udemy",
    url: "https://www.udemy.com/course/html-css-mastery-2025/"
  },
  {
    id: 2,
    title: "AWS Cloud Practitioner Essentials",
    description: "Learn AWS fundamentals including EC2, S3, and RDS. Prepare for the AWS Certified Cloud Practitioner exam.",
    category: "Cloud",
    duration: "2 Months",
    skill: "AWS",
    department: "Engineering",
    role: "Cloud Architect",
    instructor: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=5" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    platform: "IBM SkillsBuild",
    url: "https://skillsbuild.org/"
  },
  {
    id: 3,
    title: "React.js Fundamentals - Complete Guide",
    description: "Master React hooks, components, and state management. Build modern single-page applications from scratch.",
    category: "Programming",
    duration: "4 Months",
    skill: "React",
    department: "Engineering",
    role: "Full Stack Developer",
    instructor: { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?img=8" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    platform: "Udemy",
    url: "https://www.udemy.com/"
  },
  {
    id: 4,
    title: "Azure Fundamentals AZ-900",
    description: "Microsoft Azure basics including cloud concepts, core services, security, privacy, compliance, and pricing.",
    category: "Cloud",
    duration: "3 Months",
    skill: "Azure",
    department: "IT",
    role: "Cloud Engineer",
    instructor: { name: "Emily Davis", avatar: "https://i.pravatar.cc/150?img=9" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    platform: "Microsoft Learning",
    url: "https://learn.microsoft.com/training/"
  },
  {
    id: 5,
    title: "Leadership and Management Essentials",
    description: "Develop critical leadership skills, team management, and strategic thinking for modern business environments.",
    category: "Management",
    duration: "2 Months",
    skill: "Leadership",
    department: "Operations",
    role: "Manager",
    instructor: { name: "Robert Wilson", avatar: "https://i.pravatar.cc/150?img=11" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    platform: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/"
  },
  {
    id: 6,
    title: "Python for Data Science",
    description: "Learn Python programming with focus on data analysis, Pandas, NumPy, and data visualization techniques.",
    category: "Data Science",
    duration: "3 Months",
    skill: "Python",
    department: "Analytics",
    role: "Data Scientist",
    instructor: { name: "Alex Turner", avatar: "https://i.pravatar.cc/150?img=12" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    platform: "Udemy",
    url: "https://www.udemy.com/"
  },
  {
    id: 7,
    title: "Cybersecurity Fundamentals",
    description: "IBM's comprehensive cybersecurity course covering network security, threats, and protection strategies.",
    category: "Security",
    duration: "4 Months",
    skill: "Cybersecurity",
    department: "IT",
    role: "Security Analyst",
    instructor: { name: "Lisa Park", avatar: "https://i.pravatar.cc/150?img=15" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    platform: "IBM SkillsBuild",
    url: "https://skillsbuild.org/"
  },
  {
    id: 8,
    title: "Power Platform Fundamentals",
    description: "Microsoft Power Apps, Power Automate, and Power BI basics for business process automation.",
    category: "Low-Code",
    duration: "2 Months",
    skill: "Power Platform",
    department: "Operations",
    role: "Business Analyst",
    instructor: { name: "David Kim", avatar: "https://i.pravatar.cc/150?img=3" },
    price: 0,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    platform: "Microsoft Learning",
    url: "https://learn.microsoft.com/training/"
  }
];

const ITEMS_PER_PAGE = 6;

export default function TrainingLearning() {
  const scrollerRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const scrollByCards = (dir) => {
    scrollerRef.current?.scrollBy({ left: 320 * dir, behavior: "smooth" });
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSortBy("newest");
    setDepartmentFilter("");
    setRoleFilter("");
    setSkillFilter("");
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredCourses = useMemo(() => {
    return DUMMY_COURSES.filter((course) => {
      // Search filter (title, description, category, instructor)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.instructor.name.toLowerCase().includes(searchLower);

      // Department filter
      const matchesDepartment =
        !departmentFilter || course.department === departmentFilter;

      // Role filter
      const matchesRole = !roleFilter || course.role === roleFilter;

      // Skill filter
      const matchesSkill = !skillFilter || course.skill === skillFilter;

      return matchesSearch && matchesDepartment && matchesRole && matchesSkill;
    });
  }, [searchQuery, departmentFilter, roleFilter, skillFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, departmentFilter, roleFilter, skillFilter]);

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

  // Pagination Handlers
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Course Grid Component (reused in both layouts)
  const CourseGridSection = () => (
    <div className="mt-6">
      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
        <span>Showing {paginatedCourses.length} of {filteredCourses.length} courses</span>
        {filteredCourses.length > 0 && (
          <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
        )}
      </div>

      {/* Grid */}
      {filteredCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#DAB619] text-white hover:bg-[#c4a317] shadow-md"
              }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#DAB619] text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#DAB619] text-white hover:bg-[#c4a317] shadow-md"
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-2">No courses found</p>
          <p className="text-gray-400 text-sm mb-4">Try adjusting your filters</p>
          <button
            onClick={handleClearAll}
            className="px-6 py-2 bg-[#DAB619] text-white rounded-lg hover:bg-[#c4a317] transition-colors font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      {/* Carousel */}
      <section className="rounded-2xl px-16 py-10 bg-[#EEE6C8]">
        <h2 className="text-lg font-semibold mb-6">Learning Platforms</h2>

        <div className="relative">
          <button
            onClick={() => scrollByCards(-1)}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-gray-50 transition-colors"
          >
            ‹
          </button>

          <button
            onClick={() => scrollByCards(1)}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-white grid place-items-center hover:bg-gray-50 transition-colors"
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
                <img src={p.logo} className="h-10" alt={p.name} />
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
                  placeholder="Search courses..."
                  className="w-full h-10 pl-4 pr-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB619]/50"
                />
              </div>

              {/* Newest */}
              <SortFilterDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS & COURSES GRID */}
      {isSidebarCollapsed ? (
        <div className="mt-6 grid grid-cols-12 gap-6">
          {/* Sidebar Filters */}
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

          {/* Main Content - Course Grid */}
          <main className="col-span-9">
            <CourseGridSection />
          </main>
        </div>
      ) : (
        <div className="mt-1 flex flex-col items-center">
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
            
            {/* Course Grid - Full width below inline filters */}
            <CourseGridSection />
          </div>
        </div>
      )}
    </div>
  );
}