function About() {
  const stats = [
    { label: 'Projects', value: '5+' },
    { label: 'Experience', value: '2+ Years' },
    { label: 'Technologies', value: '10+' },
    { label: 'Companies', value: '2' },
  ];

  return (
    <section id="about" className="py-20 bg-alt bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">About Me</h2>
        <p className="text-muted text-gray-500 mb-10">Get to know me better</p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-muted text-gray-600 leading-relaxed mb-4">
              WordPress Developer with hands-on experience building responsive
              websites. Also experienced in frontend development using React,
              Vite, and Redux Toolkit, focusing on clean UI and API integration.
            </p>
            <p className="text-muted text-gray-600 leading-relaxed">
              Comfortable working in team environments and delivering reliable
              solutions within deadlines. Passionate about writing clean,
              maintainable code and creating seamless user experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="card bg-white text-center p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
                <p className="text-muted text-gray-500 text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
