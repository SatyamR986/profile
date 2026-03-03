import { skills } from '../data/skills';

function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Skills</h2>
        <p className="text-muted text-gray-500 mb-10">Technologies I work with</p>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((category) => (
            <div
              key={category.title}
              className="card bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-primary mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
