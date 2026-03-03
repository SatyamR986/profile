import { education } from '../data/skills';

function Education() {
  return (
    <section id="education" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Education</h2>
        <p className="text-muted text-gray-500 mb-10">My academic background</p>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="card bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold mb-1">{edu.degree}</h3>
              <p className="text-primary font-medium text-sm">{edu.institution}</p>
              <p className="text-muted text-gray-500 text-sm mt-1">
                {edu.location} • {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
