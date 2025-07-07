import axios from "axios";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { apiURL } from "../utils/constants";

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const Contact = ({ contactInfo }) => {
  const emailAddress = contactInfo?.email || "huntercooke4@gmail.com";
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await axios.post(`${apiURL}/api/message-collections`, {
        data: formData,
      });

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: "Hunter Cooke",
          to_email: emailAddress,
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toLocaleString(),
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-12">
            {contactInfo?.description ||
              `I'm always interested in new opportunities, story ideas, and
            connecting with fellow journalists.`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Email</h4>
                  <a
                    href={`mailto:${contactInfo?.email}`}
                    className="text-secondary hover:underline"
                  >
                    {emailAddress}
                  </a>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700">Location</h4>
                  <p>{contactInfo?.location || "Austin, Texas"}</p>
                </div>

                {contactInfo?.socialMedia && (
                  <div>
                    <h4 className="font-medium text-gray-700">Social Media</h4>
                    <div className="flex space-x-4 mt-2 justify-center">
                      {contactInfo?.socialMedia?.map((social) => {
                        return (
                          <a
                            key={`${social?.platform}`}
                            href={social?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:text-blue-700"
                          >
                            {social?.platform}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-green-600 text-center">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-center">
                  Error sending message. Please try again.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
