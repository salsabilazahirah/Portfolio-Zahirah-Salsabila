'use client';
import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import SplitText from "./components/SplitText/SplitText";
import { useState, useEffect } from "react";
import { Instagram, Linkedin, Mail, Github, Download, ExternalLink, PhoneCall } from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedCertificate, setExpandedCertificate] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  console.log('Mobile menu state:', isMobileMenuOpen);

  // Check for success parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowSuccessMessage(true);
      // Remove the success parameter from URL
      window.history.replaceState({}, '', window.location.pathname);
      // Hide message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'certificates', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust for fixed navbar height (114px) + some offset
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  function handleAnimationComplete(): void {
    console.log("Letter animation completed!");
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 114; // Fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  // About data
  const aboutData = {
    description: "Aspiring UI/UX Designer specializing in user-centered mobile and web application design. Information Systems student at UPN \"Veteran\" Yogyakarta with hands-on experience in user research, wireframing, prototyping, and usability testing using Figma (Advanced), Adobe Illustrator, and front-end technologies (HTML/CSS, Tailwind CSS). Seeking opportunities to create intuitive digital experiences through design thinking methodology and collaborative problem-solving. Proven ability to translate user needs into functional, visually appealing solutions with measurable impact.",
    cvLink: "assets/icon/cv.pdf",
    tools: ["Figma", "HTML", "CSS", "Laravel"]
  };

  const toolIcons: { [key: string]: string } = {
    "Figma": "🎨",
    "Photoshop": "📸",
    "Illustrator": "✨",
    "Premiere": "🎬"
  };

  // Certificates data
  const certificates = [
    {
      title: "Certificate of Participation - Techfest UI/UX 2025",
      image: "/assets/icon/Techfest.webp",
      description: "Designed high-fidelity prototype for SOBAT application using Figma with 50+ screens and interactive components.",
      downloadLink: "assets/icon/techfest.webp"
    },
    {
      title: "BEM FTI Organization Certificate",
      image: "/assets/icon/BEMFTI.webp",
      description: "FTI LINK is a project of BEM FTI UPN “Veteran” Yogyakarta. The project establishes BEM FTI's external relations with various agencies and builds a sustainable cooperation network.",
      downloadLink: "/assets/icon/BEMFTI.webp"
    },
    {
      title: "Certificate of Achievement – 1st Honorable Mention UI/UX Luminux 2025",
      image: "/assets/icon/Luminux.webp",
      description: "Designed comprehensive UI/UX solution with 50+ screens integrating wearable devices, Machine Learning, and Generative AI to help asthma patients monitor health conditions in real-time, predict attacks, and build healthy habits.",
      downloadLink: "/assets/icon/Luminux.webp"
    }
  ];

  // Projects data
  const projects = [
    {
      title: "Website Design Rumah Catering",
      thumbnail: "/assets/icon/CATERING.webp",
      description: "Rumah Catering is a business that provides food services for individual orders as well as elementary and junior high school students. Previously, the ordering process was done manually via WhatsApp or by visiting the location in person. With this system, customers can place orders online and submit information regarding student attendance or absence. The owner can verify the data entered, and the system automatically calculates the number of portions and monthly catering costs. This system helps streamline order management and simplifies the process of compiling reports.",
      tools: ["Figma"],
      link: "#"
    },
    {
      title: "Mobile Application Design SOBAT",
      thumbnail: "assets/icon/SOBAT.webp",
      description: "Sahabat Budaya Anak Tangguh (SOBAT) is a mobile application for introducing Indonesian culture through gamification that is fun, inclusive, and adaptive for children aged 6-12 years. Cultural introduction is packaged through a combination of folk tales, traditional clothing, local cuisine, traditional houses, dances, batik, and musical instruments in interactive games. Games such as drawing, coloring, arranging letters into words, and memory cards are designed to actively engage children.",
      tools: ["Figma"],
      link: "#"
    },
    {
      title: "Mobile Application Design Nafasku",
      thumbnail: "assets/icon/nafaskuu.webp",
      description: "Designed end-to-end UI/UX for NafasKu, an AI-powered asthma monitoring application integrated with wearable devices, Machine Learning, and Generative AI to help asthma patients monitor health conditions in real-time, predict asthma attacks, and promote healthy lifestyle habits. Responsible for conducting user research, solution ideation, and creating high-fidelity prototypes with 50+ screens using Figma",
      tools: ["Figma"],
      link: "https://www.figma.com/proto/QIuDUcK7nHFHcwPrnmVRiZ/LUMINUX?node-id=274-202&p=f&t=wzO5W7WWxswd5Mdd-1&scaling=scale-down&content-scaling=fixed&page-id=9%3A8&starting-point-node-id=74%3A73&show-proto-sidebar=1"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#262626] text-white">
      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed top-24 right-4 z-[100] animate-slideIn">
          <div className="bg-gradient-to-r from-[#ffc4ed] to-[#ff9ed8] text-black px-6 py-4 rounded-[14px] shadow-[0px_4px_20px_0px_rgba(255,196,237,0.5)] flex items-center gap-3 max-w-[350px]">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#ffc4ed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-[15px]">Message Sent Successfully!</p>
              <p className="text-[13px] opacity-90">I'll get back to you soon.</p>
            </div>
            <button 
              onClick={() => setShowSuccessMessage(false)}
              className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
          onClick={() => {
            console.log('Overlay clicked');
            setIsMobileMenuOpen(false);
          }}
        />
      )}

      {/* Navigation - New Style */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-neutral-800 transition-all duration-300 ${
        isScrolled ? 'shadow-[0px_2px_9.4px_0px_#ffc4ed]' : ''
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 h-[80px] sm:h-[100px] lg:h-[114px] flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <div className="w-[120px] sm:w-[150px] lg:w-[178px] h-[48px] sm:h-[58px] lg:h-[68px] flex items-center flex-shrink-0">
            <Image 
              src="/assets/icon/webyla.webp" 
              alt="Webyla Logo" 
              width={178} 
              height={68}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Navigation Tabs - Desktop */}
          <div className="hidden lg:flex gap-1 items-center flex-1 justify-center">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'certificates', label: 'Certificate' },
              { id: 'projects', label: 'Projects' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-[29px] py-[10px] rounded-[14px] transition-all duration-300 hover:opacity-100 group"
              >
                <span className={`text-[19px] font-bold transition-all duration-300 ${
                  activeSection === item.id ? 'opacity-100 text-[#ffc4ed]' : 'opacity-80 text-white'
                }`}>
                  {item.label}
                </span>
                {/* Active slider indicator */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-[#ffc4ed] rounded-[30px] transition-all duration-300 ${
                  activeSection === item.id ? 'w-[40px] opacity-100' : 'w-[12px] opacity-0'
                }`} />
                {/* Hover effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[12px] h-[4px] bg-[#ffc4ed] rounded-[30px] opacity-0 group-hover:opacity-50 transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Contact Me Button - Desktop */}
          <button
            onClick={() => scrollToSection('contact')}
            className={`hidden lg:block relative bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.5)] px-[20px] py-[10px] rounded-[14px] transition-all duration-300 shadow-[0px_-1px_5px_0px_inset_rgba(255,196,237,0.2)] flex-shrink-0 group ${
              activeSection === 'contact' 
                ? 'bg-[rgba(255,196,237,0.2)] border-[#ffc4ed]' 
                : 'hover:bg-[rgba(255,255,255,0.15)]'
            }`}
          >
            <span className={`text-[19px] font-bold transition-all duration-300 ${
              activeSection === 'contact' ? 'text-[#ffc4ed]' : 'text-white'
            }`}>
              Contact Me
            </span>
            {/* Active slider indicator */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-[#ffc4ed] rounded-[30px] transition-all duration-300 ${
              activeSection === 'contact' ? 'w-[40px] opacity-100' : 'w-[12px] opacity-0'
            }`} />
            {/* Hover effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[12px] h-[4px] bg-[#ffc4ed] rounded-[30px] opacity-0 group-hover:opacity-50 transition-all duration-300" />
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => {
              console.log('Hamburger clicked, current state:', isMobileMenuOpen);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <div className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></div>
              <div className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></div>
              <div className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-neutral-800 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen 
              ? 'max-h-[600px] opacity-100 shadow-[0px_4px_9.4px_0px_#ffc4ed] border-t border-gray-700/50 pointer-events-auto' 
              : 'max-h-0 opacity-0 border-t-0 pointer-events-none'
          }`}
          style={{ zIndex: 999 }}
        >
          <div className="container mx-auto px-4 sm:px-6 py-3">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'certificates', label: 'Certificate' },
              { id: 'projects', label: 'Projects' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3.5 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                  activeSection === item.id 
                    ? 'bg-[rgba(255,196,237,0.15)] text-[#ffc4ed]' 
                    : 'hover:bg-[rgba(255,255,255,0.05)] text-white'
                }`}
              >
                <span className={`text-base sm:text-lg transition-all duration-300 ${
                  activeSection === item.id ? 'font-bold' : 'font-medium'
                }`}>
                  {item.label}
                </span>
                {/* Active indicator - Pink dot */}
                <div className={`w-2.5 h-2.5 rounded-full bg-[#ffc4ed] transition-all duration-300 ${
                  activeSection === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`} />
              </button>
            ))}
            
            {/* Contact Me Button - Mobile */}
            <button
              onClick={() => scrollToSection('contact')}
              className={`w-full mt-2 px-4 py-3.5 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                activeSection === 'contact' 
                  ? 'bg-[rgba(255,196,237,0.2)] border-2 border-[#ffc4ed] text-[#ffc4ed]' 
                  : 'bg-[rgba(255,255,255,0.1)] border-2 border-[rgba(55,55,55,0.5)] hover:bg-[rgba(255,255,255,0.15)] text-white'
              }`}
            >
              <span className={`text-base sm:text-lg font-bold transition-all duration-300`}>
                Contact Me
              </span>
              {/* Active indicator - Pink dot */}
              <div className={`w-2.5 h-2.5 rounded-full bg-[#ffc4ed] transition-all duration-300 ${
                activeSection === 'contact' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-[100px] sm:pt-[120px] lg:pt-[144px] pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-1">
              {/* Greeting, Name & Title - Grouped */}
              <div className="space-y-1 sm:space-y-2">
                {/* Greeting */}
                <div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Image 
                    src="/assets/icon/Hi.webp" 
                    alt="Hi" 
                    width={72} 
                    height={36}
                    className="h-[28px] sm:h-[32px] lg:h-[36px] w-auto object-contain"
                  />
                  <span className="text-[20px] sm:text-[26px] lg:text-[32px] font-bold">
                    There! I'am
                  </span>
                </div>

                {/* Name */}
                <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold leading-tight">
                  Zahirah Salsabila
                </h1>

                {/* Title */}
                <div className="text-[28px] sm:text-[34px] lg:text-[40px] font-bold bg-gradient-to-r from-white to-[#ffc4ed] bg-clip-text text-transparent">
                  UI/UX Designer
                </div>
              </div>

              {/* Description */}
              <p className="text-[15px] sm:text-[17px] lg:text-[19px] text-justify max-w-[472px] leading-relaxed mx-auto lg:mx-0">
                Welcome to my portfolio! I design clean, user-centered digital experiences that balance visual appeal with functionality. Take a look around and discover how each project showcases my passion for thoughtful design, usability, and solving real user needs.
              </p>

              {/* CTA Button & Social Icons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 sm:pt-6 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.6)] px-[20px] py-[10px] rounded-[14px] hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed] flex-shrink-0"
                >
                  <span className="text-[17px] sm:text-[19px] font-bold">Contact Me</span>
                </button>

                {/* Social Icons */}
                <div className="flex gap-3 justify-center">
                  <a
                    href="https://www.instagram.com/bilazahirah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] w-[44px] h-[44px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.3)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed]"
                  >
                    <Instagram className="w-[24px] h-[24px]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zahirahsalsabila"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] w-[44px] h-[44px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.3)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed]"
                  >
                    <Linkedin className="w-[24px] h-[24px]" />
                  </a>
                  <a
                    href="mailto:bilazahirah.13@gmail.com"
                    className="bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] w-[44px] h-[44px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.3)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed]"
                  >
                    <Mail className="w-[24px] h-[24px]" />
                  </a>
                  <a
                    href="https://github.com/bilazahirah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] w-[44px] h-[44px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.3)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed]"
                  >
                    <Github className="w-[24px] h-[24px]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Lanyard (Overlap dengan navbar) - Hidden on Mobile */}
            <div className="hidden lg:flex justify-center lg:justify-end relative order-2">
              <div className="animate-float absolute top-[-350px] scale-45">
                <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Bar - Infinite Scrolling */}
      <section className="py-4 sm:py-6 bg-transparent border-y border-gray-700/50 overflow-hidden">
        <div className="relative">
          {/* Scrolling Container */}
          <div className="flex animate-scroll whitespace-nowrap">
            {/* First set of skills */}
            {[
              'WEB DESIGN',
              'UI/UX DESIGN', 
              'DEVELOPMENT',
              'COMMUNICATION',
              'WEB DESIGN',
              'UI/UX DESIGN', 
              'DEVELOPMENT',
              'COMMUNICATION'
            ].map((skill, index) => (
              <div 
                key={`skill-1-${index}`}
                className="flex items-center mx-6 sm:mx-8 lg:mx-12"
              >
                <span className="text-[#ffc4ed] text-xl sm:text-2xl lg:text-3xl">✦</span>
                <span className="text-base sm:text-lg lg:text-2xl font-bold ml-2 sm:ml-3">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          {/* Section Title */}
          <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] text-center mb-10 sm:mb-12 lg:mb-16">
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left - Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Gradient Circle Background */}
                <div className="absolute inset-0 -m-3 sm:-m-4 lg:-m-5">
                  <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[387px] lg:h-[387px] rounded-full bg-gradient-to-br from-white to-[#FFC4ED] opacity-80 blur-[20px]" />
                </div>
                
                {/* Profile Image Circle */}
                <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[347px] lg:h-[347px] rounded-full overflow-hidden border-3 sm:border-4 border-[#FFC4ED]">
                  <Image
                    src="/assets/icon/about.webp"
                    alt="about"
                    width={347}
                    height={347}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-4 sm:space-y-6">
              {/* Description */}
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-justify leading-relaxed">
                {aboutData.description}
              </p>

              {/* Download CV Button and Social Icons Row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6">
                {/* Download CV Button */}
                <a
                  href={aboutData.cvLink}
                  download
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.6)] px-[16px] sm:px-[20px] py-[10px] rounded-[14px] hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed]"
                >
                  <Download className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-[#FFC4ED]" />
                  <span className="text-[17px] sm:text-[19px] font-bold">Download CV</span>
                </a>

                  {/* Tools/Skills Icons */}
                <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center">
                  {aboutData.tools.map((tool, index) => {
                    const toolImages: { [key: string]: string } = {
                      "Figma": "/assets/icon/figma.webp",
                      "HTML": "/assets/icon/html.webp",
                      "CSS": "/assets/icon/css.webp",
                      "Laravel": "/assets/icon/laravel.webp"
                    };
                    
                    return (
                      <div
                        key={index}
                        className="bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-[10px] flex items-center justify-center shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed] hover:bg-[rgba(255,255,255,0.3)] transition-all"
                        title={tool}
                      >
                        <Image
                          src={toolImages[tool] || "/assets/icon/figma.webp"}
                          alt={tool}
                          width={24}
                          height={24}
                          className="object-contain w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] text-center mb-4 sm:mb-6 lg:mb-8">
            Skills
          </h2>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-center mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto opacity-80">
            These are the tools I use regularly in my creative and development workflows
          </p>
          
          {/* Horizontal Layout Container */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12 flex-wrap max-w-[1200px] mx-auto">
            {/* VS Code */}
            <div className="group">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[16px] sm:rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-3 sm:p-4">
                <Image
                  src="/assets/icon/vscode.webp"
                  alt="VS Code"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300 w-full h-full"
                />
              </div>
            </div>

            {/* Figma */}
            <div className="group">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[16px] sm:rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-3 sm:p-4">
                <Image
                  src="/assets/icon/figma.webp"
                  alt="Figma"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300 w-full h-full"
                />
              </div>
            </div>

            {/* Premiere Pro */}
            <div className="group">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[16px] sm:rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-3 sm:p-4">
                <Image
                  src="/assets/icon/PremierePro.webp"
                  alt="Premiere Pro"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300 w-full h-full"
                />
              </div>
            </div>

            {/* Canva */}
            <div className="group">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[16px] sm:rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-3 sm:p-4">
                <Image
                  src="/assets/icon/canva.webp"
                  alt="Canva"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300 w-full h-full"
                />
              </div>
            </div>

            {/* Illustrator */}
            <div className="group">
              <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[16px] sm:rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-3 sm:p-4">
                <Image
                  src="/assets/icon/Illustrator.webp"
                  alt="Illustrator"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Certificates Section */}
      <section id="certificates" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] text-center mb-2 sm:mb-4">
            Certificates
          </h2>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-center mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto opacity-80">
            A collection of my certifications that reflect my experiences, achievements, and commitment to continuous learning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certificates.map((cert, index) => (
              <CertificateCard 
                key={index}
                index={index}
                isExpanded={expandedCertificate === index}
                onToggle={() => setExpandedCertificate(expandedCertificate === index ? null : index)}
                {...cert}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-[1294px] mx-auto">
            {/* Section Title */}
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] mb-2 sm:mb-4">
                Projects
              </h2>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] max-w-[604px] mx-auto opacity-80">
                A showcase of my design and development projects, built with a focus on usability, visual clarity, and real user needs.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] text-center mb-2 sm:mb-4">
            Contact Me
          </h2>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-center mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto opacity-80">
            Start the conversation to collaborate good relationship and business.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold mb-4 sm:mb-6">Become a Client !</h3>
              <p className="mb-6 sm:mb-8 leading-relaxed text-[14px] sm:text-[15px] lg:text-[16px] opacity-80">
                I will be happy to work with you for business and collaborations and deliver outstanding results that will add value to your business.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'bilazahirah.13@gmail.com', type: 'email' },
                  { icon: <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />, text: '+62 813-6837-5553', type: 'phone' }
                ].map((contact, index) => (
                  <div 
                    key={contact.type}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(55,55,55,0.6)] rounded-[14px] hover:bg-[rgba(255,255,255,0.08)] transition-all"
                  >
                    <span className="text-[#FFC4ED]">{contact.icon}</span>
                    <span className="text-[14px] sm:text-[15px] lg:text-[16px] break-all">{contact.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8">
                <p className="mb-3 sm:mb-4 text-[14px] sm:text-[15px] lg:text-[16px] opacity-80">Follow Me On</p>
                <div className="flex space-x-3 justify-start">
                  {[
                    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/bilazahirah' },
                    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/zahirahsalsabila' },
                    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/salsabilazahirah' },
                    { icon: <Mail className="w-5 h-5" />, href: 'mailto:bilazahirah.13@gmail.com' }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.3)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold mb-4 sm:mb-6">Send a Message</h3>
              <p className="mb-6 sm:mb-8 text-[14px] sm:text-[15px] lg:text-[16px] opacity-80">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
              <form 
                action="https://formsubmit.co/bilazahirah.13@gmail.com" 
                method="POST"
                className="space-y-4 sm:space-y-6"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio!" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_autoresponse" value="Thank you for contacting me! I'll get back to you as soon as possible." />
                <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.origin + '/?success=true' : ''} />
                
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(55,55,255,0.6)] rounded-[14px] focus:border-[#FFC4ED] focus:outline-none focus:ring-2 focus:ring-[#FFC4ED]/20 transition-all text-[14px] sm:text-[15px] lg:text-[16px]"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(55,55,55,0.6)] rounded-[14px] focus:border-[#FFC4ED] focus:outline-none focus:ring-2 focus:ring-[#FFC4ED]/20 transition-all text-[14px] sm:text-[15px] lg:text-[16px]"
                />
                
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  required
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(55,55,55,0.6)] rounded-[14px] focus:border-[#FFC4ED] focus:outline-none focus:ring-2 focus:ring-[#FFC4ED]/20 transition-all resize-none text-[14px] sm:text-[15px] lg:text-[16px]"
                />
                
                <button
                  type="submit"
                  className="w-full bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.6)] py-3 sm:py-4 rounded-[14px] font-bold hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed] text-[17px] sm:text-[19px] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS untuk animasi */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, currentColor 0%, transparent 70%);
        }
      `}</style>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  thumbnail: string;
  description: string;
  tools: string[];
  link: string;
}

