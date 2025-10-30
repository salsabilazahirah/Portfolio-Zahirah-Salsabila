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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
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
  }, []);

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
    }
  };

  // About data
  const aboutData = {
    description: "I am an information systems student with a strong interest in designing effective, user-centered digital solutions. I combine my skills in UI/UX design and web development using CSS, HTML, ReactJS and Figma to create some experiences that are not only visually appealing but also functional and easy to use.",
    cvLink: "/cv.pdf",
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
      title: "Certificate of Participation Bina Desa",
      image: "/assets/icon/techfest.png",
      description: "Served as Vice Coordinator of Media Public Relations for Bina Desa BEM FTI",
      downloadLink: "assets/icon/techfest.png"
    },
    {
      title: "BEM FTI Organization Certificate",
      image: "/assets/icon/BEMFTI.png",
      description: "Staff Bidang Humas Prastiwi Yogyakarta 13 Mei 2020 PDIP KABKOTA/KABUPATEN PERIODE 2018",
      downloadLink: "/assets/icon/BEMFTI.png"
    },
    {
      title: "Certificate of Achievement – 1st Honorable Mention UI/UX Luminux 2025",
      image: "/assets/icon/Luminux.png",
      description: "..",
      downloadLink: "/assets/icon/Luminux.png"
    }
  ];

  // Projects data
  const projects = [
    {
      title: "Website Design Rumah Catering",
      thumbnail: "/assets/icon/CATERING.png",
      description: "Rumah Catering is a business that provides food services for individual orders as well as elementary and junior high school students. Previously, the ordering process was done manually via WhatsApp or by visiting the location in person. With this system, customers can place orders online and submit information regarding student attendance or absence. The owner can verify the data entered, and the system automatically calculates the number of portions and monthly catering costs. This system helps streamline order management and simplifies the process of compiling reports.",
      tools: ["Figma"],
      link: "#"
    },
    {
      title: "Mobile Application Design SOBAT",
      thumbnail: "assets/icon/SOBAT.png",
      description: "Sahabat Budaya Anak Tangguh (SOBAT) is a mobile application for introducing Indonesian culture through gamification that is fun, inclusive, and adaptive for children aged 6-12 years. Cultural introduction is packaged through a combination of folk tales, traditional clothing, local cuisine, traditional houses, dances, batik, and musical instruments in interactive games. Games such as drawing, coloring, arranging letters into words, and memory cards are designed to actively engage children.",
      tools: ["Figma"],
      link: "#"
    },
    {
      title: "Mobile Application Design Nafasku",
      thumbnail: "assets/icon/nafaskuu.png",
      description: "..",
      tools: ["Figma"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#262626] text-white">
      {/* Navigation - New Style */}
      <nav className={`fixed top-0 z-50 w-full bg-neutral-800 transition-all duration-300 ${
        isScrolled ? 'shadow-[0px_2px_9.4px_0px_#ffc4ed]' : ''
      }`}>
        <div className="container mx-auto px-8 lg:px-12 xl:px-16 h-[114px] flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="w-[178px] h-[68px] flex items-center flex-shrink-0">
            <Image 
              src="/assets/icon/webyla.png" 
              alt="Webyla Logo" 
              width={178} 
              height={68}
              className="object-contain"
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
          <button className="lg:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-white transform transition-all duration-300"></div>
              <div className="w-full h-0.5 bg-white transform transition-all duration-300"></div>
              <div className="w-full h-0.5 bg-white transform transition-all duration-300"></div>
            </div>
          </button>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-[144px] pb-20">
        <div className="container mx-auto px-8 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Greeting, Name & Title - Grouped */}
              <div className="space-y-1">
                {/* Greeting */}
                <div className="flex items-center gap-4">
                  <Image 
                    src="/assets/icon/Hi.png" 
                    alt="Hi" 
                    width={72} 
                    height={36}
                    className="h-[36px] w-auto object-contain"
                  />
                  <span className="text-[32px] font-bold">
                    There! I'am
                  </span>
                </div>

                {/* Name */}
                <h1 className="text-[48px] font-bold leading-tight">
                  Zahirah Salsabila
                </h1>

                {/* Title */}
                <div className="text-[40px] font-bold bg-gradient-to-r from-white to-[#ffc4ed] bg-clip-text text-transparent">
                  UI/UX Designer
                </div>
              </div>

              {/* Description */}
              <p className="text-[19px] text-justify max-w-[472px] leading-relaxed">
                Welcome to my portfolio! I design clean, user-centered digital experiences that balance visual appeal with functionality. Take a look around and discover how each project showcases my passion for thoughtful design, usability, and solving real user needs.
              </p>

              {/* CTA Button & Social Icons */}
              <div className="flex items-center gap-4 pt-6">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.6)] px-[20px] py-[10px] rounded-[14px] hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed] flex-shrink-0"
                >
                  <span className="text-[19px] font-bold">Contact Me</span>
                </button>

                {/* Social Icons */}
                <div className="flex gap-3">
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

            {/* Right - Lanyard (Overlap dengan navbar) */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="animate-float absolute top-[-280px] lg:top-[-350px] scale-35 lg:scale-45">
                <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Bar - Infinite Scrolling */}
      <section className="py-6 bg-transparent border-y border-gray-700/50 overflow-hidden">
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
                className="flex items-center mx-8 lg:mx-12"
              >
                <span className="text-[#ffc4ed] text-2xl lg:text-3xl">✦</span>
                <span className="text-lg lg:text-2xl font-bold ml-3">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-8 lg:px-12 xl:px-16">
          {/* Section Title */}
          <h2 className="text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] text-center mb-16">
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Gradient Circle Background */}
                <div className="absolute inset-0 -m-5">
                  <div className="w-[387px] h-[387px] rounded-full bg-gradient-to-br from-white to-[#FFC4ED] opacity-80 blur-[20px]" />
                </div>
                
                {/* Profile Image Circle */}
                <div className="relative w-[347px] h-[347px] rounded-full overflow-hidden border-4 border-[#FFC4ED]">
                  <Image
                    src="/assets/icon/about.png"
                    alt="about"
                    width={347}
                    height={347}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              {/* Description */}
              <p className="text-[16px] text-justify leading-relaxed">
                {aboutData.description}
              </p>

              {/* Download CV Button and Social Icons Row */}
              <div className="flex items-center justify-between gap-4">
                {/* Download CV Button */}
                <a
                  href={aboutData.cvLink}
                  download
                  className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.6)] px-[20px] py-[10px] rounded-[14px] hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed]"
                >
                  <Download className="w-[24px] h-[24px] text-[#FFC4ED]" />
                  <span className="text-[19px] font-bold">Download CV</span>
                </a>

                  {/* Tools/Skills Icons */}
                <div className="flex gap-4 pt-4">
                  {aboutData.tools.map((tool, index) => {
                    const toolImages: { [key: string]: string } = {
                      "Figma": "/assets/icon/figma.png",
                      "HTML": "/assets/icon/html.png",
                      "CSS": "/assets/icon/css.png",
                      "Laravel": "/assets/icon/laravel.png"
                    };
                    
                    return (
                      <div
                        key={index}
                        className="bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] w-[44px] h-[44px] rounded-[10px] flex items-center justify-center shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed] hover:bg-[rgba(255,255,255,0.3)] transition-all"
                        title={tool}
                      >
                        <Image
                          src={toolImages[tool] || "/assets/icon/figma.png"}
                          alt={tool}
                          width={24}
                          height={24}
                          className="object-contain"
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
      <section id="skills" className="py-20">
        <div className="container mx-auto px-8 lg:px-12 xl:px-16">
          <h2 className="text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] text-center mb-8">
            Skills
          </h2>
          <p className="text-[16px] text-center mb-16 max-w-2xl mx-auto opacity-80">
            These are the tools I use regularly in my creative and development workflows
          </p>
          
          {/* Horizontal Layout Container */}
          <div className="flex items-center justify-center gap-8 lg:gap-12 flex-wrap max-w-[1200px] mx-auto">
            {/* VS Code */}
            <div className="group">
              <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-4">
                <Image
                  src="/assets/icon/vscode.png"
                  alt="VS Code"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Figma */}
            <div className="group">
              <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-4">
                <Image
                  src="/assets/icon/figma.png"
                  alt="Figma"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Premiere Pro */}
            <div className="group">
              <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-4">
                <Image
                  src="/assets/icon/PremierePro.png"
                  alt="Premiere Pro"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Canva */}
            <div className="group">
              <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-4">
                <Image
                  src="/assets/icon/canva.png"
                  alt="Canva"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Illustrator */}
            <div className="group">
              <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-[rgba(255,255,255,0.1)] border-2 border-[#FFC4ED] rounded-[20px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_0px_20px_0px_rgba(255,196,237,0.3)] cursor-pointer p-4">
                <Image
                  src="/assets/icon/Illustrator.png"
                  alt="Illustrator"
                  width={70}
                  height={70}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Certificates Section */}
      <section id="certificates" className="py-20">
        <div className="container mx-auto px-8 lg:px-12 xl:px-16">
          <h2 className="text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] text-center mb-4">
            Certificates
          </h2>
          <p className="text-[16px] text-center mb-16 max-w-2xl mx-auto opacity-80">
            A collection of my certifications that reflect my experiences, achievements, and commitment to continuous learning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section id="projects" className="py-20">
        <div className="container mx-auto px-8 lg:px-12 xl:px-16">
          <div className="max-w-[1294px] mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] mb-4">
                Projects
              </h2>
              <p className="text-[16px] max-w-[604px] mx-auto opacity-80">
                A showcase of my design and development projects, built with a focus on usability, visual clarity, and real user needs.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-8 lg:px-12 xl:px-16">
          <h2 className="text-[64px] font-bold font-['Way_Come'] text-[#ffc4ed] text-center mb-4">
            Contact Me
          </h2>
          <p className="text-[16px] text-center mb-16 max-w-2xl mx-auto opacity-80">
            Start the conversation to collaborate good relationship and business.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <h3 className="text-[32px] font-bold mb-6">Become a Client !</h3>
              <p className="mb-8 leading-relaxed text-[16px] opacity-80">
                I will be happy to work with you for business and collaborations and deliver outstanding results that will add value to your business.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-6 h-6" />, text: 'bilazahirah.13@gmail.com', type: 'email' },
                  { icon: <PhoneCall className="w-6 h-6" />, text: '+62 857-6807-8603', type: 'phone' }
                ].map((contact, index) => (
                  <div 
                    key={contact.type}
                    className="flex items-center space-x-4 p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(55,55,55,0.6)] rounded-[14px] hover:bg-[rgba(255,255,255,0.08)] transition-all"
                  >
                    <span className="text-[#FFC4ED]">{contact.icon}</span>
                    <span className="text-[16px]">{contact.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <p className="mb-4 text-[16px] opacity-80">Follow Me On</p>
                <div className="flex space-x-3">
                  {[
                    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/bilazahirah' },
                    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/zahirahsalsabila' },
                    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/bilazahirah' },
                    { icon: <Mail className="w-5 h-5" />, href: 'mailto:bilazahirah.13@gmail.com' }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] w-[44px] h-[44px] rounded-[10px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.3)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-[32px] font-bold mb-6">Send a Message</h3>
              <p className="mb-8 text-[16px] opacity-80">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
              <form className="space-y-6">
                {[
                  { type: 'text', placeholder: 'Name' },
                  { type: 'email', placeholder: 'Email' }
                ].map((field, index) => (
                  <input
                    key={field.placeholder}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-6 py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(55,55,55,0.6)] rounded-[14px] focus:border-[#FFC4ED] focus:outline-none focus:ring-2 focus:ring-[#FFC4ED]/20 transition-all text-[16px]"
                  />
                ))}
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-6 py-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(55,55,55,0.6)] rounded-[14px] focus:border-[#FFC4ED] focus:outline-none focus:ring-2 focus:ring-[#FFC4ED]/20 transition-all resize-none text-[16px]"
                />
                <button
                  type="submit"
                  className="w-full bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.6)] py-4 rounded-[14px] font-bold hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed] text-[19px]"
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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
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
      <div className="rounded-t-[14px] h-48 overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-semibold mb-4 text-[16px] leading-tight">
          {title}
        </h3>

        {/* Dropdown Toggle Button */}
        <button
          onClick={handleToggle}
          className="w-full flex items-center justify-between gap-3 mb-3"
          type="button"
        >
          <span className="text-[14px] font-medium opacity-80">
            {isExpanded ? 'Hide Details' : 'View Details'}
          </span>
          <div 
            className={`w-[36px] h-[36px] rounded-full bg-[#FFC4ED] flex items-center justify-center transition-transform duration-300 shadow-[0px_0px_10px_0px_rgba(255,196,237,0.5)] ${isExpanded ? 'rotate-180' : ''}`}
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
              <p className="text-[14px] text-justify leading-relaxed mb-4 opacity-80">
                {description}
              </p>

              {/* Download Button */}
              <a
                href={downloadLink}
                download
                className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(55,55,55,0.6)] px-[16px] py-[10px] rounded-[10px] hover:bg-[rgba(255,255,255,0.15)] transition-all shadow-[0px_-2px_3.5px_0px_inset_#ffc4ed] w-full justify-center group"
              >
                <Download className="w-[18px] h-[18px] text-[#FFC4ED] group-hover:scale-110 transition-transform" />
                <span className="text-[14px] font-bold">Download This Certificate</span>
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
      className="relative h-[365px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
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
          <div className="bg-gradient-to-r from-[#313131] to-[#313131] rounded-[20px] p-4 h-full flex flex-col gap-4 overflow-hidden">
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
            <div className="relative flex-1 rounded-[10px] overflow-hidden">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Icon */}
            <div className="relative flex items-center justify-between gap-2">
              <h3 className="text-[18px] font-bold flex-1">
                {title}
              </h3>
              <div className="w-[28px] h-[28px] rounded-full bg-[#FFC4ED] flex items-center justify-center rotate-90 scale-y-[-1] shadow-[0px_0px_10px_0px_#FFC4ED]">
                <ExternalLink className="w-[16px] h-[16px] text-black rotate-180 scale-y-[-1]" strokeWidth={3} />
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
          <div className="bg-gradient-to-r from-[#313131] to-[#313131] rounded-[20px] p-4 h-full flex flex-col gap-4 overflow-hidden">
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
            <h3 className="relative text-[18px] font-bold pt-2">
              {title}
            </h3>

            {/* Description */}
            <div className="relative flex-1 overflow-y-auto">
              <p className="text-[14px] text-justify leading-relaxed">
                {description}
              </p>
            </div>

            {/* Tools */}
            <div className="relative flex gap-2 flex-wrap">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-[10px] py-[5px] rounded-[10px] text-[12px] font-bold bg-[rgba(255,196,237,0.4)] border border-[rgba(255,255,255,0.5)] shadow-[0px_-1px_80px_0px_inset_rgba(255,196,237,0.2)]"
                >
                  {tool}
                </span>
              ))}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto w-[28px] h-[28px] rounded-full bg-[#FFC4ED] flex items-center justify-center hover:scale-110 transition-transform shadow-[0px_0px_10px_0px_#FFC4ED]"
              >
                <ExternalLink className="w-[16px] h-[16px] text-black" strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}