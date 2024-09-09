import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from "./ui/MovingBorders";

interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
}

interface Member {
  picture: string;
  fullName: string;
  designation: string;
  bio: string;
  socialLinks: SocialLink[];
}

const teamMembers: Member[] = [
  {
    picture: "/team/linkedpic.png",
    fullName: "Samir Majhi",
    designation: "Cloud Architect",
    bio: "Expert in designing scalable cloud solutions with a decade of experience in AWS and Azure.",
    socialLinks: [
      { name: "LinkedIn", icon: Linkedin, href: "#" },
      { name: "Twitter", icon: Twitter, href: "#" },
    ],
  },
  {
    picture: "/team/binayak.jpeg",
    fullName: "Binayak Ojha",
    designation: "Frontend Developer",
    bio: "Crafting stunning and responsive user interfaces with React and Vue.js.",
    socialLinks: [
      { name: "LinkedIn", icon: Linkedin, href: "#" },
      { name: "Instagram", icon: Instagram, href: "#" },
    ],
  },
  {
    picture: "/team/rahul.jpg",
    fullName: "Rahul Gupta",
    designation: "Backend Developer",
    bio: "Specializes in building robust backend systems with Node.js and Python.",
    socialLinks: [
      { name: "LinkedIn", icon: Linkedin, href: "#" },
      { name: "Twitter", icon: Twitter, href: "#" },
    ],
  },
  {
    picture: "/team/aaron.jpeg",
    fullName: "Aaron Sapkota",
    designation: "DevOps Engineer",
    bio: "Streamlining operations and automating deployments with Docker and Kubernetes.",
    socialLinks: [
      { name: "LinkedIn", icon: Linkedin, href: "#" },
      { name: "Instagram", icon: Instagram, href: "#" },
    ],
  },
];
const TeamMemberItem: React.FC<{ member: Member }> = ({ member }) => (
  <Button
    duration={Math.floor(Math.random() * 10000) + 10000}
    borderRadius="1.75rem"
    style={{
      background: "rgb(4,7,29)",
      backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      borderRadius: `calc(1.75rem * 0.96)`,
    }}
    className="min-w-[300px] mx-4 text-white dark:text-white border-neutral-200 dark:border-slate-800 transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 group"
  >
    <div className="p-6 text-center">
      <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary/30 group-hover:border-primary transition-all duration-300">
        <Image
          src={member.picture}
          alt={`${member.fullName}'s profile picture`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h4 className="text-2xl font-bold mb-2 text-primary-foreground">
        <span className="text-purple">
          {member.fullName}
        </span>
      </h4>
      <h6 className="text-lg font-medium mb-4 text-primary">
        {member.designation}
      </h6>
      <p className="text-muted-foreground mb-6">{member.bio}</p>
      <div className="flex justify-center space-x-4">
        {member.socialLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <a
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              key={link.name}
              aria-label={link.name}
            >
              <IconComponent size={20} />
            </a>
          );
        })}
      </div>
    </div>
  </Button>
);

const AdminTeam: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const totalItems = teamMembers.length;
  const itemWidth = 320; // Adjusted for better spacing

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.stop();
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollWidth = containerRef.current.scrollWidth;
    const animationDuration = scrollWidth / 50; // Adjust speed as needed

    const animate = async () => {
      await controls.start({
        x: [-itemWidth * totalItems, 0],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: animationDuration,
            ease: "linear",
          },
        },
      });
    };

    if (isInView) {
      animate();
    }

    return () => {
      controls.stop();
    };
  }, [controls, isInView, totalItems, itemWidth]);
return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="heading">
            Meet Our <span className="text-purple">Core Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our diverse team of experts is here to bring your ideas to life with innovative solutions and unmatched expertise.
          </p>
        </motion.div>
        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex"
            animate={controls}
            style={{
              width: `${totalItems * itemWidth * 2}px`,
              display: "flex",
            }}
          >
            {/* Render two sets of items to create the seamless effect */}
            {[...teamMembers, ...teamMembers].map((member, i) => (
              <div key={i} className="inline-block" style={{ width: `${itemWidth}px` }}>
                <TeamMemberItem member={member} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdminTeam;