import { experience } from '../data/skills';

function Experience() {
  return (
    <section id="experience" className="py-20 bg-alt bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Experience</h2>
        <p className="text-muted text-gray-500 mb-10">Where I've worked</p>

        <div className="space-y-8">
          {experience.map((job) => (
            <div
              key={job.role + job.company}
              className="card bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="text-primary font-medium">{job.company}</p>
                </div>
                <div className="text-muted text-gray-500 text-sm mt-1 sm:mt-0 sm:text-right">
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <ul className="space-y-2 mt-3">
                {job.points.map((point, i) => (
                  <li
                    key={i}
                    className="text-muted text-gray-600 text-sm leading-relaxed pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-primary"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
