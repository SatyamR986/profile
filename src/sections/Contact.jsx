import { useState } from 'react';
import Button from '../components/Button/Button';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Contact</h2>
        <p className="text-muted text-gray-500 mb-10">Get in touch with me</p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-y"
          />
          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
