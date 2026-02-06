const skills = {
  // frontend: [
  //   { name: 'React', level: 90 },
  //   { name: 'Next.js', level: 85 },
  //   { name: 'TypeScript', level: 85 },
  //   { name: 'Tailwind CSS', level: 90 },
  //   { name: 'HTML/CSS', level: 95 },
  // ],
  backend: [
    { name: 'Python', level: 90 },
    { name: 'C/C++', level: 80 },
    { name: 'PostgreSQL', level: 80 },
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'CI/CD', level: 80 },
  ],
};

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are the technologies I work with on a daily basis to build
            modern, scalable applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend */}
          {/* <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🎨
              </span>
              Frontend
            </h3>
            <div className="space-y-4">
              {skills.frontend.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div> */}

          {/* Backend */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                ⚙️
              </span>
              Backend
            </h3>
            <div className="space-y-4">
              {skills.backend.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🛠️
              </span>
              DevOps & Tools
            </h3>
            <div className="space-y-4">
              {skills.tools.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
