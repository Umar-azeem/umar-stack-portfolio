'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Contact() {


  const [scrolling, setScrolling] = useState(false);
       const onPageScroll = () => {
        if (window.pageYOffset > 200) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      };
      useEffect(() => {
        window.addEventListener("scroll", onPageScroll);
        return () => {
          window.removeEventListener("scroll", onPageScroll);
        };
      }, []);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mailtoLink = `mailto:umara4436@gmail.com?subject=Contact from ${form.name}&body=Name: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <section className="flex flex-col items-center gap-10 mt-11">
        <div className="bg-white/10 bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-lg text-center w-full max-w-md">
          <h1 className="text-3xl font-semibold text-white mb-4">Contact Me</h1>

          {/* ✅ Fixed onSubmit here */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/95 text-cyan-500 focus:outline-none"
                required
              />
            </div>

            <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/95 text-cyan-500 focus:outline-none"
                required
              />
            </div>

            <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/95 text-cyan-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative inline-flex mt-5 group">
              <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

              <button
                type="submit"
                className="relative text-gray-500 hover:text-cyan-500 cursor-pointer inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transition-all duration-200 bg-gray-950 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
       {
                              scrolling && (
                                <button className="fixed block right-8 bottom-10 w-16 sm:w-24" onClick={() => {
                                  window.scrollTo(0,0);
                                }}>
                                  <Image
                src="/assets/imag/arrow-down.svg"
                alt="Arrow Down"
                width={100}
                height={100}
              />
                                </button>
                              )
                            }
    </div>
  );
}

export default Contact;
