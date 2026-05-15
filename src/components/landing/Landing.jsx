import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./landing.css";
import logo from "../../assets/logo.svg";
import blogImg from "../../assets/blog.webp";
import { LuLayers, LuCodeXml, LuUsersRound } from "react-icons/lu";
import { TbLink } from "react-icons/tb";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { BiLogoDevTo } from "react-icons/bi";
import { BiMessageDetail, BiLoaderAlt } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";

const Landing = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const text =
      `📬 <b>BIOLINK | NEW INQUIRY</b>\n\n` +
      `<blockquote>` +
      `<b>Name:</b> ${formData.name}\n` +
      `<b>Email:</b> <code>${formData.email}</code>\n\n` +
      `<b>Message:</b> ${formData.message}` +
      `</blockquote>\n\n` +
      `⏱ <u>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • Automated</u>\n\n` +
      `#biolink`;

    const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${formData.email}&su=${encodeURIComponent("Reply to " + formData.name)}`;

    const replyMarkup = {
      inline_keyboard: [
        [
          {
            text: "Reply via Gmail",
            url: gmailUrl,
          },
        ],
      ],
    };

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "HTML",
          reply_markup: replyMarkup,
        },
      );

      if (response.status === 200) {
        setTimeout(() => {
          setStatus("success");
          setTimeout(() => {
            setFormData({ name: "", email: "", message: "" });
            setStatus("idle");
          }, 5000);
        }, 1500);
      }
    } catch (error) {
      setTimeout(() => {
        setStatus("error");
        setTimeout(() => {
          setStatus("idle");
          setFormData({ name: "", email: "", message: "" });
        }, 5000);
      }, 1500);
    }
  };

  return (
    <motion.div
      className="wrapper"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="top-pic">
        <img src={logo} alt="logo" />
      </div>
      <h1 className=" titleMain">Rakhimov Dev.</h1>
      <p className=" textMain">Frontend Developer</p>

      <div className="achievements">
        <div className="achiev-block">
          <LuCodeXml />
          <span>6+ Tech</span>
        </div>
        <div className="achiev-block">
          <LuLayers />
          <span>10+ Projects</span>
        </div>
        <div className="achiev-block">
          <LuUsersRound />
          <span>6+ Clients</span>
        </div>
      </div>

      <div className="blog">
        <div className="blog-image">
          <img src={blogImg} alt="image" />
        </div>
        <div className="blog-desc">
          <h1 className=" blog-title">Clean Logic</h1>
          <p className=" blog-text">Simple solutions for complex problems.</p>
        </div>
      </div>

      <div className="card-links">
        <a
          href="https://portfolio.rakhim0v.uz/"
          className="card"
          target="_blank"
          rel="noreferrer"
        >
          <span className="active">
            <div className="dot"></div>
            <TbLink />
          </span>
          <div className="card-desc">
            <h1>Portfolio Website</h1>
            <p>Find my blog, stack, and more!</p>
          </div>
        </a>

        <a href="mailto:coderakhimov@gmail.com" className="card">
          <span>
            <MdOutlineMailOutline />
          </span>
          <div className="card-desc">
            <h1>Work Inquiries</h1>
            <p>Accepting new inquiries</p>
          </div>
        </a>

        <a
          href="https://github.com/iamabdurahmon"
          className="card"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <FaGithub />
          </span>
          <div className="card-desc">
            <h1>GitHub Profile</h1>
            <p>Open-source contributions</p>
          </div>
        </a>

        <a
          href="https://dev.to/rakhimov"
          className="card"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <BiLogoDevTo />
          </span>
          <div className="card-desc">
            <h1>Dev.to Articles</h1>
            <p>Coding and beyond</p>
          </div>
        </a>
      </div>

      <div className="line"></div>

      <form onSubmit={handleSubmit}>
        <div className="form-top">
          <span>
            <BiMessageDetail />
          </span>
          <h1>Drop a line</h1>
        </div>
        <div className="inp">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="message"
          placeholder="Leave a message..."
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button
          type="submit"
          className={`btn ${status}`}
          disabled={status !== "idle"}
        >
          {status === "idle" && "Send message"}
          {status === "loading" && <BiLoaderAlt className="spinner" />}
          {status === "success" && "Message sent"}
          {status === "error" && "Something went wrong"}
        </button>
      </form>

      <a
        href="https://maps.app.goo.gl/14bEDJ9yxL5v9Keq7"
        className="card"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <IoLocationOutline />
        </span>
        <div className="card-desc">
          <h1>Based in</h1>
          <p>Namangan, UZ — Working Remote</p>
        </div>
      </a>

      <footer>
        <p>
          Link In Bio • Made by{" "}
          <a
            href="https://portfolio.rakhim0v.uz/"
            target="_blank"
            rel="noreferrer"
          >
            Rakhimov
          </a>
        </p>
      </footer>
    </motion.div>
  );
};

export default Landing;