interface CertificateCardProps {
  title: string;
  image: string;
  description: string;
  downloadLink: string;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function CertificateCard({ title, image, description, downloadLink, index, isExpanded, onToggle }: CertificateCardProps) {
  
  const handleToggle = () => {
    console.log(`Toggle certificate ${index}, current state: ${isExpanded}`);
    onToggle();
  };

  return (
    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(55,55,55,0.6)] rounded-[14px] overflow-hidden hover:bg-[rgba(255,255,255,0.08)] transition-all">
      {/* Certificate Image */}
      <div className="rounded-t-[14px] h-40 sm:h-48 overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="font-semibold mb-3 sm:mb-4 text-[14px] sm:text-[15px] lg:text-[16px] leading-tight">
          {title}
        </h3>

        {/* Dropdown Toggle Button */}
        <button
          onClick={handleToggle}
          className="w-full flex items-center justify-between gap-3"
          type="button"
        >
          <span className="text-[13px] sm:text-[14px] font-medium opacity-80">
            {isExpanded ? 'Hide Details' : 'View Details'}
          </span>
          <div 
            className={`w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full bg-[#FFC4ED] flex items-center justify-center transition-transform duration-300 shadow-[0px_0px_10px_0px_rgba(255,196,237,0.5)] flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <svg 
              width="14" 
              height="9" 
              viewBox="0 0 14 9" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M1 1.5L7 7.5L13 1.5" 
                stroke="black" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        {/* Expanded Content */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isExpanded 
              ? 'max-h-[300px] opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
          style={{
            overflow: 'hidden'
          }}
        >
          {isExpanded && (
            <div className="pt-3">
              <p className="text-[13px] sm:text-[14px] text-justify leading-relaxed mb-4 opacity-80">
                {description}
              </p>

              {/* Download Button */}
              <a
                href={downloadLink}
                download
                className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.6)] px-[14px] sm:px-[16px] py-[10px] rounded-[10px] hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed] w-full justify-center group"
              >
                <Download className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-[#FFC4ED] group-hover:scale-110 transition-transform" />
                <span className="text-[13px] sm:text-[14px] font-bold">Download This Certificate</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, thumbnail, description, tools, link }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[320px] sm:h-[350px] lg:h-[365px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-700"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Card */}
        <div 
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-gradient-to-r from-[#313131] to-[#313131] rounded-[16px] sm:rounded-[20px] p-3 sm:p-4 h-full flex flex-col gap-3 sm:gap-4 overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute inset-0 opacity-[0.13] pointer-events-none">
              <div 
                className="absolute top-0 right-0 w-full h-full"
                style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
              />
            </div>
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
              <div 
                className="absolute bottom-0 left-0 w-full h-full"
                style={{ background: 'radial-gradient(circle, #FFC4ED 0%, transparent 70%)' }}
              />
            </div>

            {/* Thumbnail */}
            <div className="relative flex-1 rounded-[8px] sm:rounded-[10px] overflow-hidden">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Icon */}
            <div className="relative flex items-center justify-between gap-2">
              <h3 className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold flex-1 line-clamp-2">
                {title}
              </h3>
              <div className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] rounded-full bg-[#FFC4ED] flex items-center justify-center rotate-90 scale-y-[-1] shadow-[0px_0px_10px_0px_#FFC4ED] flex-shrink-0">
                <ExternalLink className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] text-black rotate-180 scale-y-[-1]" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Back Card */}
        <div 
          className="absolute inset-0"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="bg-gradient-to-r from-[#313131] to-[#313131] rounded-[16px] sm:rounded-[20px] p-3 sm:p-4 h-full flex flex-col gap-3 sm:gap-4 overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute inset-0 opacity-[0.13] pointer-events-none">
              <div 
                className="absolute top-0 right-0 w-full h-full"
                style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
              />
            </div>
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
              <div 
                className="absolute bottom-0 left-0 w-full h-full"
                style={{ background: 'radial-gradient(circle, #FFC4ED 0%, transparent 70%)' }}
              />
            </div>

            {/* Title */}
            <h3 className="relative text-[15px] sm:text-[16px] lg:text-[18px] font-bold pt-1 sm:pt-2">
              {title}
            </h3>

            {/* Description */}
            <div className="relative flex-1 overflow-y-auto pr-1">
              <p className="text-[12px] sm:text-[13px] lg:text-[14px] text-justify leading-relaxed">
                {description}
              </p>
            </div>

            {/* Tools */}
            <div className="relative flex gap-2 flex-wrap items-center">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-[8px] sm:px-[10px] py-[4px] sm:py-[5px] rounded-[8px] sm:rounded-[10px] text-[11px] sm:text-[12px] font-bold bg-[rgba(255,196,237,0.4)] border border-[rgba(255,255,255,0.5)] shadow-[0px_-1px_80px_0px_inset_rgba(255,196,237,0.2)]"
                >
                  {tool}
                </span>
              ))}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] rounded-full bg-[#FFC4ED] flex items-center justify-center hover:scale-110 transition-transform shadow-[0px_0px_10px_0px_#FFC4ED] flex-shrink-0"
              >
                <ExternalLink className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] text-black" strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}