export default function Projects() {
  const projects = [
    {
      title: "Website-IOT",
      description: "Placeholder untuk project yang akan ditampilkan setelah GitHub diperbaiki.",
      tech: ["PHP", "Laravel", "MySQL"],
      github: "https://github.com/Daarns/Website-IOT/tree/main"
    },
    {
      title: "Project 2 - Coming Soon", 
      description: "Placeholder untuk project webscraping menggunakan Python dan FastAPI.",
      tech: ["Python", "FastAPI", "Web Scraping"],
      demo: "#",
      github: "#"
    },
    {
      title: "EcommercePro",
      description: "",
      tech: ["React JS"],
      demo: "https://ecommerce-pro-self.vercel.app/", 
      github: "https://github.com/Daarns/Ecommerce-Pro"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={project.demo} className="text-blue-600 hover:text-blue-800 font-medium">
                  Live Demo
                </a>
                <a href={project.github} className="text-gray-600 hover:text-gray-800 font-medium">
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
